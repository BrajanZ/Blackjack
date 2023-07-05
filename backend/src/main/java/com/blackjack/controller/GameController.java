package com.blackjack.controller;

import com.blackjack.dto.ConnectRequest;
import com.blackjack.dto.HitDTO;
import com.blackjack.dto.PlayerDTO;

import com.blackjack.dto.StayDTO;
import com.blackjack.exceptions.InvalidGameException;
import com.blackjack.exceptions.InvalidParamException;
import com.blackjack.model.Game;
import com.blackjack.service.GameService;
import com.blackjack.storage.GameStorage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/game")
@CrossOrigin("http://localhost:4200")
public class GameController {

    private final GameService gameService;

    @PostMapping("/start")
    public ResponseEntity<Game> start(@RequestBody PlayerDTO player) {
        return ResponseEntity.ok(gameService.createGame(player));
    }

    @PostMapping("/connect")
    public ResponseEntity<Game> connect(@RequestBody ConnectRequest request) throws InvalidParamException, InvalidGameException {
        return ResponseEntity.ok(gameService.connectToGame(request.getPlayer(), request.getGameId()));
    }

    @PostMapping("/progress")
    public ResponseEntity<Game> progress(@RequestBody ConnectRequest request) {
        return ResponseEntity.ok(gameService.progress(request.getGameId()));
    }

    @PostMapping("/hit")
    public ResponseEntity<Game> hit(@RequestBody HitDTO hitDto) throws InvalidParamException, InvalidGameException {
        return ResponseEntity.ok(gameService.hit(hitDto.getPlayer(), hitDto.getGameId()));
    }

    @PostMapping("/stay")
    public ResponseEntity<Game> stay(@RequestBody StayDTO stayDTO) throws InvalidParamException, InvalidGameException {
        return ResponseEntity.ok(gameService.stay(stayDTO.getPlayer(), stayDTO.getGameId()));
    }

    @PostMapping("/reset")
    public ResponseEntity<Game> reset(@RequestBody ConnectRequest request) throws InvalidParamException {
        return ResponseEntity.ok(gameService.reset(request.getGameId()));
    }

    @GetMapping("/gamesId")
    public ResponseEntity<Map<String, Game>> listGames() {
        return ResponseEntity.ok(GameStorage.getInstance().getGames());
    }
}
