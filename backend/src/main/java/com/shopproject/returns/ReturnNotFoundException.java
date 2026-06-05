package com.shopproject.returns;


public class ReturnNotFoundException extends RuntimeException
{
    public ReturnNotFoundException(Long id)
    {
        super("Return Not Found with ID: " + id);
    }
}
