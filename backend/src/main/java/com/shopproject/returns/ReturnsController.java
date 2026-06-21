package com.shopproject.returns;

import com.shopproject.exception.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(path = "users/{customerId}/returns")
public class ReturnsController
{
    private final ReturnsRepository returnsRepository;


    public ReturnsController(ReturnsRepository returnsRepository)
    {
        this.returnsRepository = returnsRepository;
    }


    @GetMapping
    public List<ReturnRequestEntity> findAll(@PathVariable UUID customerId)
    {
        return this.returnsRepository.findAllByCustomerId(customerId);
    }


    @PostMapping
    public ReturnRequestEntity save(@PathVariable UUID customerId,
                                    @RequestParam UUID orderItemId,
                                    @RequestParam String returnReason)
    {
        return returnsRepository.save(new ReturnRequestEntity(orderItemId, customerId, returnReason));
    }


    @GetMapping(path = "/{id}")
    public ReturnRequestEntity findById(@PathVariable UUID customerId, @PathVariable UUID id)
    {
        return this.returnsRepository.findByCustomerIdAndId(customerId, id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find return request " + id +
                        "belonging to user " + customerId + "."));
    }

}
