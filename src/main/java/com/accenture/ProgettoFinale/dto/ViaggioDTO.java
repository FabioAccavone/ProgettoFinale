package com.accenture.ProgettoFinale.dto;

import java.time.LocalDate;

import com.accenture.ProgettoFinale.enumeration.FormulaViaggio;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
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
    @PositiveOrZero(message = "Il costo non può essere negativo")
    private double costo;
    @PositiveOrZero(message = "I posti disponibili non possono essere negativi")
    private int postiDisponibili;
}
