package com.shopproject.products;

import java.math.BigDecimal;
import java.util.UUID;
/**
 * Repräsentiert das Domänenmodell und fungiert als Data Transfer Object (DTO).
 * Wird genutzt, um Produktdaten zwischen den Schichten (Service -> Controller -> Client)
 * zu transportieren, ohne datenbankspezifische Logik oder Annotationen zu enthalten.
 */
public record Product(
        UUID id,
        String name,
        String description,
        BigDecimal price,
        Integer stockQuantity
) {
}
