package com.shopproject.products;

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

/**
 * Die Präsentationsschicht (REST-API).
 * Verarbeitet eingehende HTTP-Requests, delegiert die Logik an den ProductsService
 * und gibt formatierte HTTP-Antworten (ResponseEntity inkl. Statuscode und Body als JSON) zurück.
 */
@Tag(name = "Products", description = "Endpoints für die Produktverwaltung")
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
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produkt erfolgreich gefunden"),
            @ApiResponse(responseCode = "404", description = "Produkt nicht gefunden")
    })
    @GetMapping(path="/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable UUID id) {
        log.info("Called getProductById: id=" + id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(productsService.getProductById(id));
    }

    @Operation(
            summary = "Alle Produkte abrufen",
            description = "Liefert eine Liste von Produkten zurück. Unterstützt optionale Filter nach Name sowie Pagination über Seitenzahl und Seitengröße."
    )
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "pageSize", required = false) Integer pageSize,
            @RequestParam(name = "pageNumber", required = false) Integer pageNumber
    ) {
        log.info("Called getAllProducts");
        return ResponseEntity.ok(productsService.searchAllByFilter(
                new ProductSearchFilter(name, pageSize, pageNumber)
        ));
    }
}