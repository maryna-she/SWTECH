package com.shopproject.products;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

/**
 * Die Datenzugriffsschicht (Data Access Layer).
 * Interface für Datenbankoperationen. Erbt von JpaRepository, wodurch Standard-CRUD-Methoden
 * (Create, Read, Update, Delete) automatisch durch Spring Data JPA bereitgestellt werden.
 */
public interface ProductsRepository extends JpaRepository<ProductEntity, UUID> {
}
