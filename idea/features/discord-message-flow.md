# Discord Message Flow

EzDonutDiscord is built around a single player-facing command, but the response is more than a plain text line. The plugin assembles a clickable invite component, optional hover text, optional action bar feedback, and optional sound feedback from your config.

## What Happens On `/discord`

1. The plugin checks `ezdonutdiscord.discord` or `ezdonutdiscord.admin`.
2. If `message.discord.enabled` is `false`, the sender gets a disabled notice instead of the invite.
3. Each line in `message.discord.lines` is processed and sent in order.
4. If a line contains `%link_display%`, that segment becomes clickable and opens `link.raw`.
5. If `message.discord.hover` contains text, it is attached as hover text to the clickable invite.
6. If the sender is a player, the plugin can also send the configured action bar and play the configured pling sound.

## Practical Notes

- The clickable portion is created only from `%link_display%`. Plain text lines stay plain text.
- `/discord reload` also reuses the same pling sound profile for players when sound feedback is enabled.
- The plugin hides the namespaced command variant `ezdonutdiscord:discord` from normal player command lists unless the player has reload-level access.
