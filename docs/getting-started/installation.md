# Installation

## Requirements

- Java 21 or newer
- Paper or Folia server on Minecraft 1.20+
- Access to the server `/plugins/` directory
- Optional: PlaceholderAPI if you plan to use `%eznightvision_*%` placeholders

## Steps

1. Download the EzNightvision `.jar` release (or build with `mvn package`).
2. Stop your server.
3. Place the jar in `/plugins/`.
4. Start the server once to generate `/plugins/EzNightvision/config.yml`.
5. Review and adjust keys such as:
   - `storage.file`
   - `effect.ambient`
   - `effect.particles`
   - `effect.icon`
   - `effect.reapply-delay-ticks`
   - `messages.*`
6. Join the server and run `/nightvision` to verify command and effect behavior.

> Warning: Do not use Bukkit `/reload` for plugin installation or jar upgrades. Use a full restart.

> Tip: Use `/nightvision reload` after editing `config.yml` message/effect keys to apply changes without replacing the jar.

## Updating

1. Stop the server.
2. Replace the old EzNightvision jar in `/plugins/`.
3. Start the server.
4. Compare your existing `config.yml` against new defaults before running `/nightvision reload`.

> Note: Confirm this behavior against the plugin source/config before publishing.

## Uninstalling

1. Stop the server.
2. Remove the EzNightvision jar from `/plugins/`.
3. Optional: delete `/plugins/EzNightvision/` to remove `config.yml` and SQLite data file.
4. Start the server.
