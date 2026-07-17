package com.accenture.ProgettoFinale.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accenture.ProgettoFinale.enumeration.FormulaViaggio;
import com.accenture.ProgettoFinale.model.Viaggio;



public interface ViaggioRepository extends JpaRepository<Viaggio, Long>{
    
    public List<Viaggio> findByLuogo(String luogo);

    public List<Viaggio> findByFormula(FormulaViaggio formula);

    public List<Viaggio> findByDataPartenza(LocalDate dataPartenza);
}
