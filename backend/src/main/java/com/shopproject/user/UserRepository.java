package com.shopproject.user;


import com.shopproject.user.model.User;
import com.shopproject.user.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByEmailAndIsDeletedFalse(String email);
    Optional<UserEntity> findByIdAndIsDeletedFalse(UUID id);
    boolean existsByEmail(String email);

    UserEntity getUserEntityById(UUID id);
}
