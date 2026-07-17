package com.accenture.ProgettoFinale.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.accenture.ProgettoFinale.dto.UserDTO;
import com.accenture.ProgettoFinale.enumeration.Ruolo;
import com.accenture.ProgettoFinale.exception.NotFoundException;
import com.accenture.ProgettoFinale.model.User;
import com.accenture.ProgettoFinale.repository.UserRepository;


@Service
public class UserService {
    
    private UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepo,
                       PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public User save(UserDTO userDTO){
        User user = new User();

        user.setNome(userDTO.getNome());
        user.setCognome(userDTO.getCognome());
        user.setIndirizzo(userDTO.getIndirizzo());
        user.setCf(userDTO.getCf());
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRuolo(Ruolo.USERS);

        return userRepo.save(user);
    }

    public List<User> getAll(){
        return userRepo.findAll();
    }

    public User getById(Long id){
        return userRepo.findById(id)
        .orElseThrow(() -> new NotFoundException("Viaggio non trovato"));
    }

    public User getByUsername(String username){
        return userRepo.findFirstByUsername(username);
    }

    public User update(Long id, UserDTO userDTO){
        User userToUpdate = getById(id);
        
        userToUpdate.setNome(userDTO.getNome());
        userToUpdate.setCognome(userDTO.getCognome());
        userToUpdate.setIndirizzo(userDTO.getIndirizzo());
        userToUpdate.setCf(userDTO.getCf());
        userToUpdate.setUsername(userDTO.getUsername());
        userToUpdate.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        
        return userRepo.save(userToUpdate);
    }

    public void delete(Long id){
        userRepo.deleteById(id);
    }

}
