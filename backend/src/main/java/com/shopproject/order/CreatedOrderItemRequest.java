package com.shopproject.order;

public record CreatedOrderItemRequest (
    Long pruductId,
    Integer quantity
    ){
}
