package com.shopproject.products;

import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

/**
 * Die Geschäftslogikschicht (Service Layer).
 * Orchestriert die Datenabfrage über das Repository, wendet Geschäftsregeln an und
 * nutzt den Mapper, um Datenbank-Entitäten in DTOs umzuwandeln, bevor sie an den Controller übergeben werden.
 */
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

    public List<Product> searchAllByFilter(ProductSearchFilter filter) {
        int pageSize = filter.pageSize() != null
                ? filter.pageSize() : 10;
        int pageNumber = filter.pageNumber() != null
                ? filter.pageNumber() : 0;

        Pageable pageable = Pageable
                .ofSize(pageSize)
                .withPage(pageNumber);

        List<ProductEntity> allEntities = repository.searchAllByFilter(
                filter.name(),
                pageable
        );

        return allEntities.stream()
                .map(mapper::toDomain)
                .toList();
    }
}
