# Commands

## Requirements

- The plugin must be enabled.
- Sender must have the relevant permission node.
- Targeted player operations require the target to be online.

## Steps

1. Run `/nightvision` to toggle your stored state.
2. Run `/nightvision on` or `/nightvision off` to force your own state.
3. Run `/nightvision on <player>` or `/nightvision off <player>` for staff actions.
4. Run `/nightvision reload` after config edits.

| Command | Description | Permission |
|---------|-------------|------------|
| `/nightvision` | Toggles the sender's stored Night Vision state. Console cannot use without a player argument. | `eznightvision.use` |
| `/nightvision on` | Enables Night Vision for the sender if not already enabled. | `eznightvision.use` |
| `/nightvision off` | Disables Night Vision for the sender if not already disabled. | `eznightvision.use` |
| `/nightvision on <player>` | Enables Night Vision for an online target player. | `eznightvision.admin` |
| `/nightvision off <player>` | Disables Night Vision for an online target player. | `eznightvision.admin` |
| `/nightvision reload` | Reloads `config.yml` and refreshes effect state for online players. | `eznightvision.admin` |

## Practical Notes

- Main command: `nightvision`
- Alias: `nv`
- Tab completion:
  - First arg suggests `on`, `off`, and `reload` (reload only for admin/console).
  - Second arg suggests online player names when using `on` or `off` with admin access.
- Console behavior:
  - `/nightvision` and `/nightvision on|off` without target return the configured console warning.
