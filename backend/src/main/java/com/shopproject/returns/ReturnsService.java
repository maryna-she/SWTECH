package com.shopproject.returns;

import com.shopproject.exception.ResourceNotFoundException;
import com.shopproject.exception.UnauthorizedException;
import com.shopproject.order.OrderItem;
import com.shopproject.order.OrderItemRepository;
import com.shopproject.user.UserRepository;
import com.shopproject.user.model.User;
import com.shopproject.user.model.UserEntity;
import com.shopproject.user.service.AuthService;
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


    private final AuthService authService;


    public ReturnsService(OrderItemRepository orderItemRepository,
                          ReturnsRepository returnsRepository,
                          AuthService authService)
    {
        this.orderItemRepository = orderItemRepository;
        this.returnsRepository = returnsRepository;
        this.authService = authService;
    }


    @Transactional
    public List<ReturnRequestEntity> findAllByUserId(String authHeader)
    {
        User user = authorizeUser(authHeader);

        List<ReturnRequestEntity> returnRequestEntities = new ArrayList<>();

        for (ReturnRequestEntity entity : this.returnsRepository.findAll())
        {
            if (user.id().compareTo(entity.getOrderItem().getShopOrder().getCustomer().getId()) == 0)
            {
                returnRequestEntities.add(entity);
            }
        }

        return returnRequestEntities;
    }


    @NotNull
    private User authorizeUser(String authHeader)
    {
        User user = this.authService.getCurrentUser(authHeader);

        if (user == null)
        {
            throw new UnauthorizedException("No permission.");
        }
        else
        {
            return user;
        }
    }


    @Transactional
    public ReturnRequestEntity save(String authHeader, UUID orderItemId, String returnReason)
    {
        User user = authorizeUser(authHeader);

        OrderItem orderItem = this.orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find order item with ID: " + orderItemId));

        if (user.id().compareTo(orderItem.getShopOrder().getCustomer().getId()) == 0)
        {
            return this.returnsRepository.save(new ReturnRequestEntity(orderItem, returnReason));
        }
        else
        {
            throw new UnauthorizedException("No permission to access order item with ID: " + orderItem.getId());
        }
    }


    @Transactional
    public ReturnRequestEntity findByIdAndCustomerId(UUID id, String authHeader)
    {
        User user = authorizeUser(authHeader);

        ReturnRequestEntity rr = this.returnsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find return request with ID: " + id));

        if (user.id().compareTo(rr.getOrderItem().getShopOrder().getCustomer().getId()) == 0)
        {
            return rr;
        }
        else
        {
            throw new UnauthorizedException("No permission to access return request with ID: " + rr.getId());
        }
    }
}
