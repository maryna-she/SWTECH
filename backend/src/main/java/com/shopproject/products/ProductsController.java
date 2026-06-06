package com.shopproject.products;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Die Präsentationsschicht (REST-API).
 * Verarbeitet eingehende HTTP-Requests, delegiert die Logik an den ProductsService
 * und gibt formatierte HTTP-Antworten (ResponseEntity inkl. Statuscode und Body als JSON) zurück.
 */
@RestController
@RequestMapping(path="/products")
public class ProductsController {
    private static final  Logger log = LoggerFactory.getLogger(ProductsController.class);

    private final ProductsService productsService;

    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }


    @Operation(
            summary = "Produkt anhand der ID abrufen",
            description = "Liefert die Details eines Produkts anhand seiner eindeutigen UUID zurück."
    )
    @GetMapping(path="/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable UUID id) {
        log.info("Called getProductById: id=" + id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(productsService.getProductById(id));
    }

    @Operation(
            summary = "Alle Produkte abrufen",
            description = "Liefert eine Liste aller verfügbaren Produkte zurück."
    )
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        log.info("Called getAllProducts");
        return ResponseEntity.ok(productsService.getAllProducts());
    }
}