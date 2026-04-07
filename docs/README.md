# EzNightvision

EzNightvision is a Paper/Folia plugin that lets players and staff persistently toggle Night Vision with command-based control.

## Features

- Toggle Night Vision on yourself with `/nightvision`, `/nightvision on`, or `/nightvision off`
- Toggle Night Vision for another online player with `/nightvision <on|off> <player>`
- Persists player toggle state in SQLite (`storage.file`)
- Reapplies effect after join, respawn, milk, totem use, and potion-effect removal events
- Optional PlaceholderAPI expansion with `%eznightvision_toggle%` and `%eznightvision_toggle_formatted%`
- Runtime config reload with `/nightvision reload`

## Downloads

| Platform | Link |
|----------|------|
| GitHub Releases | Not configured in this repository |
| SpigotMC | Not published |
| BuiltByBit | Not published |

## Requirements

| Requirement | Version |
|-------------|---------|
| Java | 21+ |
| Paper / Folia | 1.20+ |
| Required Plugins | None |
| Optional Plugins | PlaceholderAPI |
