package com.shopproject.cart;

import java.util.UUID;

public record CartItem(
        UUID id,
       UUID productId,
       Integer quantity
) {
}
