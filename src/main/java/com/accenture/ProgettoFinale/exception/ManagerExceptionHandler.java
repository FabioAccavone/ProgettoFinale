package com.accenture.ProgettoFinale.exception;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.accenture.ProgettoFinale.model.ApiError;

@RestControllerAdvice
public class ManagerExceptionHandler {
    
    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError badRequestExceptionHandler(BadRequestException e){
        ApiError error = new ApiError();

        error.setMessage(e.getMessage());
        error.setErrorTime(LocalDate.now());
        error.setStatus(HttpStatus.BAD_REQUEST);

        return error;
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiError notFoundExeptionHandler(NotFoundException e){
        ApiError error = new ApiError();

        error.setMessage(e.getMessage());
        error.setErrorTime(LocalDate.now());
        error.setStatus(HttpStatus.NOT_FOUND);

        return error;
    }

    @ExceptionHandler(UnAuthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiError unAuthorizedExceptionHandler(UnAuthorizedException e){
        ApiError error = new ApiError();

        error.setMessage(e.getMessage());
        error.setErrorTime(LocalDate.now());
        error.setStatus(HttpStatus.UNAUTHORIZED);

        return error;
    }
}
