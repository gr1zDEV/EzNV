# Troubleshooting

## Requirements

- Access to server console and `logs/latest.log`
- Permission to run `/nightvision` commands for testing

## Steps

1. Confirm server version and Java version meet minimum requirements.
2. Confirm EzNightvision loaded cleanly at startup.
3. Check `config.yml` for YAML errors.
4. Validate permission nodes on a test player.
5. Re-test using `/nightvision on`, `/nightvision off`, and `/nightvision reload`.

## What Happens On Common Failures

| Symptom | Likely Cause | Action |
|---|---|---|
| `/nightvision` returns no-permission message | Missing `eznightvision.use` | Grant `eznightvision.use` and retest. |
| `/nightvision on <player>` denied | Missing `eznightvision.admin` | Grant `eznightvision.admin` to the sender. |
| `Player not found` | Target is offline or name mismatch | Use exact online name and retry. |
| Night Vision disappears after milk/respawn | Reapply delay or conflicting plugin behavior | Check `effect.reapply-delay-ticks`; raise slightly if needed. |
| Placeholder text shows raw `%eznightvision_*%` | PlaceholderAPI missing or not loaded | Install/enable PlaceholderAPI and restart server. |
| Reload fails message appears | Invalid config value or YAML formatting issue | Fix `config.yml` syntax and run `/nightvision reload` again. |

## Practical Notes

- SQLite state lives at `storage.file` and is authoritative for toggled status.
- `debug: true` adds internal effect reapply logs to the console.
- The plugin reapplies Night Vision when the effect is removed while stored state is enabled.

> Warning: If another plugin continuously edits potion effects, you can see repeated reapply cycles.

> Tip: Test with only EzNightvision enabled when isolating conflicts.
