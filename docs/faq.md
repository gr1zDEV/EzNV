# FAQ

## Practical Notes

**Q: What is the main command and alias?**  
A: Main command is `/nightvision` with alias `/nv`.

**Q: Can console toggle itself?**  
A: No. Console must specify a target player for `on`/`off` and can run `/nightvision reload`.

**Q: Does the plugin remember toggles after relog/restart?**  
A: Yes, state is persisted in SQLite at `storage.file`.

**Q: Why does a player lose Night Vision briefly after respawn or milk?**  
A: Reapply is delayed by `effect.reapply-delay-ticks` (minimum effective value is 1 tick).

**Q: Which permission is needed for staff targeting and reload?**  
A: `eznightvision.admin`.

**Q: Are PlaceholderAPI placeholders always available?**  
A: No. They are only available when PlaceholderAPI is installed and enabled.

**Q: Is `/reload` safe for this plugin?**  
A: Prefer full restarts for plugin updates. Use `/nightvision reload` for config reload only.
