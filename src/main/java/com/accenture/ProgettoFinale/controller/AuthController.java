package com.accenture.ProgettoFinale.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.ProgettoFinale.dto.AuthenticatedUserDTO;
import com.accenture.ProgettoFinale.dto.LoginDTO;
import com.accenture.ProgettoFinale.dto.UserDTO;
import com.accenture.ProgettoFinale.model.User;
import com.accenture.ProgettoFinale.service.AuthService;
import com.accenture.ProgettoFinale.service.UserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
public class AuthController {
    
    private UserService userService;
    private AuthService authService;

    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/auth/registrazione")
    public User register(@RequestBody UserDTO userDTO){
        return userService.save(userDTO);
    }

    @PostMapping("/auth/login")
    public AuthenticatedUserDTO login(@RequestBody @Valid LoginDTO loginDTO){
        return authService.login(loginDTO);
    }
}
