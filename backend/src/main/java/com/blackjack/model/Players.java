package com.blackjack.model;

import lombok.Data;

import java.util.ArrayList;

@Data
public class Players {

    private String emailId;
    private String userName;
    private ArrayList<String> card = new ArrayList<String>();

    private boolean isStay = false;

    private int points;

    public void clearCard() {
        card = new ArrayList<>();
    }
}
