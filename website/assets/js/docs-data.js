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
        { id: 'installation', label: 'Installation' }
      ]
    },
    {
      title: 'Usage',
      pages: [
        { id: 'commands', label: 'Commands' },
        { id: 'permissions', label: 'Permissions' },
        { id: 'troubleshooting', label: 'Troubleshooting' }
      ]
    },
    {
      title: 'Features',
      pages: [
        { id: 'persistent-night-vision', label: 'Persistent Night Vision' },
        { id: 'placeholderapi-integration', label: 'PlaceholderAPI Integration' }
      ]
    },
    {
      title: 'More',
      pages: [
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
            <li>Persists player toggle state in SQLite (<span class="inline-code">storage.file</span>)</li>
            <li>Reapplies effect after join, respawn, milk, totem use, and potion-effect removal events</li>
            <li>Optional PlaceholderAPI expansion with <span class="inline-code">%eznightvision_toggle%</span> and <span class="inline-code">%eznightvision_toggle_formatted%</span></li>
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

    installation: {
      title: 'Installation · EzNightvision Docs',
      topbarTitle: 'Installation',
      meta: ['Getting Started', 'Setup'],
      content: `
        <h1>Installation</h1>

        <section id="requirements"><h2>Requirements</h2>
          <ul>
            <li>Java 21 or newer</li>
            <li>Paper or Folia server on Minecraft 1.20+</li>
            <li>Access to the server <span class="inline-code">/plugins/</span> directory</li>
            <li>Optional: PlaceholderAPI if you plan to use <span class="inline-code">%eznightvision_*%</span> placeholders</li>
          </ul>
        </section>

        <section id="steps"><h2>Steps</h2>
          <ol>
            <li>Download the EzNightvision <span class="inline-code">.jar</span> release (or build with <span class="inline-code">mvn package</span>).</li>
            <li>Stop your server.</li>
            <li>Place the jar in <span class="inline-code">/plugins/</span>.</li>
            <li>Start the server once to generate <span class="inline-code">/plugins/EzNightvision/config.yml</span>.</li>
            <li>Review and adjust the primary config keys:</li>
          <li>Join the server and run <span class="inline-code">/nightvision</span> to verify command and effect behavior.</li>
          </ol>
          <div class="code-block">
            <div class="code-head">config.yml keys</div>
            <pre><code>storage.file
effect.ambient
effect.particles
effect.icon
effect.reapply-delay-ticks
messages.*</code></pre>
          </div>
          <p><strong>Warning:</strong> Do not use Bukkit <span class="inline-code">/reload</span> for plugin installation or jar upgrades. Use a full restart.</p>
          <p><strong>Tip:</strong> Use <span class="inline-code">/nightvision reload</span> after editing <span class="inline-code">config.yml</span> message/effect keys to apply changes without replacing the jar.</p>
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
      meta: ['Usage', 'Support'],
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
              <tr><td>Night Vision disappears after milk/respawn</td><td>Reapply delay or conflicting plugin behavior</td><td>Check <span class="inline-code">effect.reapply-delay-ticks</span>; raise slightly if needed.</td></tr>
              <tr><td>Placeholder text shows raw <span class="inline-code">%eznightvision_*%</span></td><td>PlaceholderAPI missing or not loaded</td><td>Install/enable PlaceholderAPI and restart server.</td></tr>
              <tr><td>Reload fails message appears</td><td>Invalid config value or YAML formatting issue</td><td>Fix <span class="inline-code">config.yml</span> syntax and run <span class="inline-code">/nightvision reload</span> again.</td></tr>
            </tbody>
          </table></div>
        </section>

        <section id="practical-notes"><h2>Practical Notes</h2>
          <ul>
            <li>SQLite state lives at <span class="inline-code">storage.file</span> and is authoritative for toggled status.</li>
            <li><span class="inline-code">debug: true</span> adds internal effect reapply logs to the console.</li>
            <li>The plugin reapplies Night Vision when the effect is removed while stored state is enabled.</li>
          </ul>
          <p><strong>Warning:</strong> If another plugin continuously edits potion effects, you can see repeated reapply cycles.</p>
          <p><strong>Tip:</strong> Test with only EzNightvision enabled when isolating conflicts.</p>
        </section>
      `
    },

    'persistent-night-vision': {
      title: 'Persistent Night Vision · EzNightvision Docs',
      topbarTitle: 'Persistent Night Vision',
      meta: ['Features', 'Core Behavior'],
      content: `
        <h1>Persistent Night Vision</h1>

        <section id="requirements"><h2>Requirements</h2>
          <ul>
            <li>Player has enabled state through <span class="inline-code">/nightvision</span> or <span class="inline-code">/nightvision on</span>.</li>
            <li>Plugin can write to configured SQLite path (<span class="inline-code">storage.file</span>).</li>
          </ul>
        </section>

        <section id="feature-overview"><h2>What the Feature Does</h2>
          <p>This feature stores each player's Night Vision toggle state and keeps the potion effect applied when gameplay events remove it.</p>
        </section>

        <section id="runtime-conditions"><h2>Runtime Conditions</h2>
          <p>Night Vision is (re)applied when all conditions are true:</p>
          <ul>
            <li>Stored state in SQLite/cache is <span class="inline-code">true</span>.</li>
            <li>Player is online.</li>
            <li>Event triggers one of these restore paths: player joins, player respawns, player drinks milk, player uses a totem (resurrection event), or Night Vision effect is removed/cleared by game mechanics.</li>
          </ul>
        </section>

        <section id="config-keys"><h2>Exact Config Keys</h2>
          <div class="code-block">
            <div class="code-head">config.yml keys</div>
            <pre><code>storage.file
effect.ambient
effect.particles
effect.icon
effect.reapply-delay-ticks
debug</code></pre>
          </div>
          <div class="table-wrap"><table>
            <thead><tr><th>Key</th><th>Type</th><th>Effect</th></tr></thead>
            <tbody>
              <tr><td><span class="inline-code">storage.file</span></td><td>string</td><td>SQLite DB location for player state.</td></tr>
              <tr><td><span class="inline-code">effect.ambient</span></td><td>boolean</td><td>Sets ambient flag on potion effect.</td></tr>
              <tr><td><span class="inline-code">effect.particles</span></td><td>boolean</td><td>Enables/disables particles on potion effect.</td></tr>
              <tr><td><span class="inline-code">effect.icon</span></td><td>boolean</td><td>Enables/disables effect icon.</td></tr>
              <tr><td><span class="inline-code">effect.reapply-delay-ticks</span></td><td>long</td><td>Delay before reapplying after restore-trigger events. Minimum effective value is 1 tick.</td></tr>
              <tr><td><span class="inline-code">debug</span></td><td>boolean</td><td>Enables debug logs around restore checks and effect removals.</td></tr>
            </tbody>
          </table></div>
        </section>

        <section id="reload-behavior"><h2>Reload / Update Behavior</h2>
          <ul>
            <li><span class="inline-code">/nightvision reload</span> calls config reload and refreshes effect state for all online players.</li>
            <li>Updated <span class="inline-code">effect.*</span> values apply on the next effect update cycle.</li>
            <li>Stored player state is not reset during reload.</li>
          </ul>
        </section>
      `
    },

    'placeholderapi-integration': {
      title: 'PlaceholderAPI Integration · EzNightvision Docs',
      topbarTitle: 'PlaceholderAPI Integration',
      meta: ['Features', 'Integrations'],
      content: `
        <h1>PlaceholderAPI Integration</h1>

        <section id="requirements"><h2>Requirements</h2>
          <ul>
            <li>PlaceholderAPI installed and enabled on the server.</li>
            <li>EzNightvision loaded after/with PlaceholderAPI available.</li>
          </ul>
        </section>

        <section id="feature-overview"><h2>What the Feature Does</h2>
          <p>When PlaceholderAPI is present, EzNightvision registers an expansion and exposes player Night Vision state placeholders.</p>
        </section>

        <section id="config-keys"><h2>Exact Config Keys</h2>
          <div class="table-wrap"><table>
            <thead><tr><th>Key</th><th>Type</th><th>Effect</th></tr></thead>
            <tbody>
              <tr><td><span class="inline-code">placeholders.enabled-format</span></td><td>string</td><td>Output for <span class="inline-code">%eznightvision_toggle_formatted%</span> when enabled.</td></tr>
              <tr><td><span class="inline-code">placeholders.disabled-format</span></td><td>string</td><td>Output for <span class="inline-code">%eznightvision_toggle_formatted%</span> when disabled.</td></tr>
            </tbody>
          </table></div>
        </section>

        <section id="runtime-conditions"><h2>Runtime Conditions</h2>
          <p>Placeholder expansion registers only when PlaceholderAPI is enabled during plugin startup.</p>
          <p>Available placeholders:</p>
          <ul>
            <li><span class="inline-code">%eznightvision_toggle%</span> → <span class="inline-code">true</span> or <span class="inline-code">false</span></li>
            <li><span class="inline-code">%eznightvision_toggle_formatted%</span> → formatted value from config keys above</li>
          </ul>
          <p>Behavior details:</p>
          <ul>
            <li>Placeholder identifier is <span class="inline-code">eznightvision</span>.</li>
            <li>Placeholder state reads from stored toggle state (cache/SQLite-backed).</li>
            <li>If player context is missing in a PlaceholderAPI request, <span class="inline-code">%eznightvision_toggle%</span> returns <span class="inline-code">false</span>.</li>
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
        <section id="state-persistence"><h2>Does the plugin remember toggles after relog/restart?</h2><p>Yes, state is persisted in SQLite at <span class="inline-code">storage.file</span>.</p></section>
        <section id="reapply-delay"><h2>Why does a player lose Night Vision briefly after respawn or milk?</h2><p>Reapply is delayed by <span class="inline-code">effect.reapply-delay-ticks</span> (minimum effective value is 1 tick).</p></section>
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
            <li>SQLite-backed persisted toggle state (<span class="inline-code">storage.file</span>)</li>
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
