package com.shopproject.order;

import com.shopproject.products.ProductEntity;
import com.shopproject.products.ProductsRepository;
import com.shopproject.user.UserRepository;
import com.shopproject.user.model.UserEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final ShopOrderRepository shopOrderRepository;
    private final ProductsRepository productsRepository;
    private final UserRepository userRepository;

    public OrderService(ShopOrderRepository shopOrderRepository,
                        ProductsRepository productsRepository,
                        UserRepository userRepository) {
        this.shopOrderRepository = shopOrderRepository;
        this.productsRepository = productsRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        if (request.customerEmail() == null || request.customerEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Customer email is required");
        }

        if (request.items() == null || request.items().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Order must contain at least one item");
        }

        UserEntity customer = userRepository.findByEmailAndIsDeletedFalse(request.customerEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));

        ShopOrder order = new ShopOrder();
        order.setCustomer(customer);

        BigDecimal totalPrice = BigDecimal.ZERO;

        for (CreatedOrderItemRequest itemRequest : request.items()) {
            if (itemRequest.productId() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product id is required");
            }

            if (itemRequest.quantity() == null || itemRequest.quantity() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantity must be greater than 0");
            }

            ProductEntity productEntity = productsRepository.findById(itemRequest.productId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

            BigDecimal unitPrice = productEntity.getPrice();

            OrderItem orderItem = new OrderItem(
                    order,
                    productEntity,
                    itemRequest.quantity(),
                    unitPrice
            );

            order.addItem(orderItem);

            totalPrice = totalPrice.add(orderItem.getSubtotal());
        }

        order.setTotalPrice(totalPrice);

        ShopOrder savedOrder = shopOrderRepository.save(order);

        return toResponse(savedOrder);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return shopOrderRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByCustomerEmail(String email) {
        UserEntity customer = userRepository.findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));

        return shopOrderRepository.findByCustomer(customer)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderById(UUID id) {
        ShopOrder order = shopOrderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        return toResponse(order);
    }

    private OrderResponse toResponse(ShopOrder order) {
        List<OrderItemResponse> itemResponses = order.getItems()
                .stream()
                .map(this::toItemResponse)
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getCreatedAt(),
                order.getOrderStatus(),
                order.getTotalPrice(),
                itemResponses
        );
    }

    private OrderItemResponse toItemResponse(OrderItem item) {
        return new OrderItemResponse(
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getQuantity(),
                item.getUnitPrice(),
                item.getSubtotal()
        );
    }
}