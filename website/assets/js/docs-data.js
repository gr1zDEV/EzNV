window.DOCS_DATA = {
  groups: [
    {
      title: 'Overview',
      pages: [
        { id: 'index', label: 'EzNightvision' }
      ]
    },
    {
      title: 'Getting Started',
      pages: [
        { id: 'configuration', label: 'Configuration' }
      ]
    },
    {
      title: 'Usage',
      pages: [
        { id: 'commands', label: 'Commands' },
        { id: 'permissions', label: 'Permissions' },
        { id: 'placeholderapi-integration', label: 'Placeholders' }
      ]
    },
    {
      title: 'More',
      pages: [
        { id: 'troubleshooting', label: 'Troubleshooting' },
        { id: 'faq', label: 'FAQ' },
        { id: 'changelog', label: 'Changelog' }
      ]
    }
  ],
  pages: {
    index: {
      title: 'EzNightvision Docs',
      topbarTitle: 'EzNightvision',
      meta: ['Overview', 'Home'],
      content: `
        <h1>EzNightvision</h1>
        <p class="lead">EzNightvision is a Paper/Folia plugin that lets players and staff persistently toggle Night Vision with command-based control.</p>

        <section id="features"><h2>Features</h2>
          <ul>
            <li>Toggle Night Vision on yourself with <span class="inline-code">/nightvision</span>, <span class="inline-code">/nightvision on</span>, or <span class="inline-code">/nightvision off</span></li>
            <li>Toggle Night Vision for another online player with <span class="inline-code">/nightvision &lt;on|off&gt; &lt;player&gt;</span></li>
            <li>Persists player toggle state in SQLite (<pre><code>storage.file</code></pre>)</li>
            <li>Reapplies effect after join, respawn, milk, totem use, and potion-effect removal events</li>
            <li>Optional PlaceholderAPI expansion with toggle placeholders and configurable formatted output (<pre><code>placeholders.enabled-format</code></pre> / <pre><code>placeholders.disabled-format</code></pre>)</li>
            <li>Runtime config reload with <span class="inline-code">/nightvision reload</span></li>
          </ul>
        </section>

        <section id="downloads"><h2>Downloads</h2>
          <div class="table-wrap"><table>
            <thead><tr><th>Platform</th><th>Link</th></tr></thead>
            <tbody>
              <tr><td>GitHub Releases</td><td>Not configured in this repository</td></tr>
              <tr><td>SpigotMC</td><td>Not published</td></tr>
              <tr><td>BuiltByBit</td><td>Not published</td></tr>
            </tbody>
          </table></div>
        </section>

        <section id="requirements"><h2>Requirements</h2>
          <div class="table-wrap"><table>
            <thead><tr><th>Requirement</th><th>Version</th></tr></thead>
            <tbody>
              <tr><td>Java</td><td>21+</td></tr>
              <tr><td>Paper / Folia</td><td>1.20+</td></tr>
              <tr><td>Required Plugins</td><td>None</td></tr>
              <tr><td>Optional Plugins</td><td>PlaceholderAPI</td></tr>
            </tbody>
          </table></div>
        </section>
      `
    },

    configuration: {
      title: 'Configuration · EzNightvision Docs',
      topbarTitle: 'Configuration',
      meta: ['Getting Started', 'Setup'],
      content: `
        <h1>Configuration</h1>

        <section id="core-behavior"><h2>Core Behavior</h2>
          <p>EzNightvision stores each player's toggle state and reapplies Night Vision when stored state is enabled.</p>
          <p>Reapply triggers include player join, respawn, milk effect clear, totem-use resurrection, and Night Vision removal from gameplay/plugin events.</p>
        </section>

        <section id="config"><h2>config.yml</h2>
          <div class="code-block">
            <div class="code-head">/plugins/EzNightvision/config.yml</div>
            <pre><code>debug: false # Enables verbose restore/effect debug logging.
storage:
  file: data/eznightvision.db # SQLite path used to persist player toggle state.
effect:
  ambient: false # Sets the ambient potion flag.
  particles: false # Shows or hides Night Vision particles.
  icon: false # Shows or hides the Night Vision icon.
  reapply-delay-ticks: 2 # Delay before reapplying Night Vision after trigger events.
placeholders:
  enabled-format: '&amp;aON' # Value used for %eznightvision_toggle_formatted% when enabled.
  disabled-format: '&amp;cOFF' # Value used for %eznightvision_toggle_formatted% when disabled.
messages:
  prefix: '&amp;8[&amp;bEzNightvision&amp;8] &amp;r' # Prefix prepended to plugin chat messages.
  enabled-self: '&amp;aNight Vision enabled.' # Sent when a player enables Night Vision for themself.
  disabled-self: '&amp;cNight Vision disabled.' # Sent when a player disables Night Vision for themself.
  enabled-other: '&amp;aEnabled Night Vision for &amp;f%player%&amp;a.' # Sent to staff after enabling another player.
  disabled-other: '&amp;cDisabled Night Vision for &amp;f%player%&amp;c.' # Sent to staff after disabling another player.
  target-enabled: '&amp;aNight Vision has been enabled by staff.' # Sent to the target player when staff enables it.
  target-disabled: '&amp;cNight Vision has been disabled by staff.' # Sent to the target player when staff disables it.
  no-permission: '&amp;cYou do not have permission to do that.' # Sent when command permission checks fail.
  player-not-found: '&amp;cPlayer not found.' # Sent when a target player name cannot be resolved.
  console-must-specify-player: '&amp;cConsole must specify a player.' # Sent when console omits a required target player.
  already-enabled: '&amp;eNight Vision is already enabled.' # Sent when enabling while already enabled.
  already-disabled: '&amp;eNight Vision is already disabled.' # Sent when disabling while already disabled.
  usage: '&amp;eUsage: /nightvision [on|off|reload] [player]' # Command usage help text.
  reload-success: '&amp;aEzNightvision configuration reloaded.' # Sent after a successful /nightvision reload.
  reload-failed: '&amp;cFailed to reload the EzNightvision configuration. Check console for details.' # Sent after a failed /nightvision reload.</code></pre>
          </div>
        </section>

        <section id="updating"><h2>Updating</h2>
          <ol>
            <li>Stop the server.</li>
            <li>Replace the old EzNightvision jar in <span class="inline-code">/plugins/</span>.</li>
            <li>Start the server.</li>
            <li>Compare your existing <span class="inline-code">config.yml</span> against new defaults before running <span class="inline-code">/nightvision reload</span>.</li>
          </ol>
        </section>

        <section id="uninstalling"><h2>Uninstalling</h2>
          <ol>
            <li>Stop the server.</li>
            <li>Remove the EzNightvision jar from <span class="inline-code">/plugins/</span>.</li>
            <li>Optional: delete <span class="inline-code">/plugins/EzNightvision/</span> to remove <span class="inline-code">config.yml</span> and SQLite data file.</li>
            <li>Start the server.</li>
          </ol>
        </section>
      `
    },

    commands: {
      title: 'Commands · EzNightvision Docs',
      topbarTitle: 'Commands',
      meta: ['Usage', 'Commands'],
      content: `
        <h1>Commands</h1>

        <section id="requirements"><h2>Requirements</h2>
          <ul>
            <li>The plugin must be enabled.</li>
            <li>Sender must have the relevant permission node.</li>
            <li>Targeted player operations require the target to be online.</li>
          </ul>
        </section>

        <section id="steps"><h2>Steps</h2>
          <ol>
            <li>Run <span class="inline-code">/nightvision</span> to toggle your stored state.</li>
            <li>Run <span class="inline-code">/nightvision on</span> or <span class="inline-code">/nightvision off</span> to force your own state.</li>
            <li>Run <span class="inline-code">/nightvision on &lt;player&gt;</span> or <span class="inline-code">/nightvision off &lt;player&gt;</span> for staff actions.</li>
            <li>Run <span class="inline-code">/nightvision reload</span> after config edits.</li>
          </ol>
        </section>

        <section id="command-reference"><h2>Command Reference</h2>
          <div class="table-wrap"><table>
            <thead><tr><th>Command</th><th>Description</th><th>Permission</th></tr></thead>
            <tbody>
              <tr><td><strong>/nightvision</strong></td><td>Toggles the sender's stored Night Vision state. Console cannot use without a player argument.</td><td><span class="inline-code">eznightvision.use</span></td></tr>
              <tr><td><strong>/nightvision on</strong></td><td>Enables Night Vision for the sender if not already enabled.</td><td><span class="inline-code">eznightvision.use</span></td></tr>
              <tr><td><strong>/nightvision off</strong></td><td>Disables Night Vision for the sender if not already disabled.</td><td><span class="inline-code">eznightvision.use</span></td></tr>
              <tr><td><strong>/nightvision on &lt;player&gt;</strong></td><td>Enables Night Vision for an online target player.</td><td><span class="inline-code">eznightvision.admin</span></td></tr>
              <tr><td><strong>/nightvision off &lt;player&gt;</strong></td><td>Disables Night Vision for an online target player.</td><td><span class="inline-code">eznightvision.admin</span></td></tr>
              <tr><td><strong>/nightvision reload</strong></td><td>Reloads <span class="inline-code">config.yml</span> and refreshes effect state for online players.</td><td><span class="inline-code">eznightvision.admin</span></td></tr>
            </tbody>
          </table></div>
        </section>

        <section id="practical-notes"><h2>Practical Notes</h2>
          <ul>
            <li>Main command: <span class="inline-code">nightvision</span></li>
            <li>Alias: <span class="inline-code">nv</span></li>
            <li>Tab completion first argument suggests <span class="inline-code">on</span>, <span class="inline-code">off</span>, and <span class="inline-code">reload</span> (reload only for admin/console).</li>
            <li>Second argument suggests online player names when using <span class="inline-code">on</span> or <span class="inline-code">off</span> with admin access.</li>
            <li>Console use of <span class="inline-code">/nightvision</span> and <span class="inline-code">/nightvision on|off</span> without target returns the configured console warning.</li>
          </ul>
        </section>
      `
    },

    permissions: {
      title: 'Permissions · EzNightvision Docs',
      topbarTitle: 'Permissions',
      meta: ['Usage', 'Permissions'],
      content: `
        <h1>Permissions</h1>

        <section id="requirements"><h2>Requirements</h2>
          <p>Use a permissions plugin (for example, LuckPerms) for predictable staff/player access control.</p>
        </section>

        <section id="permission-nodes"><h2>Permission Nodes</h2>
          <div class="table-wrap"><table>
            <thead><tr><th>Permission</th><th>Description</th><th>Default</th></tr></thead>
            <tbody>
              <tr><td><span class="inline-code">eznightvision.use</span></td><td>Allows self usage of <span class="inline-code">/nightvision</span>, <span class="inline-code">/nightvision on</span>, and <span class="inline-code">/nightvision off</span>.</td><td><span class="inline-code">true</span></td></tr>
              <tr><td><span class="inline-code">eznightvision.admin</span></td><td>Allows <span class="inline-code">/nightvision reload</span> and <span class="inline-code">&lt;on|off&gt; &lt;player&gt;</span> staff targeting.</td><td><span class="inline-code">op</span></td></tr>
            </tbody>
          </table></div>
        </section>

        <section id="practical-notes"><h2>Practical Notes</h2>
          <ul>
            <li>Operators (<span class="inline-code">op</span>) inherit <span class="inline-code">eznightvision.admin</span> by default.</li>
            <li>Non-op players can still self-toggle because <span class="inline-code">eznightvision.use</span> defaults to <span class="inline-code">true</span>.</li>
            <li>Console can execute admin-only actions without explicit permission assignment.</li>
          </ul>
          <p><strong>Tip:</strong> Grant <span class="inline-code">eznightvision.admin</span> to staff groups, and leave <span class="inline-code">eznightvision.use</span> enabled globally unless your server has custom restrictions.</p>
        </section>
      `
    },

    troubleshooting: {
      title: 'Troubleshooting · EzNightvision Docs',
      topbarTitle: 'Troubleshooting',
      meta: ['More', 'Support'],
      content: `
        <h1>Troubleshooting</h1>

        <section id="requirements"><h2>Requirements</h2>
          <ul>
            <li>Access to server console and <span class="inline-code">logs/latest.log</span></li>
            <li>Permission to run <span class="inline-code">/nightvision</span> commands for testing</li>
          </ul>
        </section>

        <section id="steps"><h2>Steps</h2>
          <ol>
            <li>Confirm server version and Java version meet minimum requirements.</li>
            <li>Confirm EzNightvision loaded cleanly at startup.</li>
            <li>Check <span class="inline-code">config.yml</span> for YAML errors.</li>
            <li>Validate permission nodes on a test player.</li>
            <li>Re-test using <span class="inline-code">/nightvision on</span>, <span class="inline-code">/nightvision off</span>, and <span class="inline-code">/nightvision reload</span>.</li>
          </ol>
        </section>

        <section id="common-failures"><h2>What Happens On Common Failures</h2>
          <div class="table-wrap"><table>
            <thead><tr><th>Symptom</th><th>Likely Cause</th><th>Action</th></tr></thead>
            <tbody>
              <tr><td><span class="inline-code">/nightvision</span> returns no-permission message</td><td>Missing <span class="inline-code">eznightvision.use</span></td><td>Grant <span class="inline-code">eznightvision.use</span> and retest.</td></tr>
              <tr><td><span class="inline-code">/nightvision on &lt;player&gt;</span> denied</td><td>Missing <span class="inline-code">eznightvision.admin</span></td><td>Grant <span class="inline-code">eznightvision.admin</span> to the sender.</td></tr>
              <tr><td><span class="inline-code">Player not found</span></td><td>Target is offline or name mismatch</td><td>Use exact online name and retry.</td></tr>
              <tr><td>Night Vision disappears after milk/respawn</td><td>Reapply delay or conflicting plugin behavior</td><td>Check <pre><code>effect.reapply-delay-ticks</code></pre>; raise slightly if needed.</td></tr>
              <tr><td>Placeholder text shows raw <span class="inline-code">%eznightvision_*%</span></td><td>PlaceholderAPI missing or not loaded</td><td>Install/enable PlaceholderAPI and restart server.</td></tr>
              <tr><td>Reload fails message appears</td><td>Invalid config value or YAML formatting issue</td><td>Fix <span class="inline-code">config.yml</span> syntax and run <span class="inline-code">/nightvision reload</span> again.</td></tr>
            </tbody>
          </table></div>
        </section>

        <section id="practical-notes"><h2>Practical Notes</h2>
          <ul>
            <li>SQLite state lives at <pre><code>storage.file</code></pre> and is authoritative for toggled status.</li>
            <li><span class="inline-code">debug: true</span> adds internal effect reapply logs to the console.</li>
            <li>The plugin reapplies Night Vision when the effect is removed while stored state is enabled.</li>
          </ul>
          <p><strong>Warning:</strong> If another plugin continuously edits potion effects, you can see repeated reapply cycles.</p>
          <p><strong>Tip:</strong> Test with only EzNightvision enabled when isolating conflicts.</p>
        </section>
      `
    },

    'placeholderapi-integration': {
      title: 'Placeholders · EzNightvision Docs',
      topbarTitle: 'Placeholders',
      meta: ['Usage', 'Integrations'],
      content: `
        <h1>Placeholders</h1>

        <section id="requirements"><h2>Requirements</h2>
          <ul>
            <li>PlaceholderAPI installed and enabled on the server.</li>
            <li>EzNightvision loaded after/with PlaceholderAPI available.</li>
          </ul>
        </section>

        <section id="feature-overview"><h2>What the Feature Does</h2>
          <p>When PlaceholderAPI is present, EzNightvision registers an expansion and exposes Night Vision toggle placeholders for player-aware contexts.</p>
        </section>

        <section id="config-keys"><h2>Exact Config Keys</h2>
          <div class="table-wrap"><table>
            <thead><tr><th>Key</th><th>Type</th><th>Effect</th></tr></thead>
            <tbody>
              <tr><td><pre><code>placeholders.enabled-format</code></pre></td><td>string</td><td>Output for the formatted toggle placeholder when enabled.</td></tr>
              <tr><td><pre><code>placeholders.disabled-format</code></pre></td><td>string</td><td>Output for the formatted toggle placeholder when disabled.</td></tr>
            </tbody>
          </table></div>
        </section>

        <section id="runtime-conditions"><h2>Runtime Conditions</h2>
          <p>Placeholder expansion registers only when PlaceholderAPI is enabled during plugin startup.</p>
          <p>Available placeholder keys:</p>
          <ul>
            <li><span class="inline-code">toggle</span> → <span class="inline-code">true</span> or <span class="inline-code">false</span></li>
            <li><span class="inline-code">toggle_formatted</span> → formatted value from config keys above</li>
          </ul>
          <p>Behavior details:</p>
          <ul>
            <li>Placeholder state reads from stored toggle state (cache/SQLite-backed).</li>
            <li>If player context is missing in a placeholder request, <span class="inline-code">toggle</span> resolves to <span class="inline-code">false</span>.</li>
          </ul>
        </section>

        <section id="reload-behavior"><h2>Reload / Update Behavior</h2>
          <ul>
            <li><span class="inline-code">/nightvision reload</span> does not explicitly re-register PlaceholderAPI expansion.</li>
            <li>For PlaceholderAPI add/remove changes, perform a full server restart.</li>
          </ul>
          <p><strong>Tip:</strong> Keep formatted outputs short (for example <span class="inline-code">&aON</span> / <span class="inline-code">&cOFF</span>) for scoreboard and tablist use.</p>
        </section>
      `
    },

    faq: {
      title: 'FAQ · EzNightvision Docs',
      topbarTitle: 'FAQ',
      meta: ['More', 'Support'],
      content: `
        <h1>FAQ</h1>

        <section id="main-command"><h2>What is the main command and alias?</h2><p>Main command is <span class="inline-code">/nightvision</span> with alias <span class="inline-code">/nv</span>.</p></section>
        <section id="console-toggle"><h2>Can console toggle itself?</h2><p>No. Console must specify a target player for <span class="inline-code">on</span>/<span class="inline-code">off</span> and can run <span class="inline-code">/nightvision reload</span>.</p></section>
        <section id="state-persistence"><h2>Does the plugin remember toggles after relog/restart?</h2><p>Yes, state is persisted in SQLite at <pre><code>storage.file</code></pre>.</p></section>
        <section id="reapply-delay"><h2>Why does a player lose Night Vision briefly after respawn or milk?</h2><p>Reapply is delayed by <pre><code>effect.reapply-delay-ticks</code></pre> (minimum effective value is 1 tick).</p></section>
        <section id="staff-permission"><h2>Which permission is needed for staff targeting and reload?</h2><p><span class="inline-code">eznightvision.admin</span>.</p></section>
        <section id="placeholder-availability"><h2>Are PlaceholderAPI placeholders always available?</h2><p>No. They are only available when PlaceholderAPI is installed and enabled.</p></section>
        <section id="reload-safety"><h2>Is <span class="inline-code">/reload</span> safe for this plugin?</h2><p>Prefer full restarts for plugin updates. Use <span class="inline-code">/nightvision reload</span> for config reload only.</p></section>
      `
    },

    changelog: {
      title: 'Changelog · EzNightvision Docs',
      topbarTitle: 'Changelog',
      meta: ['More', 'Releases'],
      content: `
        <h1>Changelog</h1>

        <section id="latest"><h2>v1.0.0 - Latest</h2>
          <p><strong>Released:</strong> TBD</p>
          <h3>Added</h3>
          <ul>
            <li>Initial EzNightvision release for Paper/Folia</li>
            <li><span class="inline-code">/nightvision</span> and <span class="inline-code">/nv</span> command support</li>
            <li>Staff controls: <span class="inline-code">/nightvision &lt;on|off&gt; &lt;player&gt;</span> and <span class="inline-code">/nightvision reload</span></li>
            <li>SQLite-backed persisted toggle state (<pre><code>storage.file</code></pre>)</li>
            <li>Auto-reapply after join, respawn, milk, totem, and effect-removal events</li>
            <li>Optional PlaceholderAPI placeholders: <span class="inline-code">%eznightvision_toggle%</span> and <span class="inline-code">%eznightvision_toggle_formatted%</span></li>
          </ul>
          <h3>Changed</h3>
          <ul><li>N/A (initial release)</li></ul>
          <h3>Fixed</h3>
          <ul><li>N/A (initial release)</li></ul>
        </section>
      `
    }
  }
};
