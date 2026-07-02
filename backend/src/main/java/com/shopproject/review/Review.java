package com.shopproject.review;

import java.time.LocalDateTime;
import java.util.UUID;

public record Review(
        UUID id,
        UUID productId,
        UUID userId,
        Integer rating,
        String comment,
        LocalDateTime createdAt
) {}