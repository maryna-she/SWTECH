package com.shopproject.products;

import org.springframework.data.repository.CrudRepository;
import java.util.UUID;

public interface ProductsRepository extends CrudRepository<ProductEntity, UUID> {
}
