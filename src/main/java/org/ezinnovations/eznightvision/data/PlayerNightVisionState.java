package org.ezinnovations.eznightvision.data;

import java.util.UUID;

public record PlayerNightVisionState(UUID uuid, String lastKnownName, boolean enabled, long updatedAt) {
}
