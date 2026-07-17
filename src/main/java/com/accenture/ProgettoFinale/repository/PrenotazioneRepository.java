package com.accenture.ProgettoFinale.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.accenture.ProgettoFinale.model.Prenotazione;


public interface PrenotazioneRepository extends JpaRepository<Prenotazione,Long>{
 
    public List<Prenotazione> findByUserId(Long id);
}