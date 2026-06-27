package com.shopproject;

import com.shopproject.exception.ResourceAlreadyExistsException;
import com.shopproject.security.crypto.PasswordEncoder;
import com.shopproject.user.UserMapper;
import com.shopproject.user.UserRepository;
import com.shopproject.user.dto.RegisterRequest;
import com.shopproject.user.model.User;
import com.shopproject.user.model.UserEntity;
import com.shopproject.user.model.UserRole;
import com.shopproject.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit-Tests für den UserService.
 *
 * Die Tests prüfen die minimale Geschäftslogik für die Registrierung:
 * - Benutzer erfolgreich registrieren
 * - Passwort gehasht speichern
 * - doppelte E-Mail-Adressen ablehnen
 *
 * Die Abhängigkeiten werden mit Mockito simuliert,
 * damit keine echte Datenbank benötigt wird.
 */
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository repository;

    @Mock
    private UserMapper mapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    /**
     * Prüft, ob ein neuer Kunde korrekt gespeichert wird
     * und das Passwort gehasht in der UserEntity landet.
     */
    @Test
    void registerCustomer_shouldSaveUserWithHashedPassword() {
        // Arrange: Registrierungsdaten vorbereiten
        RegisterRequest request = new RegisterRequest(
                "Peter",
                "Peterson",
                "peter.peterson@test.de",
                "test123"
        );

        // Mock-Verhalten: E-Mail existiert noch nicht
        when(repository.existsByEmail("peter.peterson@test.de"))
                .thenReturn(false);

        // Mock-Verhalten: Passwort wird gehasht
        when(passwordEncoder.encode("test123"))
                .thenReturn("hashed-password");

        // Mock-Verhalten: Beim Speichern wird die übergebene Entity zurückgegeben
        when(repository.save(any(UserEntity.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // Mock-Verhalten: Entity wird in Domain-Objekt umgewandelt
        when(mapper.toDomain(any(UserEntity.class)))
                .thenReturn(new User(
                        UUID.randomUUID(),
                        "Peter",
                        "Peterson",
                        "peter.peterson@test.de",
                        UserRole.CUSTOMER,
                        false
                ));

        // Act: Registrierung ausführen
        userService.registerCustomer(request);

        // Assert: Prüfen, welche UserEntity gespeichert wurde
        ArgumentCaptor<UserEntity> captor = ArgumentCaptor.forClass(UserEntity.class);
        verify(repository).save(captor.capture());

        UserEntity savedUser = captor.getValue();

        assertEquals("Peter", savedUser.getFirstName());
        assertEquals("Peterson", savedUser.getLastName());
        assertEquals("peter.peterson@test.de", savedUser.getEmail());
        assertEquals("hashed-password", savedUser.getPasswordHashed());
        assertEquals(UserRole.CUSTOMER, savedUser.getRole());
        assertFalse(savedUser.isDeleted());
    }

    /**
     * Prüft, ob eine Registrierung abgelehnt wird,
     * wenn die E-Mail-Adresse bereits existiert.
     */
    @Test
    void registerCustomer_shouldThrowException_whenEmailAlreadyExists() {
        // Arrange: Registrierungsdaten mit bereits vorhandener E-Mail vorbereiten
        RegisterRequest request = new RegisterRequest(
                "Peter",
                "Peterson",
                "peter.peterson@test.de",
                "test123"
        );

        // Mock-Verhalten: E-Mail existiert bereits
        when(repository.existsByEmail("peter.peterson@test.de"))
                .thenReturn(true);

        // Act + Assert: Registrierung muss fehlschlagen
        assertThrows(
                ResourceAlreadyExistsException.class,
                () -> userService.registerCustomer(request)
        );

        // Assert: Es darf kein Benutzer gespeichert werden
        verify(repository, never()).save(any(UserEntity.class));
    }
}