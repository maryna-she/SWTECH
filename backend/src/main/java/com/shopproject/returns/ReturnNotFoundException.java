package com.shopproject.returns;


import java.util.UUID;

public class ReturnNotFoundException extends RuntimeException
{
    public ReturnNotFoundException(UUID id)
    {
        super("Could not resolve return request with ID: " + id);
    }
}
