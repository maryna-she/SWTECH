package com.shopproject.returns;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ReturnsRepository extends JpaRepository<ReturnRequestEntity, UUID>
{
}
