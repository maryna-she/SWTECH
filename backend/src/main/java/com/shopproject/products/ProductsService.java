package com.shopproject.products;

import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductsService {
    private static final Logger log = LoggerFactory.getLogger(ProductsService.class);
    private final ProductsRepository repository;
    private final ProductMapper mapper;

    public ProductsService(ProductsRepository repository, ProductMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public Product getProductById(UUID id) {
        ProductEntity productEntity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Not found product by id = " + id));

        return mapper.toDomain(productEntity);
    }

    public List<Product> getAllProducts() {
        List<ProductEntity> allEntities = repository.findAll();

        return allEntities.stream().map(mapper::toDomain).toList();
    }
}
