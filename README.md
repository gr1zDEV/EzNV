# EzNightvision

EzNightvision is a lightweight Paper/Folia plugin that lets players toggle permanent Night Vision and keeps that preference saved in SQLite so it survives reconnects and restarts.

## Features

- Toggle Night Vision for yourself with a simple command.
- Let staff enable or disable Night Vision for other players.
- Persist player state in SQLite.
- Works on Paper and Folia-compatible servers.
- Includes PlaceholderAPI placeholders for scoreboards, chat, GUIs, and other integrations.
- Configurable messages, placeholder output, potion effect flags, and storage path.

## Requirements

- Java 21
- Paper / Folia compatible server on the 1.20 API line
- PlaceholderAPI is optional and only required if you want to use the placeholders below

## Installation

1. Build or download the plugin jar.
2. Place the jar in your server's `plugins/` folder.
3. Optional: install PlaceholderAPI if you want placeholder support.
4. Start or restart the server.
5. Edit `plugins/EzNightvision/config.yml` if you want to customize messages, storage, or effect settings.
6. Reloading the plugin is not documented by this project, so a full restart is the safest way to apply config changes.

## Build from source

```bash
mvn package
```

The shaded plugin jar will be produced in `target/`.

## Commands

| Command | Description | Permission |
| --- | --- | --- |
| `/nightvision` | Toggle Night Vision for yourself. Players only. | `eznightvision.use` |
| `/nightvision on` | Force-enable your own Night Vision. | `eznightvision.use` |
| `/nightvision off` | Force-disable your own Night Vision. | `eznightvision.use` |
| `/nightvision on <player>` | Enable Night Vision for another online player. | `eznightvision.admin` |
| `/nightvision off <player>` | Disable Night Vision for another online player. | `eznightvision.admin` |
| `/nv` | Alias for `/nightvision`. | Same as above |

### Command notes

- Console must specify a player name, for example: `/nightvision on Steve`
- Staff actions only work on online players.
- If a player is already in the requested state, the plugin sends an `already-enabled` or `already-disabled` message instead of rewriting the state.

## Permissions

| Permission | Default | Description |
| --- | --- | --- |
| `eznightvision.use` | `true` | Allows a player to toggle their own Night Vision. |
| `eznightvision.admin` | `op` | Allows toggling Night Vision for other players. |

## PlaceholderAPI placeholders

If PlaceholderAPI is installed, EzNightvision registers the `eznightvision` expansion automatically.

| Placeholder | Output | Example use |
| --- | --- | --- |
| `%eznightvision_toggle%` | Raw boolean state: `true` or `false` | Conditional logic, scripts, or boolean displays |
| `%eznightvision_toggle_formatted%` | Formatted state from config | Scoreboards, menus, chat, action bars |

### Placeholder formatting

The formatted placeholder uses these config values:

- `placeholders.enabled-format`
- `placeholders.disabled-format`

Default output:

- Enabled: `&aON`
- Disabled: `&cOFF`

You can change those values to anything you want, for example:

```yml
placeholders:
  enabled-format: '&aEnabled'
  disabled-format: '&cDisabled'
```

## Configuration guide

Default config sections are shown below with an explanation of what each value means.

### `debug`

```yml
debug: false
```

- Set to `true` to log plugin debug messages.
- Leave `false` for normal production use.

### `storage.file`

```yml
storage:
  file: data/eznightvision.db
```

- Sets the SQLite database path.
- Relative paths are resolved inside the plugin data folder.
- With the default value, the database will be stored at:
  - `plugins/EzNightvision/data/eznightvision.db`
- You can also use an absolute path if you want the database elsewhere.

### `effect`

```yml
effect:
  ambient: false
  particles: false
  icon: false
  reapply-delay-ticks: 2
```

- `ambient`: controls the ambient potion flag.
- `particles`: controls whether potion particles are shown.
- `icon`: controls whether the status effect icon is shown in the inventory/HUD.
- `reapply-delay-ticks`: delay before reapplying the effect after relevant player events.

If you want the effect to be as hidden as possible, keep `ambient`, `particles`, and `icon` set to `false`.

### `placeholders`

```yml
placeholders:
  enabled-format: '&aON'
  disabled-format: '&cOFF'
```

These values define what `%eznightvision_toggle_formatted%` returns.

### `messages`

```yml
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
  usage: '&eUsage: /nightvision [on|off] [player]'
```

#### Message placeholders

These are placeholders inside message strings, not PlaceholderAPI placeholders:

| Placeholder | Meaning |
| --- | --- |
| `%player%` | Target player name in staff messages |

#### Color codes

- Messages and formatted placeholder values support legacy `&` color codes.
- Example: `&a`, `&c`, `&7`, `&l`, and so on.

## Common examples

### Give all players self-toggle access

```yml
permissions:
  eznightvision.use: true
```

Most permission plugins handle this outside the plugin itself, but this is the node you would grant.

### Staff command examples

```text
/nightvision on Alex
/nightvision off Alex
```

### Scoreboard example with PlaceholderAPI

```text
Night Vision: %eznightvision_toggle_formatted%
```

### Boolean placeholder example

```text
%eznightvision_toggle%
```

This returns `true` when the player has saved Night Vision enabled, otherwise `false`.

## Data storage

EzNightvision stores one saved state per player in SQLite with:

- player UUID
- latest known player name
- enabled/disabled state
- last updated timestamp

This means the plugin remembers whether a player wanted Night Vision enabled even after they leave the server.

## Support and customization tips

- Use `enabled-self`, `disabled-self`, and the other message keys to match your server tone.
- Use `%eznightvision_toggle_formatted%` anywhere you want a friendly ON/OFF display.
- Use `%eznightvision_toggle%` when another plugin expects a simple boolean value.
- If you move the database with `storage.file`, make sure the server process can write to that location.
