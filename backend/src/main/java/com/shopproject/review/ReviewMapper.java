package com.shopproject.review;

import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {
    public Review toDomain(ReviewEntity entity) {
        return new Review(
                entity.getId(),
                entity.getProductId(),
                entity.getUserId(),
                entity.getRating(),
                entity.getComment(),
                entity.getCreatedAt()
        );
    }
}