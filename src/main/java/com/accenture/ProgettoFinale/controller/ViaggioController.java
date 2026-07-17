package com.accenture.ProgettoFinale.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.ProgettoFinale.dto.ViaggioDTO;
import com.accenture.ProgettoFinale.enumeration.FormulaViaggio;
import com.accenture.ProgettoFinale.exception.BadRequestException;
import com.accenture.ProgettoFinale.model.Viaggio;
import com.accenture.ProgettoFinale.service.ViaggioService;

@RestController
@CrossOrigin
public class ViaggioController {
    
    private ViaggioService viaggioService;

    public ViaggioController(ViaggioService viaggioService) {
        this.viaggioService = viaggioService;
    }

    @PostMapping("/viaggi")
    public Viaggio save(@RequestBody @Validated ViaggioDTO viaggioDTO, BindingResult bindingResult){
        
        if (bindingResult.hasErrors()) {

            throw new BadRequestException(
                    bindingResult.getAllErrors()
                            .stream()
                            .map(error -> error.getDefaultMessage())
                            .collect(Collectors.joining(", "))
            );
        }
        return viaggioService.save(viaggioDTO);
    }

    @PutMapping("/viaggi/{id}")
    public Viaggio update(@PathVariable Long id, @RequestBody @Validated ViaggioDTO viaggioDTO, BindingResult bindingResult){
        
        if (bindingResult.hasErrors()) {

            throw new BadRequestException(
                    bindingResult.getAllErrors()
                            .stream()
                            .map(error -> error.getDefaultMessage())
                            .collect(Collectors.joining(", "))
            );
        }

        return viaggioService.update(id, viaggioDTO);
    }

    @DeleteMapping("/viaggi/{id}")
    public void delete(@PathVariable Long id){
        viaggioService.delete(id);
    }

    @GetMapping("/viaggi")
    public List<Viaggio> getAll(){
        return viaggioService.getAll();
    }

    @GetMapping("/viaggi/{id}")
    public Viaggio getById(@PathVariable Long id){
        return viaggioService.getById(id); 
    }

    @GetMapping("/viaggi/luogo/{luogo}")
    public List<Viaggio> getByLuogo(@PathVariable String luogo){
        return viaggioService.getByLuogo(luogo);
    }

    @GetMapping("/viaggi/formula/{formula}")
    public List<Viaggio> getByFormula(@PathVariable String formula){
        return viaggioService.getByFormula(FormulaViaggio.valueOf(formula));
    }

    @GetMapping("/viaggi/data_partenza/{data_partenza}")
    public List<Viaggio> getByDataPartenza(@PathVariable("data_partenza") LocalDate dataPartenza){
        return viaggioService.getByDataPartenza(dataPartenza);
    }
}
