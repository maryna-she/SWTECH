package com.shopproject;

import com.shopproject.security.crypto.SimpleSha256Encoder;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit-Tests für den SimpleSha256Encoder.
 * Die Tests prüfen, ob Passwörter gehasht gespeichert werden,
 * ob richtige Passwörter erkannt werden
 * und ob falsche Passwörter abgelehnt werden.
 */
class Sha256EncoderTest {

    private final SimpleSha256Encoder encoder = new SimpleSha256Encoder();

    /**
     * Prüft, ob das Ergebnis von encode nicht dem Klartext-Passwort entspricht.
     */
    @Test
    void encode_notReturnRawPassword(){
        String encodedPassword = encoder.encode("test123");
        assertNotEquals("test123", encodedPassword);
    }

    /**
     * Prüft, ob ein korrektes Passwort erfolgreich erkannt wird.
     */
    @Test
    void matches_returnTrue_whenPasswordCorrect(){
        String encodedPassword = encoder.encode("test123");
        boolean result = encoder.matches("test123", encodedPassword);

        assertTrue(result);
    }

    /**
     * Prüft, ob ein falsches Passwort abgelehnt wird.
     */
    @Test
    void matches_shouldReturnFalse_whenPasswordIsWrong() {
        // Arrange: Passwort hashen
        String encodedPassword = encoder.encode("test123");

        // Act: Falsches Passwort prüfen
        boolean result = encoder.matches("falsch", encodedPassword);

        // Assert: Das falsche Passwort muss abgelehnt werden
        assertFalse(result);
    }

    /**
     * Prüft, ob durch den zufälligen Salt bei gleichem Passwort
     * unterschiedliche gespeicherte Werte entstehen.
     */
    @Test
    void encode_DifferentHashesBecauseOfSalt(){
        String firstHash = encoder.encode("test123");
        String secondHash = encoder.encode("test123");

        assertNotEquals(firstHash, secondHash);
    }

    /**
     * Prüft, ob durch den zufälligen Salt bei gleichem Passwort
     * unterschiedliche gespeicherte Werte entstehen.
     */
    @Test
    void matches_ReturnFalse_whenEncodedPasswordFalse(){
        boolean result = encoder.matches("test123", "notValidPassword");

        assertFalse(result);
    }
}
