package com.shopproject.returns;

import com.shopproject.exception.ResourceNotFoundException;
import com.shopproject.exception.UnauthorizedException;
import com.shopproject.order.OrderItem;
import com.shopproject.order.OrderItemRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping(path = "users/{customerId}/returns")
public class ReturnsController
{
    private final ReturnsService returnsService;


    public ReturnsController(ReturnsService returnsService)
    {
        this.returnsService = returnsService;
    }


    @GetMapping
    public List<ReturnRequestEntity> findAll(@PathVariable UUID customerId)
    {
        return this.returnsService.findAllByCustomerId(customerId);
    }


    @PostMapping
    public ReturnRequestEntity save(@PathVariable UUID customerId,
                                    @RequestParam UUID orderItemId,
                                    @RequestParam String returnReason) throws RuntimeException
    {
        return this.returnsService.save(customerId, orderItemId, returnReason);
    }


    @GetMapping(path = "/{id}")
    public ReturnRequestEntity findById(@PathVariable UUID customerId, @PathVariable UUID id)
    {
        return this.returnsService.findByIdAndCustomerId(id, customerId);
    }
}
