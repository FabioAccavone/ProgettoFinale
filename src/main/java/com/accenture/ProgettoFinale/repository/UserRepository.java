package com.accenture.ProgettoFinale.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accenture.ProgettoFinale.model.User;



public interface UserRepository extends JpaRepository<User,Long>{

    public User findFirstByUsername(String username);
}
