package com.shopproject.returns;


import org.springframework.data.jpa.repository.JpaRepository;

public interface ReturnsRepository extends JpaRepository<ReturnRequestEntity, Long>
{
}
