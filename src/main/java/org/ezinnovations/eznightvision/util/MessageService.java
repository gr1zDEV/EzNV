package org.ezinnovations.eznightvision.util;

import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.serializer.legacy.LegacyComponentSerializer;
import org.bukkit.ChatColor;
import org.bukkit.command.CommandSender;
import org.ezinnovations.eznightvision.EzNightvisionPlugin;

public final class MessageService {
    private final EzNightvisionPlugin plugin;
    private final LegacyComponentSerializer legacySerializer;

    public MessageService(EzNightvisionPlugin plugin) {
        this.plugin = plugin;
        this.legacySerializer = LegacyComponentSerializer.legacyAmpersand();
    }

    public void send(CommandSender sender, String path) {
        send(sender, path, new String[0]);
    }

    public void send(CommandSender sender, String path, String... replacements) {
        String raw = plugin.getConfig().getString(path, path);
        String prefix = plugin.getConfig().getString("messages.prefix", "");
        String message = applyReplacements(prefix + raw, replacements);
        Component component = legacySerializer.deserialize(message);
        sender.sendMessage(component);
    }

    public String colorize(String text) {
        return ChatColor.translateAlternateColorCodes('&', text == null ? "" : text);
    }

    private String applyReplacements(String input, String... replacements) {
        String result = input;
        for (int index = 0; index + 1 < replacements.length; index += 2) {
            result = result.replace(replacements[index], replacements[index + 1]);
        }
        return result;
    }
}
