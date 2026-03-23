package org.ezinnovations.eznightvision.manager;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import java.util.logging.Level;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.potion.PotionEffect;
import org.bukkit.potion.PotionEffectType;
import org.ezinnovations.eznightvision.EzNightvisionPlugin;
import org.ezinnovations.eznightvision.data.PlayerNightVisionState;
import org.ezinnovations.eznightvision.data.SQLiteStorage;

public final class NightVisionManager {
    // SQLite-backed state is authoritative; the cache only mirrors stored values for quick lookups.
    private static final int INFINITE_DURATION = Integer.MAX_VALUE;

    private final EzNightvisionPlugin plugin;
    private final SQLiteStorage storage;
    private final ExecutorService databaseExecutor;
    private final Map<UUID, Boolean> stateCache = new ConcurrentHashMap<>();

    public NightVisionManager(EzNightvisionPlugin plugin, SQLiteStorage storage) {
        this.plugin = plugin;
        this.storage = storage;
        this.databaseExecutor = Executors.newSingleThreadExecutor(new StorageThreadFactory());
    }

    public CompletableFuture<Boolean> loadState(UUID uuid) {
        return CompletableFuture.supplyAsync(() -> loadStateNow(uuid), databaseExecutor);
    }

    public boolean loadStateNow(UUID uuid) {
        return storage.findState(uuid)
            .map(PlayerNightVisionState::enabled)
            .map(enabled -> {
                stateCache.put(uuid, enabled);
                return enabled;
            })
            .orElseGet(() -> {
                stateCache.put(uuid, false);
                return false;
            });
    }

    public CompletableFuture<Boolean> setEnabled(Player player, boolean enabled) {
        return CompletableFuture.supplyAsync(() -> {
            storage.saveState(player.getUniqueId(), player.getName(), enabled);
            stateCache.put(player.getUniqueId(), enabled);
            return enabled;
        }, databaseExecutor).thenApply(state -> {
            scheduleEffectUpdate(player, state, 0L);
            return state;
        });
    }

    public CompletableFuture<Boolean> getStoredState(UUID uuid) {
        Boolean cachedState = stateCache.get(uuid);
        if (cachedState != null) {
            return CompletableFuture.completedFuture(cachedState);
        }
        return loadState(uuid);
    }

    public boolean getStoredStateNow(UUID uuid) {
        Boolean cachedState = stateCache.get(uuid);
        return cachedState != null ? cachedState : loadStateNow(uuid);
    }

    public String getFormattedState(UUID uuid) {
        boolean enabled = getStoredStateNow(uuid);
        String path = enabled ? "placeholders.enabled-format" : "placeholders.disabled-format";
        return plugin.getMessageService().colorize(plugin.getConfig().getString(path, enabled ? "&aON" : "&cOFF"));
    }

    public void loadOnlinePlayers() {
        for (Player player : Bukkit.getOnlinePlayers()) {
            loadAndApply(player);
        }
    }

    public void refreshOnlinePlayers() {
        for (Player player : Bukkit.getOnlinePlayers()) {
            boolean enabled = getStoredStateNow(player.getUniqueId());
            scheduleEffectUpdate(player, enabled, 0L);
        }
    }

    public void loadAndApply(Player player) {
        loadState(player.getUniqueId()).thenAccept(enabled -> scheduleEffectUpdate(player, enabled, 0L)).exceptionally(throwable -> {
            logStorageFailure("loading state for " + player.getName(), throwable);
            return null;
        });
    }

    public void reapplyIfEnabled(Player player, long delayTicks, String reason) {
        getStoredState(player.getUniqueId()).thenAccept(enabled -> {
            plugin.debug("Reapply check for " + player.getName() + " after " + reason + ": " + enabled);
            if (enabled) {
                scheduleEffectUpdate(player, true, delayTicks);
            }
        }).exceptionally(throwable -> {
            logStorageFailure("checking state for " + player.getName(), throwable);
            return null;
        });
    }

    public void shutdown() {
        databaseExecutor.shutdownNow();
        stateCache.clear();
    }

    private void scheduleEffectUpdate(Player player, boolean enabled, long delayTicks) {
        long effectiveDelay = Math.max(0L, delayTicks);
        if (effectiveDelay == 0L) {
            player.getScheduler().run(plugin, task -> applyEffectState(player, enabled), null);
            return;
        }
        player.getScheduler().runDelayed(plugin, task -> applyEffectState(player, enabled), null, effectiveDelay);
    }

    private void applyEffectState(Player player, boolean enabled) {
        if (!player.isOnline()) {
            return;
        }

        if (enabled) {
            PotionEffect current = player.getPotionEffect(PotionEffectType.NIGHT_VISION);
            boolean ambient = plugin.getConfig().getBoolean("effect.ambient", false);
            boolean particles = plugin.getConfig().getBoolean("effect.particles", false);
            boolean icon = plugin.getConfig().getBoolean("effect.icon", false);

            if (current != null
                && current.getDuration() > 20 * 60
                && current.getAmplifier() == 0
                && current.isAmbient() == ambient
                && current.hasParticles() == particles
                && current.hasIcon() == icon) {
                return;
            }

            player.addPotionEffect(new PotionEffect(PotionEffectType.NIGHT_VISION, INFINITE_DURATION, 0, ambient, particles, icon));
            return;
        }

        if (player.hasPotionEffect(PotionEffectType.NIGHT_VISION)) {
            player.removePotionEffect(PotionEffectType.NIGHT_VISION);
        }
    }

    private void logStorageFailure(String action, Throwable throwable) {
        Throwable cause = throwable instanceof CompletionException && throwable.getCause() != null
            ? throwable.getCause()
            : throwable;
        plugin.getLogger().log(Level.SEVERE, "Error while " + action, cause);
    }

    private static final class StorageThreadFactory implements ThreadFactory {
        @Override
        public Thread newThread(Runnable runnable) {
            Thread thread = new Thread(runnable, "EzNightvision-SQLite");
            thread.setDaemon(true);
            return thread;
        }
    }
}
