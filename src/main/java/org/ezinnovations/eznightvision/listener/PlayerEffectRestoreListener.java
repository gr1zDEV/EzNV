package org.ezinnovations.eznightvision.listener;

import org.bukkit.Material;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.EventPriority;
import org.bukkit.event.Listener;
import org.bukkit.event.entity.EntityPotionEffectEvent;
import org.bukkit.event.entity.EntityResurrectEvent;
import org.bukkit.event.player.PlayerItemConsumeEvent;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerRespawnEvent;
import org.ezinnovations.eznightvision.EzNightvisionPlugin;
import org.ezinnovations.eznightvision.manager.NightVisionManager;

public final class PlayerEffectRestoreListener implements Listener {
    // Restore the disposable potion effect whenever gameplay clears it while the stored toggle remains enabled.
    private final EzNightvisionPlugin plugin;
    private final NightVisionManager nightVisionManager;

    public PlayerEffectRestoreListener(EzNightvisionPlugin plugin, NightVisionManager nightVisionManager) {
        this.plugin = plugin;
        this.nightVisionManager = nightVisionManager;
    }

    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        nightVisionManager.loadAndApply(event.getPlayer());
    }

    @EventHandler
    public void onRespawn(PlayerRespawnEvent event) {
        nightVisionManager.reapplyIfEnabled(event.getPlayer(), getReapplyDelayTicks(), "respawn");
    }

    @EventHandler(ignoreCancelled = true)
    public void onMilkConsume(PlayerItemConsumeEvent event) {
        if (event.getItem().getType() != Material.MILK_BUCKET) {
            return;
        }
        nightVisionManager.reapplyIfEnabled(event.getPlayer(), getReapplyDelayTicks(), "milk");
    }

    @EventHandler(ignoreCancelled = true)
    public void onTotem(EntityResurrectEvent event) {
        if (!(event.getEntity() instanceof Player player)) {
            return;
        }
        nightVisionManager.reapplyIfEnabled(player, getReapplyDelayTicks(), "totem");
    }

    @EventHandler(priority = EventPriority.MONITOR, ignoreCancelled = true)
    public void onEffectRemoved(EntityPotionEffectEvent event) {
        if (!(event.getEntity() instanceof Player player)) {
            return;
        }
        if (event.getModifiedType() == null || !event.getModifiedType().equals(org.bukkit.potion.PotionEffectType.NIGHT_VISION)) {
            return;
        }
        if (event.getAction() == EntityPotionEffectEvent.Action.ADDED || event.getAction() == EntityPotionEffectEvent.Action.CHANGED) {
            return;
        }

        plugin.debug("Night vision effect changed for " + player.getName() + " due to " + event.getCause());
        nightVisionManager.reapplyIfEnabled(player, getReapplyDelayTicks(), "effect-removed-" + event.getCause());
    }

    private long getReapplyDelayTicks() {
        return Math.max(1L, plugin.getConfig().getLong("effect.reapply-delay-ticks", 2L));
    }
}
