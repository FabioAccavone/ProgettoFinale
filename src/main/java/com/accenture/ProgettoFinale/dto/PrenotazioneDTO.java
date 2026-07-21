package com.accenture.ProgettoFinale.dto;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class PrenotazioneDTO {

    @PositiveOrZero(message = "Il numero di persone che prenotano un viaggio non possono essere negative")
    private int numPersone;

    @Positive(message = "L'id del viaggio deve essere positivo")
    private long viaggioId;

    @Positive(message = "L'id del user deve essere positivo")
    private long userId;

    private Double costoTotale;
}
