package com.shopproject;

import com.shopproject.exception.UnauthorizedException;
import com.shopproject.security.crypto.PasswordEncoder;
import com.shopproject.security.token.TokenProvider;
import com.shopproject.user.UserMapper;
import com.shopproject.user.UserRepository;
import com.shopproject.user.dto.AuthResponse;
import com.shopproject.user.dto.LoginRequest;
import com.shopproject.user.model.UserEntity;
import com.shopproject.user.model.UserRole;
import com.shopproject.user.service.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

/**
 * Unit-Tests für den AuthService.
 * Die Tests prüfen die minimale Login-Logik:
 * - erfolgreicher Login mit gültigen Zugangsdaten
 * - Ablehnung bei nicht vorhandenem Benutzer
 * - Ablehnung bei falschem Passwort
 * Repository, PasswordEncoder und TokenProvider werden mit Mockito simuliert,
 * damit keine echte Datenbank und kein echter JWT-Mechanismus benötigt werden.
 */
@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository repository;

    @Mock
    private UserMapper mapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private TokenProvider tokenProvider;

    @InjectMocks
    private AuthService authService;

    /**
     * Prüft, ob ein Login erfolgreich ist,
     * wenn der Benutzer existiert und das Passwort korrekt ist.
     */
    @Test
    void login_ReturnToken_CredentialsAreValid() {
        UUID userId = UUID.randomUUID();

        LoginRequest request = new LoginRequest(
                "peter.peterson@test.de",
                "test123"
        );


        UserEntity user = new UserEntity(
                userId,
                "Peter" ,
                "Peterson",
                "peter.peterson@test.de",
                "hashed-password",
                UserRole.CUSTOMER,
                false
                );

        // Mock-Verhalten: Kunde und Produkt sollen gefunden werden
        when(repository.findByEmailAndIsDeletedFalse("peter.peterson@test.de"))
                .thenReturn(Optional.of(user));

        // Mock-Verhalten: Passwortprüfung ist erfolgreich
        when(passwordEncoder.matches("test123", "hashed-password")).thenReturn(true);

        // Mock-Verhalten: TokenProvider erzeugt einen Test-Token
        when(tokenProvider.generateToken(userId, UserRole.CUSTOMER))
                .thenReturn("test-token");

        // Act: Login ausführen
        AuthResponse response = authService.login(request);

        // Assert: Token aus der Response prüfen
        assertEquals("test-token", response.token());
    }

    /**
     * Prüft, ob ein Login abgelehnt wird,
     * wenn zur E-Mail-Adresse kein aktiver Benutzer existiert.
     */
    @Test
    void login_ThrowUnauthorized_UserDoesNotExist() {
        // Arrange: Login-Daten mit unbekannter E-Mail vorbereiten
        LoginRequest request = new LoginRequest(
                "unknown@test.de",
                "test123"
        );

        // Mock-Verhalten: Kein Benutzer wird gefunden
        when(repository.findByEmailAndIsDeletedFalse("unknown@test.de"))
                .thenReturn(Optional.empty());

        // Act + Assert: Login muss mit UnauthorizedException fehlschlagen
        assertThrows(
                UnauthorizedException.class,
                () -> authService.login(request)
        );

        // Assert: Passwortprüfung und Token-Erzeugung dürfen nicht aufgerufen werden
        verify(passwordEncoder, never()).matches(anyString(), anyString());
        verify(tokenProvider, never()).generateToken(any(), any());
    }

    /**
     * Prüft, ob ein Login abgelehnt wird,
     * wenn der Benutzer existiert, aber das Passwort falsch ist.
     */
    @Test
    void login_ThrowUnauthorized_PasswordIsWrong() {
        // Arrange: Login-Daten und vorhandenen Benutzer vorbereiten
        UUID userId = UUID.randomUUID();

        LoginRequest request = new LoginRequest(
                "peter.peterson@test.de",
                "wrong-password"
        );

        UserEntity user = new UserEntity(
                userId,
                "Peter",
                "Peterson",
                "peter.peterson@test.de",
                "hashed-password",
                UserRole.CUSTOMER,
                false
        );

        // Mock-Verhalten: Benutzer wird gefunden
        when(repository.findByEmailAndIsDeletedFalse("peter.peterson@test.de"))
                .thenReturn(Optional.of(user));

        // Mock-Verhalten: Passwortprüfung schlägt fehl
        when(passwordEncoder.matches("wrong-password", "hashed-password"))
                .thenReturn(false);

        // Act + Assert: Login muss mit UnauthorizedException fehlschlagen
        assertThrows(
                UnauthorizedException.class,
                () -> authService.login(request)
        );

        // Assert: Bei falschem Passwort darf kein Token erzeugt werden
        verify(tokenProvider, never()).generateToken(any(), any());
    }
}