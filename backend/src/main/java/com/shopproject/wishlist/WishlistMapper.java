package com.shopproject.wishlist;

import org.springframework.stereotype.Component;

@Component
public class WishlistMapper {

    public WishlistItem toDomain(WishlistItemEntity entity) {
        return new WishlistItem(
                entity.getId(),
                entity.getUserId(),
                entity.getProductId()
        );
    }
}