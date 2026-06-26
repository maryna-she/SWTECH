package com.shopproject.returns;


import com.shopproject.order.OrderItem;
import com.shopproject.order.ShopOrder;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.query.Order;

import java.util.UUID;


@Setter
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReturnRequestEntity
{
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "order_item_id", nullable = false)
    private OrderItem orderItem;


    @Column(name = "return_reason", nullable = false)
    private String returnReason;


    @Column(name = "return_status", nullable = false)
    private ReturnStatus returnStatus;


    public ReturnRequestEntity(OrderItem orderItem, String returnReason)
    {
        this.orderItem = orderItem;
        this.returnReason = returnReason;
        this.returnStatus = ReturnStatus.REQUESTED;
    }
}
