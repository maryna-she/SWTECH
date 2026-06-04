package com.shopproject.products;

import org.springframework.stereotype.Component;

/**
 * Konvertiert Daten zwischen dem Datenbankmodell (ProductEntity) und dem DTO (Product).
 * Trennt die Datenbanklogik strikt von der Geschäftslogik, indem Objekte für die
 * jeweilige Schicht passend umgewandelt werden.
 */
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
