package com.shopproject.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import com.shopproject.user.dto.AuthResponse;
import com.shopproject.user.dto.DeleteRequest;
import com.shopproject.user.dto.LoginRequest;
import com.shopproject.user.dto.RegisterRequest;
import com.shopproject.user.model.User;
import com.shopproject.user.service.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Tag(name = "Api/Auth", description = "Endpoints für die Benutzerauthentifizierung und Kontoverwaltung")
@RestController
@RequestMapping("/api/auth")
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final AuthService authService;
    private final UserService userService;

    public UserController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @Operation(
            summary = "Neuen Benutzer registrieren",
            description = "Erstellt ein neues Kundenkonto basierend auf den übergebenen Registrierungsdaten."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Benutzer erfolgreich erstellt"),
            @ApiResponse(responseCode = "400", description = "Ungültige Eingabedaten (z.B. fehlende Felder)"),
            @ApiResponse(responseCode = "409", description = "E-Mail-Adresse wird bereits verwendet")
    })
    @PostMapping(path = "/register")
    @SecurityRequirements()
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        log.info("Received POST /api/auth/register request for email: {}", request.email());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.registerCustomer(request));
    }

    @Operation(
            summary = "Benutzer-Login",
            description = "Authentifiziert einen Benutzer anhand von E-Mail und Passwort und gibt ein JWT-Token zurück."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Erfolgreich authentifiziert, Token wird zurückgegeben"),
            @ApiResponse(responseCode = "401", description = "Ungültige Anmeldedaten")
    })
    @PostMapping(path = "/login")
    @SecurityRequirements()
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        log.info("Received POST /api/auth/login request for email: {}", request.email());
        return ResponseEntity.ok(authService.login(request));
    }

    @Operation(
            summary = "Benutzer-Logout",
            description = "Entwertet das aktuelle JWT-Token durch Hinzufügen zur Blacklist."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Erfolgreich abgemeldet oder Token ungültig/fehlend")
    })
    @PostMapping(path = "/logout")
    public ResponseEntity<Void> logout(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        log.info("Received POST /api/auth/logout request");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            authService.logout(token);
        }
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Benutzerkonto löschen",
            description = "Löscht das angegebene Benutzerkonto logisch (Soft Delete). Erfordert die Bestätigung durch das aktuelle Passwort im Request-Body."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Konto erfolgreich gelöscht"),
            @ApiResponse(responseCode = "401", description = "Falsches Passwort oder unzureichende Berechtigungen"),
            @ApiResponse(responseCode = "404", description = "Benutzer nicht gefunden")
    })
    @DeleteMapping(path = "/users/{userId}")
    public ResponseEntity<Void> deleteAccount(
            @PathVariable UUID userId,
            @RequestBody DeleteRequest request
    ) {
        log.info("Received DELETE /api/auth/users/{} request", userId);
        userService.deleteAccount(userId, request);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Aktuellen Benutzer abrufen",
            description = "Gibt die Details des aktuell authentifizierten Benutzers basierend auf dem bereitgestellten Token zurück."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Benutzerdaten erfolgreich abgerufen"),
            @ApiResponse(responseCode = "401", description = "Fehlendes oder ungültiges Token"),
            @ApiResponse(responseCode = "404", description = "Zugehöriger Benutzer nicht in der Datenbank gefunden")
    })
    @GetMapping("users/me")
    public ResponseEntity<User> getCurrentUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        log.info("Received GET /api/auth/users/me request");
        return ResponseEntity.ok(authService.getCurrentUser(authHeader));
    }

}