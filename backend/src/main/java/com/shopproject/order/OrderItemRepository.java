package com.shopproject.order;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface OrderItemRepository extends CrudRepository<OrderItem, Long>
{
    OrderItem findById(long id);
}
