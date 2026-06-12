package com.shopproject.products;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

/**
 * Die Datenzugriffsschicht (Data Access Layer).
 * Interface für Datenbankoperationen. Erbt von JpaRepository, wodurch Standard-CRUD-Methoden
 * (Create, Read, Update, Delete) automatisch durch Spring Data JPA bereitgestellt werden.
 */
public interface ProductsRepository extends JpaRepository<ProductEntity, UUID> {
    @Query("""
       SELECT p from ProductEntity p
            WHERE (:name IS NULL OR p.name = :name)
       """)
    List<ProductEntity> searchAllByFilter(
            @Param("name") String name,
            Pageable pageable
    );
}
