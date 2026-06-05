package com.shopproject.returns;


import com.shopproject.order.OrderItem;
import com.shopproject.order.ShopOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@Entity
public class ReturnRequestEntity
{
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private ShopOrder shopOrder;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "oder_item_id", nullable = false)
    private OrderItem orderItem;


    private String returnReason;


    private ReturnStatus returnStatus;


    public ReturnRequestEntity()
    {
        this.returnStatus = ReturnStatus.REQUESTED;
    }
}
