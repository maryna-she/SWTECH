package com.shopproject.user.service;

import com.shopproject.exception.*;
import com.shopproject.products.Product;
import com.shopproject.products.ProductEntity;
import com.shopproject.security.crypto.PasswordEncoder;
import com.shopproject.user.UserMapper;
import com.shopproject.user.UserRepository;
import com.shopproject.user.dto.DeleteRequest;
import com.shopproject.user.dto.RegisterRequest;
import com.shopproject.user.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository repository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, UserMapper mapper, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User registerCustomer(RegisterRequest request) {
        log.info("Attempting to register new customer with email: {}", request.email());

        if (repository.existsByEmail(request.email())) {
            log.warn("Registration failed. Email already in use: {}", request.email());
            throw new ResourceAlreadyExistsException("Email already in use: " + request.email());
        }

        String hashed = passwordEncoder.encode(request.password());
        UserEntity entity = new UserEntity(
                null,
                request.firstName(),
                request.lastName(),
                request.email(),
                hashed,
                UserRole.CUSTOMER,
                false
        );

        UserEntity savedEntity = repository.save(entity);
        log.info("Successfully registered user with id: {}", savedEntity.getId());
        return mapper.toDomain(savedEntity);
    }

    @Transactional
    public void deleteAccount(UUID userId, DeleteRequest request) {
        log.info("Attempting to soft-delete user with id: {}", userId);

        UserEntity user = repository.findByIdAndIsDeletedFalse(userId)
                .orElseThrow(() -> {
                    log.warn("Deletion failed. User not found for id: {}", userId);
                    return new ResourceNotFoundException("User not found");
                });

        if (!passwordEncoder.matches(request.password(), user.getPasswordHashed())) {
            log.warn("Deletion failed. Invalid password provided for user id: {}", userId);
            throw new UnauthorizedException("Invalid password for deletion");
        }

        user.setDeleted(true);
        repository.save(user);
        log.info("Successfully soft-deleted user with id: {}", userId);
    }
}
