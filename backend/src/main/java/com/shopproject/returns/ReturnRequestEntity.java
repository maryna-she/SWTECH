package com.shopproject.returns;


import com.shopproject.order.OrderItem;
import com.shopproject.order.ShopOrder;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;


@Setter
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReturnRequestEntity
{
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private UUID id;

    @Column
    private UUID orderItemId;

    @Column
    private UUID customerId;

    @Column
    private String returnReason;

    @Column
    private ReturnStatus returnStatus = ReturnStatus.REQUESTED;


    public ReturnRequestEntity(UUID orderItemId, UUID customerId, String returnReason)
    {
        this.orderItemId = orderItemId;
        this.customerId = customerId;
        this.returnReason = returnReason;
    }
}
