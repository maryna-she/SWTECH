package com.shopproject.user.dto;

public record LoginRequest(
        String email,
        String password
) {
}
