package com.shopproject.review;

import com.shopproject.exception.ResourceAlreadyExistsException;
import com.shopproject.exception.ResourceNotFoundException;
import com.shopproject.products.ProductsRepository;
import com.shopproject.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ReviewService {
    private static final Logger log = LoggerFactory.getLogger(ReviewService.class);

    private final ReviewRepository reviewRepository;
    private final ProductsRepository productsRepository;
    private final UserRepository userRepository;
    private final ReviewMapper mapper;

    public ReviewService(ReviewRepository reviewRepository, ProductsRepository productsRepository, UserRepository userRepository, ReviewMapper mapper) {
        this.reviewRepository = reviewRepository;
        this.productsRepository = productsRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    @Transactional
    public Review createReview(CreateReviewRequest request) {
        UUID productId = request.productId();
        UUID userId = request.userId();
        if (reviewRepository.existsByProductIdAndUserId(productId, userId)) {
            throw new ResourceAlreadyExistsException("User has already reviewed this product.");
        }

        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found");
        }
        if (!productsRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found");
        }

        ReviewEntity entity = new ReviewEntity(null, productId, userId, request.rating(), request.comment());
        ReviewEntity saved = reviewRepository.save(entity);

        return mapper.toDomain(saved);
    }

    @Transactional(readOnly = true)
    public List<Review> getReviewsByProduct(UUID productId, int page, int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        return reviewRepository.findByProductId(productId, pageable)
                .stream()
                .map(mapper::toDomain)
                .toList();
    }
}