package com.shopproject.user;

import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import com.shopproject.user.dto.AuthResponse;
import com.shopproject.user.dto.DeleteRequest;
import com.shopproject.user.dto.LoginRequest;
import com.shopproject.user.dto.RegisterRequest;
import com.shopproject.user.model.User;
import com.shopproject.user.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final AuthService authService;
    private final UserService userService;

    public UserController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    // Einfacher UserEntity anlegen, z.B. mit Postman
    @PostMapping(path = "/register")
    @SecurityRequirements()
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        log.info("Received POST /api/auth/register request for email: {}", request.email());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.registerCustomer(request));
    }

    @PostMapping(path = "/login")
    @SecurityRequirements()
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        log.info("Received POST /api/auth/login request for email: {}", request.email());
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(path = "/logout")
    public ResponseEntity<Void> logout(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        log.info("Received POST /api/auth/logout request");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            authService.logout(token);
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(path = "/users/{userId}")
    public ResponseEntity<Void> deleteAccount(
            @PathVariable UUID userId,
            @RequestBody DeleteRequest request
    ) {
        log.info("Received DELETE /api/auth/users/{} request", userId);
        userService.deleteAccount(userId, request);
        return ResponseEntity.noContent().build();
    }

}