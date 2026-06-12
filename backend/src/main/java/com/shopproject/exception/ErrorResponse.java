package com.shopproject.exception;

import java.time.LocalDateTime;

/**
 * Ein standardisiertes Format für alle API-Fehlermeldungen.
 */
public record ErrorResponse(
        int status,
        String error,
        String message,
        LocalDateTime timestamp,
        String path
) {
}
