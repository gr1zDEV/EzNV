# PlaceholderAPI

PlaceholderAPI support in EzDonutDiscord is optional. The plugin soft-depends on PlaceholderAPI, detects it at runtime, and can both parse PlaceholderAPI placeholders inside its own messages and register an expansion with EzDonutDiscord-specific values.

## Built-In EzDonutDiscord Placeholders

When PlaceholderAPI is installed and support is enabled, EzDonutDiscord registers these placeholders:

- `%ezdonutdiscord_link_raw%`
- `%ezdonutdiscord_link_display%`

These values are read directly from `link.raw` and `link.display` in `config.yml`.

## Placeholder Parsing Inside Messages

EzDonutDiscord can also parse PlaceholderAPI placeholders inside:

- `message.discord.lines`
- `message.discord.hover`
- `message.actionbar.text`
- `message.reload.lines`

Parsing only happens when all of the following are true:

- PlaceholderAPI is installed on the server
- `placeholderapi.enabled` is `true`
- The sender is a player

## Reload Behavior

Running `/discord reload` also refreshes PlaceholderAPI integration. If PlaceholderAPI was added, removed, or disabled, EzDonutDiscord updates its expansion registration during the reload cycle.
