package com.shopproject.wishlist;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Wishlist", description = "Endpoints für die Verwaltung der Benutzer-Wunschliste")
@RestController
@RequestMapping("/users/{userId}/wishlist")
public class WishlistController {
    private static final Logger log = LoggerFactory.getLogger(WishlistController.class);
    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @Operation(
            summary = "Produkt zur Wunschliste hinzufügen",
            description = "Fügt das angegebene Produkt anhand der ID zur Wunschliste des Benutzers hinzu."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Produkt erfolgreich zur Wunschliste hinzugefügt"),
            @ApiResponse(responseCode = "400", description = "Fehlende oder ungültige Produkt-ID im Request"),
            @ApiResponse(responseCode = "404", description = "Benutzer oder Produkt existiert nicht"),
            @ApiResponse(responseCode = "409", description = "Produkt befindet sich bereits auf der Wunschliste")
    })
    @PostMapping
    public ResponseEntity<WishlistItem> addItem(
            @PathVariable UUID userId,
            @RequestParam @NotNull UUID productId) {
        log.info("Adding product to wishlist: userId={}, productId={}", productId, userId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(wishlistService.addProductToWishlist(userId, productId));
    }

    @Operation(
            summary = "Wunschliste abrufen",
            description = "Gibt alle Produkte auf der Wunschliste des angegebenen Benutzers zurück."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Wunschliste erfolgreich abgerufen")
    })
    @GetMapping
    public ResponseEntity<List<WishlistItem>> getWishlist(@PathVariable UUID userId) {
        return ResponseEntity.ok(wishlistService.getUserWishlist(userId));
    }

    @Operation(
            summary = "Produkt aus Wunschliste entfernen",
            description = "Entfernt das angegebene Produkt aus der Wunschliste des Benutzers."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Produkt erfolgreich entfernt"),
            @ApiResponse(responseCode = "404", description = "Eintrag nicht auf der Wunschliste gefunden")
    })
    @DeleteMapping("/items/{productId}")
    public ResponseEntity<Void> removeItem(
            @PathVariable UUID userId,
            @PathVariable UUID productId) {

        log.info("Removing product from wishlist: userId={}, productId={}", userId, productId);
        wishlistService.removeProductFromWishlist(userId, productId);
        return ResponseEntity.noContent().build();
    }
}