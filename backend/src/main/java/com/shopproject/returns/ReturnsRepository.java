package com.shopproject.returns;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReturnsRepository extends JpaRepository<ReturnRequestEntity, UUID>
{
    @Override
    Optional<ReturnRequestEntity> findById(UUID customerId);
}
