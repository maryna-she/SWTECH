package com.shopproject.wishlist;

import com.shopproject.exception.ResourceAlreadyExistsException;
import com.shopproject.exception.ResourceNotFoundException;
import com.shopproject.products.ProductsRepository;
import com.shopproject.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class WishlistService {
    private final WishlistRepository wishlistRepository;
    private final ProductsRepository productsRepository;
    private final UserRepository userRepository;
    private final WishlistMapper mapper;

    public WishlistService(WishlistRepository wishlistRepository, ProductsRepository productsRepository, UserRepository userRepository, WishlistMapper mapper) {
        this.wishlistRepository = wishlistRepository;
        this.productsRepository = productsRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    @Transactional
    public WishlistItem addProductToWishlist(UUID userId, UUID productId) {
        if (wishlistRepository.findByUserIdAndProductId(userId, productId).isPresent()) {
            throw new ResourceAlreadyExistsException("Product is already in wishlist");
        }

        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found");
        }
        if (!productsRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found");
        }

        WishlistItemEntity saved = wishlistRepository.save(new WishlistItemEntity(null, userId, productId));
        return mapper.toDomain(saved);
    }

    @Transactional(readOnly = true)
    public List<WishlistItem> getUserWishlist(UUID userId) {
        return wishlistRepository.findAllByUserId(userId)
                .stream()
                .map(mapper::toDomain)
                .toList();
    }

    @Transactional
    public void removeProductFromWishlist(UUID userId, UUID productId) {
        WishlistItemEntity item = wishlistRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Wishlist item not found"));
        wishlistRepository.delete(item);
    }
}