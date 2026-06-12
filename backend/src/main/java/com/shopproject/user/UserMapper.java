package com.shopproject.user;

import com.shopproject.user.model.User;
import com.shopproject.user.model.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toDomain(UserEntity entity) {
        return new User(
                entity.getId(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getEmail(),
                entity.getRole(),
                entity.isDeleted()
        );
    }
}
