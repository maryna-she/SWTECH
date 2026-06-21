package com.shopproject.returns;


import java.util.UUID;

public class ReturnNotFoundException extends RuntimeException
{
    public ReturnNotFoundException(UUID id)
    {
        super("Return Not Found with ID: " + id);
    }
}
