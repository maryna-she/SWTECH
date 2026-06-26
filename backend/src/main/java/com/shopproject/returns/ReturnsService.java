package com.shopproject.returns;

import com.shopproject.exception.ResourceNotFoundException;
import com.shopproject.exception.UnauthorizedException;
import com.shopproject.order.OrderItem;
import com.shopproject.order.OrderItemRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.hibernate.query.Order;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ReturnsService
{
    private final OrderItemRepository orderItemRepository;


    private final ReturnsRepository returnsRepository;


    public ReturnsService(OrderItemRepository orderItemRepository,
                          ReturnsRepository returnsRepository)
    {
        this.orderItemRepository = orderItemRepository;
        this.returnsRepository = returnsRepository;
    }

    @Transactional
    public List<ReturnRequestEntity> findAllByCustomerId(UUID userId)
    {
        List<ReturnRequestEntity> returnRequestEntities = new ArrayList<>();

        for (ReturnRequestEntity entity : this.returnsRepository.findAll())
        {
            if (userId.compareTo(entity.getOrderItem().getShopOrder().getCustomer().getId()) == 0)
            {
                returnRequestEntities.add(entity);
            }
        }

        return returnRequestEntities;
    }


    private OrderItem authorizeCustomer(UUID id, UUID customerId)
    {
        OrderItem orderItem = this.orderItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not resolve order item with id " + id));

        if (customerId.compareTo(orderItem.getShopOrder().getCustomer().getId()) != 0)
        {
            throw new UnauthorizedException("User has no permission to access the requested resource.");
        }
        else
        {
            return orderItem;
        }
    }

    @Transactional
    public ReturnRequestEntity save(UUID customerId, UUID orderItemId, String returnReason)
    {
        return this.returnsRepository.save(new ReturnRequestEntity(
                authorizeCustomer(orderItemId, customerId),
                returnReason)
        );
    }

    @Transactional
    public ReturnRequestEntity findByIdAndCustomerId(UUID id, UUID customerId)
    {
        ReturnRequestEntity returnRequestEntity = this.returnsRepository.findById(id)
                .orElseThrow(() -> new ReturnNotFoundException(id));

        authorizeCustomer(returnRequestEntity.getOrderItem().getId(), customerId);

        return returnRequestEntity;
    }
}
