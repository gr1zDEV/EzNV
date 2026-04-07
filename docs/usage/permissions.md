# Permissions

## Requirements

- Use a permissions plugin (for example, LuckPerms) for predictable staff/player access control.

## Practical Notes

| Permission | Description | Default |
|------------|-------------|---------|
| `eznightvision.use` | Allows self usage of `/nightvision`, `/nightvision on`, and `/nightvision off`. | `true` |
| `eznightvision.admin` | Allows `/nightvision reload` and `<on|off> <player>` staff targeting. | `op` |

- Operators (`op`) inherit `eznightvision.admin` by default.
- Non-op players can still self-toggle because `eznightvision.use` defaults to `true`.
- Console can execute admin-only actions without explicit permission assignment.

> Tip: Grant `eznightvision.admin` to staff groups, and leave `eznightvision.use` enabled globally unless your server has custom restrictions.
