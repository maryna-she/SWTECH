package com.shopproject.order;

import com.shopproject.user.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShopOrderRepository extends JpaRepository <ShopOrder, Long> {
    List<ShopOrder> findByCustomer(UserEntity customer);
}
