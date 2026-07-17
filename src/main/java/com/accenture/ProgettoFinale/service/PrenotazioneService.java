package com.accenture.ProgettoFinale.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.accenture.ProgettoFinale.dto.PrenotazioneDTO;
import com.accenture.ProgettoFinale.exception.NotFoundException;
import com.accenture.ProgettoFinale.exception.QuantitaInsufficienteException;
import com.accenture.ProgettoFinale.model.Prenotazione;
import com.accenture.ProgettoFinale.model.User;
import com.accenture.ProgettoFinale.model.Viaggio;
import com.accenture.ProgettoFinale.repository.PrenotazioneRepository;
import com.accenture.ProgettoFinale.repository.ViaggioRepository;

@Service
public class PrenotazioneService {
    
    private PrenotazioneRepository prenotazioneRepo;
    private UserService userService;
    private ViaggioRepository viaggioRepo;

    public PrenotazioneService(PrenotazioneRepository prenotazioneRepo, ViaggioRepository viaggioRepo, UserService userService) {
        this.prenotazioneRepo = prenotazioneRepo;
        this.viaggioRepo = viaggioRepo;
        this.userService = userService;
    }

    public Prenotazione prenotaViaggio(PrenotazioneDTO prenotazioneDTO){

        User user = userService.getById(prenotazioneDTO.getUserId());

        Viaggio viaggio = viaggioRepo.findById(prenotazioneDTO.getViaggioId())
        .orElseThrow(() -> new NotFoundException("Viaggio non trovato"));

        if(viaggio.getPostiDisponibili() < prenotazioneDTO.getNumPersone()){
            throw new QuantitaInsufficienteException("Quantità insufficiente");
        }

        viaggio.setPostiDisponibili(viaggio.getPostiDisponibili() - prenotazioneDTO.getNumPersone());

        viaggioRepo.save(viaggio);

        Prenotazione prenotazione = new Prenotazione();

        prenotazione.setDataPrenotazione(LocalDate.now());
        prenotazione.setNumPersone(prenotazioneDTO.getNumPersone());
        prenotazione.setViaggio(viaggio);
        prenotazione.setUser(user);

        return prenotazioneRepo.save(prenotazione);
    }

    public List<Prenotazione> getAll(){
        return prenotazioneRepo.findAll();
    }

    public List<Prenotazione> getByUserId(Long id){
        return prenotazioneRepo.findByUserId(id);
    }
}
