package com.accenture.ProgettoFinale.exception;

public class UnAuthorizedException extends RuntimeException{
    
    public UnAuthorizedException(String message){
        super(message);
    }
}
