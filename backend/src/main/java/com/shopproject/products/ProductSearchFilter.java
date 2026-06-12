package com.shopproject.products;

public record ProductSearchFilter(
        String name,
        Integer pageSize,
        Integer pageNumber) {
}
