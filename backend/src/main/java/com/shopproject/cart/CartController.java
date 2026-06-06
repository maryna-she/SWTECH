package com.shopproject.cart;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/users/{userId}/cart")
class CartController {
    private static final Logger log = LoggerFactory.getLogger(CartController.class);

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @Operation(
            summary = "Warenkorb des Benutzers abrufen",
            description = "Gibt den aktuellen Zustand des Warenkorbs anhand der UUID des Benutzers zurück."
    )
    @GetMapping
    public ResponseEntity<Cart> getCart(@PathVariable UUID userId) {
        log.info("Called getCart by userId: userId={}", userId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(cartService.getCartByUserId(userId));
    }

    @Operation(
            summary = "Produkt zum Warenkorb hinzufügen",
            description = """
                    Fügt die angegebene Menge eines Produkts zum Warenkorb des Benutzers hinzu. 
                    Falls der Warenkorb noch nicht existiert, wird er automatisch erstellt. 
                    Existiert das Produkt bereits im Warenkorb, wird die Menge entsprechend erhöht.
                    """
    )
    @PostMapping(path="/items")
    public ResponseEntity<Cart> addItem(
            @PathVariable UUID userId,
            @RequestParam @NotNull UUID productId,
            @RequestParam @Positive @NotNull Integer quantity
    ) {
        log.info("Adding item to cart: userId={}, productId={}, quantity={}",
                userId, productId, quantity);
        return ResponseEntity.status(HttpStatus.OK)
                .body(cartService.addQuantityToItem(userId, productId, quantity));
    }

    @Operation(
            summary = "Produktmenge im Warenkorb festlegen",
            description = """
                    Setzt die exakte Menge eines Produkts im Warenkorb des Benutzers. 
                    Eine bereits vorhandene Menge wird durch den angegebenen Wert ersetzt.
                    """
    )
    @PutMapping("/items/{productId}")
    public ResponseEntity<Cart> setItemQuantity(
            @PathVariable UUID userId,
            @PathVariable UUID productId,
            @RequestParam @Positive @NotNull Integer quantity
    ) {
        log.info("Setting exact quantity in cart: userId={}, productId={}, newQuantity={}",
                userId, productId, quantity);
        return ResponseEntity.ok(
                cartService.setExactQuantity(userId, productId, quantity)
        );
    }

    @Operation(
            summary = "Produkt aus dem Warenkorb entfernen",
            description = "Entfernt das angegebene Produkt vollständig aus dem Warenkorb des Benutzers."
    )
    @DeleteMapping(path="/items/{productId}")
    public ResponseEntity<Cart> removeItem(
            @PathVariable UUID userId,
            @PathVariable UUID productId
    ) {
        log.info("Removing item from cart: userId={}, productId={}", userId, productId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(cartService.removeItem(userId, productId));
    }
}
