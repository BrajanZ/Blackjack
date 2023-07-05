package com.blackjack.service;

import com.blackjack.model.User;
import com.blackjack.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository repo;

    public User saveUser(User user) {
        return repo.save(user);
    }

    public void setWinnerPoints (String email) {
        User userObj1 = repo.findByEmailId(email);
        userObj1.setRankScore(userObj1.getRankScore() + 10);
        userObj1.setGamesWon(userObj1.getGamesWon() + 1);
        repo.save(userObj1);
    }

    public void setLoserPoints (String email) {
        User userObj1 = repo.findByEmailId(email);
        userObj1.setGamesLose(userObj1.getGamesLose() + 1);
        repo.save(userObj1);
    }

    public User fetchUserByEmailId (String email) {
        return repo.findByEmailId(email);
    }

    public User fetchUserByEmailIdAndPassword (String email, String password) {
        return repo.findByEmailIdAndPassword(email, password);
    }

    public List<User> getUserList() {
        return repo.findAllByOrderByRankScoreDesc();
    }
}
