package org.ezinnovations.eznightvision;

import org.bukkit.command.PluginCommand;
import org.bukkit.plugin.java.JavaPlugin;
import org.ezinnovations.eznightvision.command.NightVisionCommand;
import org.ezinnovations.eznightvision.data.SQLiteStorage;
import org.ezinnovations.eznightvision.listener.PlayerEffectRestoreListener;
import org.ezinnovations.eznightvision.manager.NightVisionManager;
import org.ezinnovations.eznightvision.placeholder.EzNightvisionPlaceholderExpansion;
import org.ezinnovations.eznightvision.util.MessageService;

public final class EzNightvisionPlugin extends JavaPlugin {
    private SQLiteStorage storage;
    private NightVisionManager nightVisionManager;
    private MessageService messageService;
    private EzNightvisionPlaceholderExpansion placeholderExpansion;

    @Override
    public void onEnable() {
        saveDefaultConfig();

        this.messageService = new MessageService(this);
        this.storage = new SQLiteStorage(this);
        this.storage.initialize();

        this.nightVisionManager = new NightVisionManager(this, storage);
        this.nightVisionManager.loadOnlinePlayers();

        registerCommands();
        getServer().getPluginManager().registerEvents(new PlayerEffectRestoreListener(this, nightVisionManager), this);
        registerPlaceholderExpansion();
    }

    @Override
    public void onDisable() {
        if (placeholderExpansion != null) {
            placeholderExpansion.unregister();
            placeholderExpansion = null;
        }

        if (nightVisionManager != null) {
            nightVisionManager.shutdown();
        }

        if (storage != null) {
            storage.close();
        }
    }

    public NightVisionManager getNightVisionManager() {
        return nightVisionManager;
    }

    public MessageService getMessageService() {
        return messageService;
    }

    public boolean isDebugEnabled() {
        return getConfig().getBoolean("debug", false);
    }

    public void debug(String message) {
        if (isDebugEnabled()) {
            getLogger().info("[Debug] " + message);
        }
    }

    private void registerCommands() {
        PluginCommand command = getCommand("nightvision");
        if (command == null) {
            throw new IllegalStateException("nightvision command is missing from plugin.yml");
        }

        NightVisionCommand executor = new NightVisionCommand(this, nightVisionManager);
        command.setExecutor(executor);
        command.setTabCompleter(executor);
    }

    private void registerPlaceholderExpansion() {
        if (getServer().getPluginManager().isPluginEnabled("PlaceholderAPI")) {
            this.placeholderExpansion = new EzNightvisionPlaceholderExpansion(this, nightVisionManager);
            this.placeholderExpansion.register();
            getLogger().info("Hooked into PlaceholderAPI.");
        }
    }
}
