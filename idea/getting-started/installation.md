# Installation

## Requirements

- **Java:** 21+
- **Server Software:** Paper or Folia 1.21+
- **Required Plugins:** None
- **Optional Plugins:** PlaceholderAPI 2.11.6+ if you want placeholder parsing or EzDonutDiscord placeholders

## Steps

1. Download the latest plugin jar, or build it from source with `mvn package`.
2. Place `EzDonutDiscord-1.0.0.jar` into your server's `/plugins/` folder.
3. Start your server with a full restart so the plugin can generate `/plugins/EzDonutDiscord/config.yml`.
4. Open the config and update your Discord invite settings.
5. Run `/discord` in game to verify the clickable invite, action bar, and sound behavior.

> Warning: Always do a full server restart when installing or updating the plugin. Do not use `/reload`.

## Updating

1. Stop your server.
2. Replace the old jar with the new one.
3. Start the server again.
4. Review the [Configuration](configuration.md) page for any new keys before reloading the plugin live.

> Tip: `/discord reload` is useful for message edits, but full restarts are still the safer path for version updates.

## Uninstalling

1. Stop your server.
2. Remove the plugin jar from `/plugins/`.
3. Optionally delete `/plugins/EzDonutDiscord/` if you also want to remove the config file.
