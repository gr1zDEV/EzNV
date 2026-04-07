# Troubleshooting

Use this page when `/discord` does not behave as expected.

## Quick Checks

1. Confirm your server is running **Java 21+** and **Paper/Folia 1.21+**.
2. Confirm the plugin jar is in `/plugins/` and the server was fully restarted.
3. Confirm `/plugins/EzDonutDiscord/config.yml` exists and is valid YAML.
4. Confirm the player has the right permission node.
5. Run `/discord reload` after config edits.

## Symptom Guide

| Symptom | Most likely cause | What to do |
|---|---|---|
| Nothing happens with `/discord` | Missing `ezdonutdiscord.discord` | Grant `ezdonutdiscord.discord` (or `ezdonutdiscord.admin`) using LuckPerms. |
| `/discord reload` is unknown or denied | Missing `ezdonutdiscord.reload` | Grant `ezdonutdiscord.reload` to trusted staff only. |
| Invite text shows but is not clickable | `%link_display%` not included in message line | Add `%link_display%` to one of `message.discord.lines`. |
| Click opens wrong URL | `link.raw` misconfigured | Set `link.raw` to your full invite URL (including `https://`). |
| Hover text does not show | `message.discord.hover` empty | Add at least one hover line under `message.discord.hover`. |
| Action bar does not appear | `message.actionbar.enabled` is `false` or sender is console | Set it to `true`; note that console cannot receive action bars. |
| Sound does not play | Sound disabled or invalid sound key | Set `sounds.pling.enabled: true` and verify `sounds.pling.sound`. |
| PlaceholderAPI placeholders stay raw text | PlaceholderAPI missing/disabled, or sender is console | Install PlaceholderAPI, keep `placeholderapi.enabled: true`, and test as a player. |

## PlaceholderAPI Debug Checklist

- Check PlaceholderAPI is installed and loaded during startup.
- Run `/papi parse me %ezdonutdiscord_link_raw%` to verify expansion output.
- If you installed PlaceholderAPI after boot, run `/discord reload` or restart.

## Safe Operations

- Prefer full restarts for plugin updates.
- Use `/discord reload` for message/config edits only.
- Avoid Bukkit `/reload`.
