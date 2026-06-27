package com.shopproject.returns;

import com.shopproject.exception.ResourceNotFoundException;
import com.shopproject.exception.UnauthorizedException;
import com.shopproject.order.OrderItem;
import com.shopproject.order.OrderItemRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Tag(name = "Returns", description = "Endpoints für Rücksendungen")
@RestController
@RequestMapping(path = "api/returns")
public class ReturnsController
{
    private final ReturnsService returnsService;


    public ReturnsController(ReturnsService returnsService)
    {
        this.returnsService = returnsService;
    }


    @Operation(summary = "Alle Rücksendungen suchen")
    @GetMapping
    public List<ReturnRequestEntity> findAll(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader)
    {
        return this.returnsService.findAllByCustomerId(authHeader);
    }


    @Operation(summary = "Neue Rücksendung speichern")
    @PostMapping
    public ReturnRequestEntity save(@RequestHeader (HttpHeaders.AUTHORIZATION) String authHeader,
                                    @RequestParam UUID orderItemId,
                                    @RequestParam String returnReason)
    {
        return this.returnsService.save(authHeader, orderItemId, returnReason);
    }


    @Operation(summary = "Einzelne Rücksendung anhand der ID suchen")
    @GetMapping(path = "/{id}")
    public ReturnRequestEntity findById(@PathVariable UUID id,
                                        @RequestHeader (HttpHeaders.AUTHORIZATION) String authHeader)
    {
        return this.returnsService.findByIdAndCustomerId(id, authHeader);
    }
}
