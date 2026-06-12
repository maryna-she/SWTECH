package com.shopproject.order;

import java.util.UUID;

public record CreatedOrderItemRequest (
   UUID productId,
    Integer quantity
    ){
}
