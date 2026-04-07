# Persistent Night Vision

## Requirements

- Player has enabled state through `/nightvision` or `/nightvision on`
- Plugin can write to configured SQLite path (`storage.file`)

## What the Feature Does

This feature stores each player's Night Vision toggle state and keeps the potion effect applied when gameplay events remove it.

## Runtime Conditions

Night Vision is (re)applied when all conditions are true:

- Stored state in SQLite/cache is `true`
- Player is online
- Event triggers one of these restore paths:
  - Player joins
  - Player respawns
  - Player drinks milk
  - Player uses a totem (resurrection event)
  - Night Vision effect is removed/cleared by game mechanics

## Exact Config Keys

| Key | Type | Effect |
|-----|------|--------|
| `storage.file` | string | SQLite DB location for player state. |
| `effect.ambient` | boolean | Sets ambient flag on potion effect. |
| `effect.particles` | boolean | Enables/disables particles on potion effect. |
| `effect.icon` | boolean | Enables/disables effect icon. |
| `effect.reapply-delay-ticks` | long | Delay before reapplying after restore-trigger events. Minimum effective value is 1 tick. |
| `debug` | boolean | Enables debug logs around restore checks and effect removals. |

## Reload / Update Behavior

- `/nightvision reload` calls config reload and refreshes effect state for all online players.
- Updated `effect.*` values apply on the next effect update cycle.
- Stored player state is not reset during reload.
