package com.shopproject.wishlist;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WishlistRepository extends JpaRepository<WishlistItemEntity, UUID> {
    List<WishlistItemEntity> findAllByUserId(UUID userId);
    Optional<WishlistItemEntity> findByUserIdAndProductId(UUID userId, UUID productId);
}