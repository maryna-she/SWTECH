package com.shopproject.user.service;

import com.shopproject.exception.*;
import com.shopproject.security.crypto.PasswordEncoder;
import com.shopproject.security.token.TokenProvider;
import com.shopproject.user.UserMapper;
import com.shopproject.user.UserRepository;
import com.shopproject.user.dto.AuthResponse;
import com.shopproject.user.dto.LoginRequest;
import com.shopproject.user.model.User;
import com.shopproject.user.model.UserEntity;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthService {
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository repository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public AuthService(UserRepository repository, UserMapper mapper, PasswordEncoder passwordEncoder, TokenProvider tokenProvider) {
        this.repository = repository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        log.info("Login attempt for email: {}", request.email());

        UserEntity user = repository.findByEmailAndIsDeletedFalse(request.email())
                .orElseThrow(() -> {
                    log.warn("Login failed. User not found or deleted for email: {}", request.email());
                    return new UnauthorizedException("Invalid credentials");
                });

        if (!passwordEncoder.matches(request.password(), user.getPasswordHashed())) {
            log.warn("Login failed. Password mismatch for email: {}", request.email());
            throw new UnauthorizedException("Invalid credentials");
        }

        String token = tokenProvider.generateToken(user.getId(), user.getRole());
        log.info("Successful login for user id: {}", user.getId());
        return new AuthResponse(token);
    }

    public void logout(String token) {
        tokenProvider.invalidateToken(token);
        log.info("Token invalidated for logout");
    }

    public User getCurrentUser(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Fehlender oder ungültiger Authorization-Header.");
        }

        String token = authHeader.substring(7);
        UUID id = tokenProvider.getUserIdFromToken(token);
        UserEntity userEntity = repository.findById(id)
                .orElseThrow(() -> new UnauthorizedException("Benutzer existiert nicht mehr. Token ist ungültig."));
        return mapper.toDomain(userEntity);
    }
}
