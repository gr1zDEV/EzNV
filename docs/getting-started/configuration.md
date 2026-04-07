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
debug: false # Enables verbose restore/effect debug logging.
storage:
  file: data/eznightvision.db # SQLite path used to persist player toggle state.
effect:
  ambient: false # Sets the ambient potion flag.
  particles: false # Shows or hides Night Vision particles.
  icon: false # Shows or hides the Night Vision icon.
  reapply-delay-ticks: 2 # Delay before reapplying Night Vision after trigger events.
placeholders:
  enabled-format: '&aON' # Value used for %eznightvision_toggle_formatted% when enabled.
  disabled-format: '&cOFF' # Value used for %eznightvision_toggle_formatted% when disabled.
messages:
  prefix: '&8[&bEzNightvision&8] &r' # Prefix prepended to plugin chat messages.
  enabled-self: '&aNight Vision enabled.' # Sent when a player enables Night Vision for themself.
  disabled-self: '&cNight Vision disabled.' # Sent when a player disables Night Vision for themself.
  enabled-other: '&aEnabled Night Vision for &f%player%&a.' # Sent to staff after enabling another player.
  disabled-other: '&cDisabled Night Vision for &f%player%&c.' # Sent to staff after disabling another player.
  target-enabled: '&aNight Vision has been enabled by staff.' # Sent to the target player when staff enables it.
  target-disabled: '&cNight Vision has been disabled by staff.' # Sent to the target player when staff disables it.
  no-permission: '&cYou do not have permission to do that.' # Sent when command permission checks fail.
  player-not-found: '&cPlayer not found.' # Sent when a target player name cannot be resolved.
  console-must-specify-player: '&cConsole must specify a player.' # Sent when console omits a required target player.
  already-enabled: '&eNight Vision is already enabled.' # Sent when enabling while already enabled.
  already-disabled: '&eNight Vision is already disabled.' # Sent when disabling while already disabled.
  usage: '&eUsage: /nightvision [on|off|reload] [player]' # Command usage help text.
  reload-success: '&aEzNightvision configuration reloaded.' # Sent after a successful /nightvision reload.
  reload-failed: '&cFailed to reload the EzNightvision configuration. Check console for details.' # Sent after a failed /nightvision reload.
```

## Reload Behavior

- Use `/nightvision reload` after editing `config.yml`.
- Reload refreshes config and reapplies effect state checks to online players.
- For plugin jar upgrades, use a full server restart (avoid Bukkit `/reload`).
