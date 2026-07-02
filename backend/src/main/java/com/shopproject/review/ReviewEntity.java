package com.shopproject.review;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "reviews")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "product_id", nullable = false)
    private UUID productId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public ReviewEntity(UUID id, UUID productId, UUID userId, Integer rating, String comment) {
        this.id = id;
        this.productId = productId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = LocalDateTime.now();
    }
}