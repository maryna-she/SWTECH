package com.shopproject.order;

import com.shopproject.product.ProductRepository;
import com.shopproject.user.User;
import com.shopproject.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;

@Service
public class OrderService {
    private final ShopOrderRepository shopOrderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderService(ShopOrderRepository shopOrderRepository,
                        ProductRepository productRepository,
                        UserRepository userRepository){
        this.shopOrderRepository = shopOrderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request){
        if(request.customerEmail() == null || request.customerEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Eine Email wird benötigt.");
        }

        if(request.items() == null || request.items().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "DIe Bestellung muss mindestens einen Artikel enthalten.");
        }

        User customer  = userRepository.findByEmail(request.customerEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User nicht gefunden."));

        ShopOrder order = new ShopOrder();
        order.setCustomer(customer);

        BigDecimal totalPrice = BigDecimal.ZERO;

        for (CreatedOrderItemRequest itemRequest : request.items()) {
            if(itemRequest.pruductId() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Es wurde kein Produkt zum ID.");
            }
        }
    }
}
