package com.shopproject.cart;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
class CartService {
    private static final Logger log = LoggerFactory.getLogger(CartService.class);
    private final CartRepository repository;
    private final CartMapper mapper;

    public CartService(CartRepository repository, CartMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public Cart getCartByUserId(UUID userId) {
        CartEntity cartEntity = repository.findByUserId(userId)
                .orElseGet(() -> new CartEntity(null, userId));

        return mapper.toDomain(cartEntity);
    }

    @Transactional
    public Cart addItemToCart(UUID userId, UUID productId, Integer quantity) {
        CartEntity cartEntity = repository.findByUserId(userId)
                .orElseGet(() -> repository.save(new CartEntity(null, userId)));

        cartEntity.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst()
                .ifPresentOrElse(
                        existingItem -> existingItem.setQuantity(existingItem.getQuantity() + quantity),
                        () -> cartEntity.addItem(new CartItemEntity(null, productId, quantity))
                );

        CartEntity savedCart = repository.save(cartEntity);
        return mapper.toDomain(savedCart);
    }
}
