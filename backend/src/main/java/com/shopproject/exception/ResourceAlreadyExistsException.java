package com.shopproject.exception;

// Für HTTP 409 Conflict
public class ResourceAlreadyExistsException extends RuntimeException {
    public ResourceAlreadyExistsException(String message) { super(message); }
}
