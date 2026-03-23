package org.ezinnovations.eznightvision.command;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.CompletableFuture;
import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.ConsoleCommandSender;
import org.bukkit.command.TabCompleter;
import org.bukkit.entity.Player;
import org.ezinnovations.eznightvision.EzNightvisionPlugin;
import org.ezinnovations.eznightvision.manager.NightVisionManager;
import org.ezinnovations.eznightvision.util.MessageService;

public final class NightVisionCommand implements CommandExecutor, TabCompleter {
    private final EzNightvisionPlugin plugin;
    private final NightVisionManager nightVisionManager;
    private final MessageService messageService;

    public NightVisionCommand(EzNightvisionPlugin plugin, NightVisionManager nightVisionManager) {
        this.plugin = plugin;
        this.nightVisionManager = nightVisionManager;
        this.messageService = plugin.getMessageService();
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (args.length == 0) {
            if (!(sender instanceof Player player)) {
                messageService.send(sender, "messages.console-must-specify-player");
                return true;
            }
            if (!sender.hasPermission("eznightvision.use")) {
                messageService.send(sender, "messages.no-permission");
                return true;
            }
            handleToggleSelf(player);
            return true;
        }

        if (args.length > 2) {
            messageService.send(sender, "messages.usage");
            return true;
        }

        String action = args[0].toLowerCase(Locale.ROOT);
        if (action.equals("reload")) {
            if (args.length != 1) {
                messageService.send(sender, "messages.usage");
                return true;
            }
            handleReload(sender);
            return true;
        }

        if (!action.equals("on") && !action.equals("off")) {
            messageService.send(sender, "messages.usage");
            return true;
        }

        boolean enable = action.equals("on");
        if (args.length == 1) {
            if (!(sender instanceof Player player)) {
                messageService.send(sender, "messages.console-must-specify-player");
                return true;
            }
            if (!sender.hasPermission("eznightvision.use")) {
                messageService.send(sender, "messages.no-permission");
                return true;
            }
            processSelfSet(player, enable);
            return true;
        }

        if (!sender.hasPermission("eznightvision.admin") && !(sender instanceof ConsoleCommandSender)) {
            messageService.send(sender, "messages.no-permission");
            return true;
        }

        Player target = Bukkit.getPlayerExact(args[1]);
        if (target == null) {
            messageService.send(sender, "messages.player-not-found");
            return true;
        }

        processOtherSet(sender, target, enable);
        return true;
    }

    @Override
    public List<String> onTabComplete(CommandSender sender, Command command, String alias, String[] args) {
        List<String> completions = new ArrayList<>();
        if (args.length == 1) {
            addIfMatches(completions, args[0], "on");
            addIfMatches(completions, args[0], "off");
            if (sender.hasPermission("eznightvision.admin") || sender instanceof ConsoleCommandSender) {
                addIfMatches(completions, args[0], "reload");
            }
            return completions;
        }

        if (args.length == 2 && (args[0].equalsIgnoreCase("on") || args[0].equalsIgnoreCase("off"))) {
            if (!sender.hasPermission("eznightvision.admin") && !(sender instanceof ConsoleCommandSender)) {
                return completions;
            }
            for (Player player : Bukkit.getOnlinePlayers()) {
                addIfMatches(completions, args[1], player.getName());
            }
        }
        return completions;
    }

    private void handleReload(CommandSender sender) {
        if (!sender.hasPermission("eznightvision.admin") && !(sender instanceof ConsoleCommandSender)) {
            messageService.send(sender, "messages.no-permission");
            return;
        }

        try {
            plugin.reloadPlugin();
            messageService.send(sender, "messages.reload-success");
        } catch (Exception exception) {
            plugin.getLogger().severe("Failed to reload EzNightvision configuration: " + exception.getMessage());
            messageService.send(sender, "messages.reload-failed");
        }
    }

    private void handleToggleSelf(Player player) {
        nightVisionManager.getStoredState(player.getUniqueId())
            .thenCompose(enabled -> nightVisionManager.setEnabled(player, !enabled))
            .thenAccept(enabled -> runForSender(player, () ->
                messageService.send(player, enabled ? "messages.enabled-self" : "messages.disabled-self")
            ))
            .exceptionally(throwable -> {
                plugin.getLogger().severe("Failed to toggle night vision for " + player.getName() + ": " + throwable.getMessage());
                return null;
            });
    }

    private void processSelfSet(Player player, boolean enable) {
        nightVisionManager.getStoredState(player.getUniqueId()).thenCompose(current -> {
            if (current == enable) {
                runForSender(player, () -> messageService.send(player, enable ? "messages.already-enabled" : "messages.already-disabled"));
                return CompletableFuture.completedFuture(null);
            }
            return nightVisionManager.setEnabled(player, enable).thenAccept(result ->
                runForSender(player, () -> messageService.send(player, enable ? "messages.enabled-self" : "messages.disabled-self"))
            );
        }).exceptionally(throwable -> {
            plugin.getLogger().severe("Failed to set night vision for " + player.getName() + ": " + throwable.getMessage());
            return null;
        });
    }

    private void processOtherSet(CommandSender sender, Player target, boolean enable) {
        nightVisionManager.getStoredState(target.getUniqueId()).thenCompose(current -> {
            if (current == enable) {
                runForSender(sender, () -> messageService.send(sender, enable ? "messages.already-enabled" : "messages.already-disabled"));
                return CompletableFuture.completedFuture(null);
            }
            return nightVisionManager.setEnabled(target, enable).thenAccept(result -> {
                runForSender(sender, () -> messageService.send(sender, enable ? "messages.enabled-other" : "messages.disabled-other", "%player%", target.getName()));
                runForSender(target, () -> messageService.send(target, enable ? "messages.target-enabled" : "messages.target-disabled"));
            });
        }).exceptionally(throwable -> {
            plugin.getLogger().severe("Failed to set night vision for " + target.getName() + ": " + throwable.getMessage());
            return null;
        });
    }

    private void runForSender(CommandSender sender, Runnable action) {
        if (sender instanceof Player player) {
            player.getScheduler().run(plugin, task -> action.run(), null);
            return;
        }
        plugin.getServer().getGlobalRegionScheduler().execute(plugin, action);
    }

    private void addIfMatches(List<String> completions, String input, String option) {
        if (option.regionMatches(true, 0, input, 0, input.length())) {
            completions.add(option);
        }
    }
}
