# FAQ

**Q: The plugin is not loading. What should I check first?**  
A: Confirm that your server is running Java 21+ and Paper or Folia 1.21+. Then check `logs/latest.log` for startup errors.

**Q: Can I use this on Folia?**  
A: Yes. `plugin.yml` marks EzDonutDiscord as Folia-supported.

**Q: Why are my PlaceholderAPI placeholders not resolving?**  
A: Make sure PlaceholderAPI is installed, `placeholderapi.enabled` is still `true`, and you are testing with a player sender. Console senders do not get PlaceholderAPI parsing.

**Q: Why can some staff members tab-complete `/discord reload` but others cannot?**  
A: The plugin only exposes the `reload` tab completion to senders with `ezdonutdiscord.reload` or `ezdonutdiscord.admin`.

**Q: Can I reload the config without restarting the whole server?**  
A: Yes. Use `/discord reload`. For jar updates, a full restart is still recommended.

**Q: Is there a full issue checklist for common problems?**  
A: Yes. See the [Troubleshooting](usage/troubleshooting.md) page for symptom-based fixes.
