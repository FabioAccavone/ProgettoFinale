package com.accenture.ProgettoFinale.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.ProgettoFinale.dto.PrenotazioneDTO;
import com.accenture.ProgettoFinale.exception.BadRequestException;
import com.accenture.ProgettoFinale.model.Prenotazione;
import com.accenture.ProgettoFinale.service.PrenotazioneService;

@RestController
@CrossOrigin
public class PrenotazioneController {
    
    private PrenotazioneService prenotazioneService;

    public PrenotazioneController(PrenotazioneService prenotazioneService) {
        this.prenotazioneService = prenotazioneService;
    }

    @PostMapping("/prenotazioni")
    public Prenotazione save(@RequestBody @Validated PrenotazioneDTO prenotazioneDTO, BindingResult bindingResult){

        if (bindingResult.hasErrors()) {

            throw new BadRequestException(
                    bindingResult.getAllErrors()
                            .stream()
                            .map(error -> error.getDefaultMessage())
                            .collect(Collectors.joining(", "))
            );
        }
        
        return prenotazioneService.prenotaViaggio(prenotazioneDTO);
    }

    @GetMapping("/prenotazioni")
    public List<Prenotazione> getAll(){
        return prenotazioneService.getAll();
    }
}
