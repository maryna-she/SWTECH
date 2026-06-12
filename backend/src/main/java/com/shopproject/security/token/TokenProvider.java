package com.shopproject.security.token;

import com.shopproject.user.model.UserRole;

import java.util.UUID;

public interface TokenProvider {
    String generateToken(UUID userId, UserRole role);
    void invalidateToken(String token);
    boolean validateToken(String token);
    UUID getUserIdFromToken(String token);
}
