package com.shopproject.products;

import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public Product toDomain(ProductEntity productEntity) {
        return new Product(
                productEntity.getId(),
                productEntity.getName(),
                productEntity.getDescription(),
                productEntity.getPrice(),
                productEntity.getStockQuantity()
        );
    }

    public ProductEntity toEntity(Product product) {
        return new ProductEntity(
                product.id(),
                product.name(),
                product.description(),
                product.price(),
                product.stockQuantity()
        );
    }
}
