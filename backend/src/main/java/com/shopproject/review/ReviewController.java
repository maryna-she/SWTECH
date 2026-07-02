package com.shopproject.review;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Reviews", description = "Endpoints für Produktbewertungen")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private static final Logger log = LoggerFactory.getLogger(ReviewController.class);
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @Operation(
            summary = "Produktbewertung erstellen",
            description = "Erstellt eine neue Bewertung für ein Produkt."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Bewertung erfolgreich erstellt"),
            @ApiResponse(responseCode = "400", description = "Ungültige Bewertungsdaten (z.B. Rating außerhalb des erlaubten Bereichs)"),
            @ApiResponse(responseCode = "404", description = "Benutzer oder Produkt existiert nicht"),
            @ApiResponse(responseCode = "409", description = "Benutzer hat dieses Produkt bereits bewertet")
    })
    @PostMapping
    public ResponseEntity<Review> createReview(
            @RequestBody CreateReviewRequest request) {
        log.info("Creating review for product: {}", request.productId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.createReview(request));
    }

    @Operation(
            summary = "Bewertungen eines Produkts abrufen",
            description = "Gibt eine paginierte Liste aller Bewertungen für ein bestimmtes Produkt zurück."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Bewertungen erfolgreich abgerufen")
    })
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getProductReviews(
            @PathVariable UUID productId,
            @RequestParam(name = "pageNumber", required = false, defaultValue = "0") int page,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(productId, page, size));
    }
}