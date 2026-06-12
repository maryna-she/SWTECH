package com.shopproject.order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse (
        Long id,
        LocalDateTime createdAt,
        OrderStatus status,
        BigDecimal totalPrice,
        List<OrderItemResponse> items
){
}
