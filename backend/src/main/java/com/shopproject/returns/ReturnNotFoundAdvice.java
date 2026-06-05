package com.shopproject.returns;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class ReturnNotFoundAdvice
{
    @ExceptionHandler(ReturnNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String returnNotFoundHandler(ReturnNotFoundException ex)
    {
        return ex.getMessage();
    }
}
