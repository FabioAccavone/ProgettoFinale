package com.accenture.ProgettoFinale.model;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ApiError {
    
    private String message;
    private LocalDate errorTime;

    private HttpStatus status;
}
