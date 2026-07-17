package com.accenture.ProgettoFinale.security;

import org.springframework.stereotype.Component;

import com.accenture.ProgettoFinale.exception.NotFoundException;
import com.accenture.ProgettoFinale.model.User;
import com.accenture.ProgettoFinale.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;

@Component
public class JwtTool {
    
    @Value("${token.expiration}")
    private long expiration;

    @Value("${token.secret}")
    private String secret;

    private UserService userService;

    public JwtTool(UserService userService) {
        this.userService = userService;
    }

    public String createToken(User user){
        //per generare il token avremo bisogno della data di generazione del token, della durata e dell'id
        //dell'utente per il quale stiamo creando il token. Avremo inoltre bisogno anche della chiave segreta
        //per poter crittografare il token

        return Jwts.builder().issuedAt(new Date()).
                expiration(new Date(System.currentTimeMillis()+expiration)).
                subject(String.valueOf(user.getId())).
                signWith(Keys.hmacShaKeyFor(secret.getBytes())).
                compact();
    }

    //metodo per la verifica della validità del token
    public void validateToken(String token){
        Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).
                build().parse(token);
    }

    public User getUserFromToken(String token) throws NotFoundException {
        //recuperare l'id dell'utente dal token
        long id = Long.parseLong(Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).
                build().parseSignedClaims(token).getPayload().getSubject());

        return userService.getById(id);
    }
}
