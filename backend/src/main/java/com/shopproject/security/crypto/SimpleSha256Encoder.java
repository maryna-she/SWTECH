package com.shopproject.security.crypto;

import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * Komponente für die Verschlüsselung und Überprüfung von Passwörtern.
 * Verwendet den SHA-256 Algorithmus in Kombination mit einem kryptografischen "Salt",
 * um die Passwörter sicher in der Datenbank zu speichern.
 */
@Component
public class SimpleSha256Encoder implements PasswordEncoder {

    private static final int SALT_LENGTH = 16;

    @Override
    public String encode(String rawPassword) {
        byte[] salt = generateSalt();
        byte[] hash = hashPassword(rawPassword, salt);

        return Base64.getEncoder().encodeToString(salt) + ":" + Base64.getEncoder().encodeToString(hash);
    }

    @Override
    public boolean matches(String rawPassword, String encodedPassword) {
        if (encodedPassword == null || !encodedPassword.contains(":")) {
            return false;
        }

        String[] parts = encodedPassword.split(":");
        byte[] salt = Base64.getDecoder().decode(parts[0]);
        byte[] expectedHash = Base64.getDecoder().decode(parts[1]);

        byte[] actualHash = hashPassword(rawPassword, salt);

        return MessageDigest.isEqual(expectedHash, actualHash);
    }

    private byte[] generateSalt() {
        byte[] salt = new byte[SALT_LENGTH];
        new SecureRandom().nextBytes(salt);
        return salt;
    }

    private byte[] hashPassword(String password, byte[] salt) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.update(salt);
            return digest.digest(password.getBytes());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not found", e);
        }
    }
}