package com.accenture.ProgettoFinale.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.accenture.ProgettoFinale.dto.AuthenticatedUserDTO;
import com.accenture.ProgettoFinale.dto.LoginDTO;
import com.accenture.ProgettoFinale.exception.NotFoundException;
import com.accenture.ProgettoFinale.model.User;
import com.accenture.ProgettoFinale.security.JwtTool;


@Service
public class AuthService {
    
    private UserService userService;
    private JwtTool jwtTool;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService,
                       JwtTool jwtTool,
                       PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtTool = jwtTool;
        this.passwordEncoder = passwordEncoder;
    }

    /*
        1. verificare che l'utente esiste
        2. se l'utente non esite, lancia una eccezione
        3. se l'utente esiste, generare il token e inviarlo al client
    */

    public AuthenticatedUserDTO login(LoginDTO loginDTO) {

        AuthenticatedUserDTO authUser = new AuthenticatedUserDTO();
        User user = userService.getByUsername(loginDTO.getUsername());

        if (user == null) {
            throw new NotFoundException("Utente con questo username/password non trovato");
        }

        if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            authUser.setId(user.getId());
            authUser.setUsername(user.getUsername());
            authUser.setJwt(jwtTool.createToken(user));
            authUser.setRuolo(user.getRuolo());

            return authUser;
        }

        throw new NotFoundException("Utente con questo username/password non trovato");
    }
}
