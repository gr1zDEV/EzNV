# PlaceholderAPI Integration

## Requirements

- PlaceholderAPI installed and enabled on the server
- EzNightvision loaded after/with PlaceholderAPI available

## What the Feature Does

When PlaceholderAPI is present, EzNightvision registers an expansion and exposes player Night Vision state placeholders.

## Exact Config Keys

| Key | Type | Effect |
|-----|------|--------|
| `<pre><code>placeholders.enabled-format</code></pre>` | string | Output for `%eznightvision_toggle_formatted%` when enabled. |
| `<pre><code>placeholders.disabled-format</code></pre>` | string | Output for `%eznightvision_toggle_formatted%` when disabled. |

## Runtime Conditions

Placeholder expansion registers only when PlaceholderAPI is enabled during plugin startup.

Available placeholders:

- `%eznightvision_toggle%` → `true` or `false`
- `%eznightvision_toggle_formatted%` → formatted value from config keys above

Behavior details:

- Placeholder identifier is `eznightvision`.
- Placeholder state reads from stored toggle state (cache/SQLite-backed).
- If player context is missing in a PlaceholderAPI request, `%eznightvision_toggle%` returns `false`.

## Reload / Update Behavior

- `/nightvision reload` does not explicitly re-register PlaceholderAPI expansion.
- For PlaceholderAPI add/remove changes, perform a full server restart.

> Tip: Keep formatted outputs short (for example `&aON` / `&cOFF`) for scoreboard and tablist use.

> Note: Confirm this behavior against the plugin source/config before publishing.
