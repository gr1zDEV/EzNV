package org.ezinnovations.eznightvision.data;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.ezinnovations.eznightvision.EzNightvisionPlugin;

public final class SQLiteStorage {
    // One small table is enough because the plugin only tracks the persisted toggle state.
    private static final String CREATE_TABLE_SQL = """
        CREATE TABLE IF NOT EXISTS night_vision_states (
            uuid TEXT PRIMARY KEY,
            player_name TEXT,
            enabled INTEGER NOT NULL,
            updated_at INTEGER NOT NULL
        )
        """;

    private final EzNightvisionPlugin plugin;
    private Connection connection;

    public SQLiteStorage(EzNightvisionPlugin plugin) {
        this.plugin = plugin;
    }

    public void initialize() {
        File databaseFile = resolveDatabaseFile();
        File parent = databaseFile.getParentFile();
        if (parent != null && !parent.exists() && !parent.mkdirs()) {
            throw new IllegalStateException("Unable to create storage directory: " + parent.getAbsolutePath());
        }

        try {
            this.connection = DriverManager.getConnection("jdbc:sqlite:" + databaseFile.getAbsolutePath());
            try (Statement statement = connection.createStatement()) {
                statement.executeUpdate(CREATE_TABLE_SQL);
            }
        } catch (SQLException exception) {
            throw new IllegalStateException("Unable to initialize SQLite storage", exception);
        }
    }

    public synchronized Optional<PlayerNightVisionState> findState(UUID uuid) {
        String sql = "SELECT uuid, player_name, enabled, updated_at FROM night_vision_states WHERE uuid = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, uuid.toString());
            try (ResultSet resultSet = statement.executeQuery()) {
                if (!resultSet.next()) {
                    return Optional.empty();
                }

                return Optional.of(new PlayerNightVisionState(
                    UUID.fromString(resultSet.getString("uuid")),
                    resultSet.getString("player_name"),
                    resultSet.getInt("enabled") == 1,
                    resultSet.getLong("updated_at")
                ));
            }
        } catch (SQLException exception) {
            throw new IllegalStateException("Unable to load night vision state for " + uuid, exception);
        }
    }

    public synchronized void saveState(UUID uuid, String playerName, boolean enabled) {
        String sql = """
            INSERT INTO night_vision_states (uuid, player_name, enabled, updated_at)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(uuid) DO UPDATE SET
                player_name = excluded.player_name,
                enabled = excluded.enabled,
                updated_at = excluded.updated_at
            """;
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, uuid.toString());
            statement.setString(2, playerName);
            statement.setInt(3, enabled ? 1 : 0);
            statement.setLong(4, Instant.now().getEpochSecond());
            statement.executeUpdate();
        } catch (SQLException exception) {
            throw new IllegalStateException("Unable to save night vision state for " + uuid, exception);
        }
    }

    public synchronized void close() {
        if (connection == null) {
            return;
        }

        try {
            connection.close();
        } catch (SQLException exception) {
            plugin.getLogger().warning("Failed to close SQLite connection: " + exception.getMessage());
        }
    }

    private File resolveDatabaseFile() {
        String configuredPath = plugin.getConfig().getString("storage.file", "data/eznightvision.db");
        File configuredFile = new File(configuredPath);
        if (configuredFile.isAbsolute()) {
            return configuredFile;
        }
        return new File(plugin.getDataFolder(), configuredPath);
    }
}
