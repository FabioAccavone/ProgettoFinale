package com.accenture.ProgettoFinale.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.accenture.ProgettoFinale.dto.ViaggioDTO;
import com.accenture.ProgettoFinale.enumeration.FormulaViaggio;
import com.accenture.ProgettoFinale.exception.NotFoundException;
import com.accenture.ProgettoFinale.model.Viaggio;
import com.accenture.ProgettoFinale.repository.ViaggioRepository;

@Service
public class ViaggioService {
    
    private ViaggioRepository viaggioRepo;

    public ViaggioService(ViaggioRepository viaggioRepo) {
        this.viaggioRepo = viaggioRepo;
    }

    public Viaggio getById(Long id){
        return viaggioRepo.findById(id)
        .orElseThrow(() -> new NotFoundException("Viaggio non trovato"));
    }

    public List<Viaggio> getAll(){
        return viaggioRepo.findAll();
    }

    public List<Viaggio> getByLuogo(String luogo){
        return viaggioRepo.findByLuogo(luogo);
    }

    public List<Viaggio> getByFormula(FormulaViaggio formula){
        return viaggioRepo.findByFormula(formula);
    }

    public List<Viaggio> getByDataPartenza(LocalDate dataPartenza){
        return viaggioRepo.findByDataPartenza(dataPartenza);
    }

    public Viaggio save(ViaggioDTO viaggioDTO){

        Viaggio viaggio = new Viaggio();

        viaggio.setLuogo(viaggioDTO.getLuogo());
        viaggio.setDataPartenza(viaggioDTO.getDataPartenza());
        viaggio.setDataRitorno(viaggioDTO.getDataRitorno());
        viaggio.setFormula(viaggioDTO.getFormula());
        viaggio.setCosto(viaggioDTO.getCosto());
        viaggio.setPostiDisponibili(viaggioDTO.getPostiDisponibili());

        return viaggioRepo.save(viaggio);
    }

    public Viaggio update(Long id, ViaggioDTO viaggioDTO){
        Viaggio viaggioToUpdate = getById(id);

        viaggioToUpdate.setLuogo(viaggioDTO.getLuogo());
        viaggioToUpdate.setDataPartenza(viaggioDTO.getDataPartenza());
        viaggioToUpdate.setDataRitorno(viaggioDTO.getDataRitorno());
        viaggioToUpdate.setFormula(viaggioDTO.getFormula());
        viaggioToUpdate.setCosto(viaggioDTO.getCosto());
        viaggioToUpdate.setPostiDisponibili(viaggioDTO.getPostiDisponibili());

        return viaggioRepo.save(viaggioToUpdate);
    }

    public void delete(Long id){
        viaggioRepo.deleteById(id);
    }
}
