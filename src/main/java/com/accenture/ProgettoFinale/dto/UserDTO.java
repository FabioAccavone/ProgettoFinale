package com.accenture.ProgettoFinale.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserDTO {
  
    @NotBlank(message = "Il nome non può essere vuoto")
    private String nome;
    @NotBlank(message = "Il cognome non può essere vuota")
    private String cognome;
    @NotBlank(message = "L'indirizzo non può essere vuoto")
    private String indirizzo;
    @NotBlank(message = "Il codice fiscale non può essere vuoto")
    private String cf;
    @NotBlank(message = "L'username non può essere vuoto")
    private String username;
    @NotBlank(message = "La password non può essere vuoto")
    private String password;
}
