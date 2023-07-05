package com.blackjack.model;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String emailId;
    private String userName;
    private String password;
    private int rankScore;
    private int gamesWon;
    private int gamesLose;


    public User() {

    }

    public User(int id, String emailId, String userName, String password, int rankScore, int gamesWon, int gamesLose) {
        super();
        this.id = id;
        this.emailId = emailId;
        this.userName = userName;
        this.password = password;
        this.rankScore = rankScore;
        this.gamesWon = gamesWon;
        this.gamesLose = gamesLose;
    }
}
