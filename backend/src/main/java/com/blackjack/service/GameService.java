package com.blackjack.service;

import com.blackjack.dto.PlayerDTO;
import com.blackjack.exceptions.InvalidGameException;
import com.blackjack.exceptions.InvalidParamException;
import com.blackjack.model.CommunicationObject;
import com.blackjack.model.Game;
import com.blackjack.model.GameStatus;
import com.blackjack.model.Players;
import com.blackjack.storage.GameStorage;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


import java.util.UUID;

@Service
@AllArgsConstructor
public class GameService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public Game createGame(PlayerDTO player) {
        Game game = new Game();
        game.setGameId(UUID.randomUUID().toString());
        Players players = new Players();
        players.setEmailId(player.getEmailId());
        players.setUserName(player.getUserName());
        game.setPlayer1(players);
        game.setGameName(player.getGameName());
        game.setStatus(GameStatus.NEW);
        GameStorage.getInstance().setGame(game);

        CommunicationObject objectToSend = new CommunicationObject();
        objectToSend.setContent(game);
        simpMessagingTemplate.convertAndSend("/game/game-progress/" + game.getGameId(), objectToSend);
        return game;
    }

    public Game connectToGame(PlayerDTO player2, String gameId) throws InvalidParamException, InvalidGameException {
        if(!GameStorage.getInstance().getGames().containsKey(gameId)){
            throw new InvalidParamException("Game with provided id doesn't exist");
        }
        Game game = GameStorage.getInstance().getGames().get(gameId);

        if(game.getPlayer2() != null) {
            throw new InvalidGameException("Game is not valid anymore");
        }

        Players players = new Players();
        players.setEmailId(player2.getEmailId());
        players.setUserName(player2.getUserName());
        game.setPlayer2(players);

        game.setStatus(GameStatus.IN_PROGRESS);
        GameStorage.getInstance().setGame(game);

        CommunicationObject objectToSend = new CommunicationObject();
        objectToSend.setContent(game);
        simpMessagingTemplate.convertAndSend("/game/game-progress/" + game.getGameId(), objectToSend);
        return game;
    }

    public Game progress(String gameId) {
        Game game = GameStorage.getInstance().getGames().get(gameId);

        CommunicationObject objectToSend = new CommunicationObject();
        objectToSend.setContent(game);
        simpMessagingTemplate.convertAndSend("/game/game-progress/" + game.getGameId(), objectToSend);
        return game;
    }

    public Game hit(PlayerDTO player, String gameId) throws InvalidParamException {
        if(!GameStorage.getInstance().getGames().containsKey(gameId)){
            throw new InvalidParamException("Game with provided id doesn't exist");
        }
        Game game = GameStorage.getInstance().getGames().get(gameId);
        game.drawCard(player.getEmailId());

        CommunicationObject objectToSend = new CommunicationObject();
        objectToSend.setContent(game);
        simpMessagingTemplate.convertAndSend("/game/game-progress/" + game.getGameId(), objectToSend);

        return game;
    }

    public Game stay(PlayerDTO player, String gameId) throws InvalidParamException {
        if(!GameStorage.getInstance().getGames().containsKey(gameId)){
            throw new InvalidParamException("Game with provided id doesn't exist");
        }
        Game game = GameStorage.getInstance().getGames().get(gameId);
        game.stay(player.getEmailId());

        CommunicationObject objectToSend = new CommunicationObject();
        objectToSend.setContent(game);
        simpMessagingTemplate.convertAndSend("/game/game-progress/" + game.getGameId(), objectToSend);
        return game;
    }

    public Game reset(String gameId) throws InvalidParamException {
        if(!GameStorage.getInstance().getGames().containsKey(gameId)){
            throw new InvalidParamException("Game with provided id doesn't exist");
        }
        Game game = GameStorage.getInstance().getGames().get(gameId);
        game.reset();

        CommunicationObject objectToSend = new CommunicationObject();
        objectToSend.setContent(game);
        simpMessagingTemplate.convertAndSend("/game/game-progress/" + game.getGameId(), objectToSend);
        return game;
    }


}
