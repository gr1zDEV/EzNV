package org.ezinnovations.eznightvision.placeholder;

import me.clip.placeholderapi.expansion.PlaceholderExpansion;
import org.bukkit.OfflinePlayer;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.ezinnovations.eznightvision.EzNightvisionPlugin;
import org.ezinnovations.eznightvision.manager.NightVisionManager;

public final class EzNightvisionPlaceholderExpansion extends PlaceholderExpansion {
    private final EzNightvisionPlugin plugin;
    private final NightVisionManager nightVisionManager;

    public EzNightvisionPlaceholderExpansion(EzNightvisionPlugin plugin, NightVisionManager nightVisionManager) {
        this.plugin = plugin;
        this.nightVisionManager = nightVisionManager;
    }

    @Override
    public @NotNull String getIdentifier() {
        return "eznightvision";
    }

    @Override
    public @NotNull String getAuthor() {
        return "EzInnovations";
    }

    @Override
    public @NotNull String getVersion() {
        return plugin.getPluginMeta().getVersion();
    }

    @Override
    public boolean persist() {
        return true;
    }

    @Override
    public @Nullable String onRequest(OfflinePlayer player, @NotNull String params) {
        if (player == null || player.getUniqueId() == null) {
            return "false";
        }

        return switch (params.toLowerCase()) {
            case "toggle" -> Boolean.toString(nightVisionManager.getStoredStateNow(player.getUniqueId()));
            case "toggle_formatted" -> nightVisionManager.getFormattedState(player.getUniqueId());
            default -> null;
        };
    }
}
