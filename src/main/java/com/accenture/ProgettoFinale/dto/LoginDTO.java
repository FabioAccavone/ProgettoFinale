package com.accenture.ProgettoFinale.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDTO {
    
    @NotBlank(message = "L'username non può essere vuoto")
    private String username;
    @NotBlank(message = "La password non può essere vuota")
    private String password;
}
