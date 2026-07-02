package com.shopproject.wishlist;

import java.util.UUID;

public record WishlistItem(
        UUID id,
        UUID userId,
        UUID productId
) {}