package com.shopproject.returns;


import com.shopproject.order.OrderItem;
import com.shopproject.order.ShopOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Setter
@Getter
@Entity
public class ReturnRequestEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private ShopOrder shopOrder;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private OrderItem orderItem;


    @Column(nullable = false)
    private String returnReason;


    @Column(nullable = false)
    private ReturnStatus returnStatus;


    public ReturnRequestEntity()
    {
        this.returnStatus = ReturnStatus.REQUESTED;
    }
}
