package com.blackjack.repository;

import com.blackjack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<User, Integer> {

    User findByEmailId (String emailId);
    User findByEmailIdAndPassword (String emailId, String password);
    List<User> findAllByOrderByRankScoreDesc();
}
