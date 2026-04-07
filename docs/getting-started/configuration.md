# Configuration

After first startup, EzNightvision creates `/plugins/EzNightvision/config.yml`.

## Core Behavior

EzNightvision stores each player's toggle state and reapplies Night Vision when that stored state is enabled.

Reapply triggers include:

- Player join
- Player respawn
- Milk bucket effect clear
- Totem-use resurrection flow
- Night Vision removal from gameplay/plugin events

## config.yml

```yaml
debug: false
storage:
  file: data/eznightvision.db
effect:
  ambient: false
  particles: false
  icon: false
  reapply-delay-ticks: 2
placeholders:
  enabled-format: '&aON'
  disabled-format: '&cOFF'
messages:
  prefix: '&8[&bEzNightvision&8] &r'
  enabled-self: '&aNight Vision enabled.'
  disabled-self: '&cNight Vision disabled.'
  enabled-other: '&aEnabled Night Vision for &f%player%&a.'
  disabled-other: '&cDisabled Night Vision for &f%player%&c.'
  target-enabled: '&aNight Vision has been enabled by staff.'
  target-disabled: '&cNight Vision has been disabled by staff.'
  no-permission: '&cYou do not have permission to do that.'
  player-not-found: '&cPlayer not found.'
  console-must-specify-player: '&cConsole must specify a player.'
  already-enabled: '&eNight Vision is already enabled.'
  already-disabled: '&eNight Vision is already disabled.'
  usage: '&eUsage: /nightvision [on|off|reload] [player]'
  reload-success: '&aEzNightvision configuration reloaded.'
  reload-failed: '&cFailed to reload the EzNightvision configuration. Check console for details.'
```

## Key Reference

| Key | Type | Purpose |
|---|---|---|
| `debug` | boolean | Enables verbose restore/effect debug logging. |
| `storage.file` | string | SQLite path used to persist player state. |
| `effect.ambient` | boolean | Sets ambient potion flag. |
| `effect.particles` | boolean | Shows/hides potion particles. |
| `effect.icon` | boolean | Shows/hides potion icon. |
| `effect.reapply-delay-ticks` | long | Delay before reapplying Night Vision after trigger events. |
| `placeholders.enabled-format` | string | Value used for `%eznightvision_toggle_formatted%` when enabled. |
| `placeholders.disabled-format` | string | Value used for `%eznightvision_toggle_formatted%` when disabled. |
| `messages.*` | string | User-facing command and status messages. |

## Reload Behavior

- Use `/nightvision reload` after editing `config.yml`.
- Reload refreshes config and reapplies effect state checks to online players.
- For plugin jar upgrades, use a full server restart (avoid Bukkit `/reload`).
