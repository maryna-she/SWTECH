package com.shopproject.cart;

import com.shopproject.exception.ResourceNotFoundException;
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
    public Cart addQuantityToItem(UUID userId, UUID productId, Integer quantity) {
        CartEntity cartEntity = getOrCreateCart(userId);

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

    @Transactional
    public Cart setExactQuantity(UUID userId, UUID productId, Integer exactQuantity) {
        CartEntity cartEntity = getOrCreateCart(userId);

        cartEntity.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst()
                .ifPresentOrElse(
                        existingItem -> existingItem.setQuantity(exactQuantity),
                        () -> cartEntity.addItem(new CartItemEntity(null, productId, exactQuantity))
                );

        return mapper.toDomain(repository.save(cartEntity));
    }

    @Transactional
    public Cart removeItem(UUID userId, UUID productId) {
        CartEntity cartEntity = repository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + userId));

        cartEntity.getItems().removeIf(item -> item.getProductId().equals(productId));

        return mapper.toDomain(repository.save(cartEntity));
    }

    private CartEntity getOrCreateCart(UUID userId) {
        return repository.findByUserId(userId)
                .orElseGet(() -> repository.save(new CartEntity(null, userId)));
    }
}
