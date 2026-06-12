package com.shopproject.user.dto;

public record RegisterRequest(
        String firstName,
        String secondName,
        String email,
        String password
) {
}
