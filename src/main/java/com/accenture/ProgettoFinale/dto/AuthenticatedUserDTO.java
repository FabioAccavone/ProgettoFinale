package com.accenture.ProgettoFinale.dto;

import com.accenture.ProgettoFinale.enumeration.Ruolo;

import lombok.Data;

@Data
public class AuthenticatedUserDTO{

    private long id;
    private String username;
    private String jwt;
    private Ruolo ruolo;
}