package com.blackjack.model;

import com.blackjack.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;


@AllArgsConstructor
public class Game {

    private String gameId;
    private String gameName;

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }


    private Players winner;
    private boolean draw = false;

    public Players getWinner() {
        return winner;
    }

    public void setWinner(Players winner) {
        this.winner = winner;
    }

    public boolean isDraw() {
        return draw;
    }

    public void setDraw(boolean draw) {
        this.draw = draw;
    }

    @Autowired
    private RegistrationService service;

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public Players getPlayer1() {
        return player1;
    }

    public void setPlayer1(Players player1) {
        this.player1 = player1;
    }

    public Players getPlayer2() {
        return player2;
    }

    public void setPlayer2(Players player2) {
        this.player2 = player2;
    }

    public GameStatus getStatus() {
        return status;
    }

    public void setStatus(GameStatus status) {
        this.status = status;
    }

    private Players player1;
    private Players player2;
    private GameStatus status;
    private ArrayList<String> allCards =  new ArrayList<>(Arrays.asList("2C", "2D", "2H", "2S", "3C", "3D",
            "3H",
            "3S",
            "4C",
            "4D",
            "4H",
            "4S",
            "5C",
            "5D",
            "5H",
            "5S",
            "6C",
            "6D",
            "6H",
            "6S",
            "7C",
            "7D",
            "7H",
            "7S",
            "8C",
            "8D",
            "8H",
            "8S",
            "9C",
            "9D",
            "9H",
            "9S",
            "10C",
            "10D",
            "10H",
            "10S",
            "JC",
            "JD",
            "JH",
            "JS",
            "QC",
            "QD",
            "QH",
            "QS",
            "KC",
            "KD",
            "KH",
            "KS",
            "AC",
            "AD",
            "AH",
            "AS"));

    private ArrayList<String> availableCards = allCards;

    public Game() {
    }

    public void drawCard(String player) {
        Random rand = new Random();
        int randomCard = rand.nextInt(availableCards.size());
        if (player.equals(player1.getEmailId())) {
            player1.getCard().add(availableCards.get(randomCard));
            availableCards.remove(randomCard);
        } else if(player.equals(player2.getEmailId())) {
            player2.getCard().add(availableCards.get(randomCard));
            availableCards.remove(randomCard);
        }
        cardScore(player, false);
        checkScore(player);
    }

    public void stay(String player) {
        if (player.equals(player1.getEmailId())) {
            player1.setStay(true);
        } else if (player.equals(player2.getEmailId())) {
            player2.setStay(true);
        }

        if ( player1.isStay() && player2.isStay()) {
            showWinner();
        }
    }

    public void reset() {
        winner = null;
        status = GameStatus.IN_PROGRESS;
        availableCards = allCards;
        draw = false;
        player1.clearCard();
        player2.clearCard();
        player1.setStay(false);
        player2.setStay(false);
        player1.setPoints(0);
        player2.setPoints(0);
    }

    public void checkScore(String player) {
        if (player.equals(player1.getEmailId())) {
            if(player1.getPoints() > 21) {
                boolean isMore = false;
                for (String x : player1.getCard()) {
                     if(x.contains("A")) {
                        isMore = true;
                     }
                }
                if(isMore) {
                    cardScore(player, true);
                }
            }
        }

        if (player.equals(player2.getEmailId())) {
            if(player2.getPoints() > 21) {
                boolean isMore = false;
                for (String x : player2.getCard()) {
                    if(x.contains("A")) {
                        isMore = true;
                    }
                }
                if(isMore) {
                    cardScore(player, true);
                }
            }
        }
    }

    public void cardScore(String player, boolean isMore) {
        if (player.equals(player1.getEmailId())) {
            int points = 0;

            for (String x : player1.getCard()) {
                int dl = x.length();
                try {
                    int intValue = Integer.parseInt(x.substring(0,dl-1));
                    points += intValue;

                } catch (NumberFormatException e) {
                    if (x.contains("A")) {
                        if(isMore){
                            points += 1;
                        } else {
                            points += 11;
                        }
                    } else {
                        points += 10;
                    }
                }

                }

                player1.setPoints(points);

            }

        if (player.equals(player2.getEmailId())) {
            int points = 0;

            for (String x : player2.getCard()) {
                int dl = x.length();
                try {
                    int intValue = Integer.parseInt(x.substring(0,dl-1));
                    points += intValue;

                } catch (NumberFormatException e) {
                    if (x.contains("A")) {
                        if (isMore){
                            points += 1;
                        } else {
                            points += 11;
                        }
                    } else {
                        points += 10;
                    }
                }
            }
            player2.setPoints(points);
        }
    }


    public void showWinner() {
        System.out.println("wchodzi");
        if (player1.getPoints() > 21 && player2.getPoints() > 21) {
            draw = true;
        } else if (
                player1.getPoints() > 21 && player2.getPoints() < 21
        ) {
            winner = player2;
        } else if (
                player1.getPoints() < 21 && player2.getPoints() > 21
        ) {
            winner = player1;
        } else if (
                player1.getPoints() < 21 && player2.getPoints() < 21
        ) {
            if(player1.getPoints() < player2.getPoints()){
                winner = player2;
            } else if (player1.getPoints() > player2.getPoints()) {
                winner = player1;
            } else if(player1.getPoints() == player2.getPoints()) {
                draw = true;
            }
        }
    }
}
