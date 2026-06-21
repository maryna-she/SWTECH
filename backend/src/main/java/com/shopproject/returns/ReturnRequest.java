package com.shopproject.returns;

import java.util.UUID;

public record ReturnRequest(
    UUID id,
    UUID shopItemId,
    UUID customerId,
    String returnReason,
    ReturnStatus returnStatus
) {}
