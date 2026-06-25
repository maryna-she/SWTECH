package com.shopproject.order;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Orders", description = "Endpoints für Bestellungen und Bestellhistorie")
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Operation(summary = "Neue Bestellung erstellen")
    @PostMapping
    public OrderResponse createOrder(@RequestBody CreateOrderRequest request){
        return orderService.createOrder(request);
    }

    @Operation(summary = "Alle Bestellungen oder Bestellungen eines Kunden abrufen")
    @GetMapping
    public List<OrderResponse> getOrder(@RequestParam(required = false)String email){
        if(email != null && !email.isBlank()){
            return orderService.getOrdersByCustomerEmail(email);
        }
        return orderService.getAllOrders();
    }

    @Operation(summary = "Bestellung anhand der ID abrufen")
    @GetMapping("/{id}")
    public OrderResponse getOrderById(@PathVariable UUID id){
        return orderService.getOrderById(id);
    }
}
