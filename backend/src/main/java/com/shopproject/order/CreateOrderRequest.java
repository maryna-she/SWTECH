package com.shopproject.order;

import java.util.List;

public record CreateOrderRequest(
        String customerEmail,
        List<CreatedOrderItemRequest> items
) {
}
