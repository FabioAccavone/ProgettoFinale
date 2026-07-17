package com.accenture.ProgettoFinale.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.formLogin(form -> form.disable());

        http.csrf(csrf -> csrf.disable());

        http.cors(Customizer.withDefaults());

        http.sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.authorizeHttpRequests(auth -> auth

        // Login e registrazione
        .requestMatchers("/auth/**")
        .permitAll()

        // ------------------------
        // VIAGGI
        // ------------------------

        // Inserimento viaggio
        .requestMatchers(HttpMethod.POST, "/viaggi")
        .hasRole("ADMIN")

        // Modifica viaggio
        .requestMatchers(HttpMethod.PUT, "/viaggi/**")
        .hasRole("ADMIN")

        // Eliminazione viaggio
        .requestMatchers(HttpMethod.DELETE, "/viaggi/**")
        .hasRole("ADMIN")

        // Tutti i GET dei viaggi
        .requestMatchers(HttpMethod.GET, "/viaggi/**")
        .hasAnyRole("ADMIN","USERS")

        // ------------------------
        // PRENOTAZIONI
        // ------------------------

        // Prenotazione viaggio
        .requestMatchers(HttpMethod.POST, "/prenotazioni")
        .hasAnyRole("ADMIN", "USERS")

        // Elenco prenotazioni
        .requestMatchers(HttpMethod.GET, "/prenotazioni")
        .hasAnyRole("ADMIN", "USERS")

        .anyRequest()
        .authenticated()
    );
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}