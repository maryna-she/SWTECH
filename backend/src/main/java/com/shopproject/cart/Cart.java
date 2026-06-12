package com.shopproject.cart;

import java.util.List;
import java.util.UUID;

public record Cart(
        UUID id,
       UUID userId,
       List<CartItem> items
) {
}
