package com.accenture.ProgettoFinale.model;

import java.time.LocalDate;
import java.util.List;

import com.accenture.ProgettoFinale.enumeration.FormulaViaggio;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "viaggi")
public class Viaggio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String luogo;

    @Column(name = "data_partenza")
    private LocalDate dataPartenza;

    @Column(name = "data_ritorno")
    private LocalDate dataRitorno;

    @Enumerated(EnumType.STRING)
    private FormulaViaggio formula;

    private double costo;

    @Column(name = "posti_disponibili")
    private int postiDisponibili;

    @OneToMany(
    mappedBy = "viaggio",
    cascade = CascadeType.ALL,
    orphanRemoval = true
)
    @JsonIgnore
    private List<Prenotazione> prenotazioni;
    
}
