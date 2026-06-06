package com.shopproject.cart;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/carts")
class CartController {
    private static final Logger log = LoggerFactory.getLogger(CartController.class);

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping(path="/user/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable UUID userId) {
        log.info("Called getCart by userId: userId=" + userId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(cartService.getCartByUserId(userId));
    }

    @PostMapping(path="/user/{userId}/items")
    public ResponseEntity<Cart> addItem(
            @PathVariable UUID userId,
            @RequestParam UUID productId,
            @RequestParam Integer quantity
    ) {
        log.info("Called addItem to cart: userId=" + userId + ", productId=" + productId);
        if (quantity <= 0) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(cartService.addItemToCart(userId, productId, quantity));
    }
}
