package com.shopproject.cart;

import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
class CartMapper {
    public Cart toDomain(CartEntity cartEntity) {
        var items = cartEntity.getItems().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());

        return new Cart(
                cartEntity.getId(),
                cartEntity.getUserId(),
                items
        );
    }

    public CartItem toDomain(CartItemEntity cartItemEntity) {
        return new CartItem(
                cartItemEntity.getId(),
                cartItemEntity.getProductId(),
                cartItemEntity.getQuantity()
        );
    }

    public CartEntity toEntity(Cart cart) {
        CartEntity entity = new CartEntity(cart.id(), cart.userId());
        if (cart.items() != null) {
            cart.items().forEach(item -> entity.addItem(toEntity(item)));
        }
        return entity;
    }

    public CartItemEntity toEntity(CartItem item) {
        return new CartItemEntity(
                item.id(),
                item.productId(),
                item.quantity()
        );
    }
}
