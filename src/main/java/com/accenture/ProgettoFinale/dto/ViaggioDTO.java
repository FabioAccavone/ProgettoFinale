package com.accenture.ProgettoFinale.dto;

import java.time.LocalDate;

import com.accenture.ProgettoFinale.enumeration.FormulaViaggio;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ViaggioDTO {
    
    @NotBlank(message = "Il luogo non può essere vuoto")
    private String luogo;
    @FutureOrPresent(message = "La data di partenza non può essere nel passato")
    private LocalDate dataPartenza;
    @FutureOrPresent(message = "La data di ritorno non può essere nel passato")
    private LocalDate dataRitorno;
    
    private FormulaViaggio formula;
    @Positive(message = "Il costo non può essere negativo")
    private double costo;
    @Positive(message = "I posti disponibili non possono essere negativi")
    private int postiDisponibili;
}
