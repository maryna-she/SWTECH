package com.shopproject.order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record OrderResponse (
        UUID id,
        LocalDateTime createdAt,
        OrderStatus status,
        BigDecimal totalPrice,
        List<OrderItemResponse> items
){
}
