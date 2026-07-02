package com.shopproject.review;

import java.util.UUID;

public record CreateReviewRequest(
        UUID userId,
        UUID productId,
        Integer rating,
        String comment) {
}
