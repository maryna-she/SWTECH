package com.shopproject.security.token;

import com.shopproject.user.model.UserRole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Verwaltet den Lebenszyklus der JWT-Tokens.
 * Zuständig für die Generierung neuer Tokens nach dem Login, die Validierung bei
 * eingehenden Anfragen sowie die Entwertung (Blacklisting) beim Logout.
 */
@Component
public class JwtTokenProvider implements TokenProvider {
    private final SecretKey key;
    private final long expirationMs;

    // In-memory blacklist
    private final Set<String> blacklist = ConcurrentHashMap.newKeySet();

    public JwtTokenProvider(
            @Value("${jwt.secret:defaultSecretKeyWithAtLeast32CharactersForHs256}") String secret,
            @Value("${jwt.expiration-ms}") long expirationMs
    ) {
        if (secret.length() < 32) {
            throw new IllegalArgumentException("JWT secret key must be at least 32 characters long for HS256");
        }
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    @Override
    public String generateToken(UUID userId, UserRole role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .subject(userId.toString())
                .claim("role", role.name())
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key)
                .compact();
    }

    @Override
    public void invalidateToken(String token) {
        if (token != null && !token.isBlank()) {
            blacklist.add(token);
        }
    }

    public boolean validateToken(String token) {
        if (blacklist.contains(token)) {
            return false;
        }
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Токен истек, поврежден или имеет неверную подпись
            return false;
        }
    }

    public UUID getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return UUID.fromString(claims.getSubject());
    }
}
