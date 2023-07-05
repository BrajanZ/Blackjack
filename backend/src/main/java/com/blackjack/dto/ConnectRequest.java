package com.blackjack.dto;

import lombok.Data;

@Data
public class ConnectRequest {

    private PlayerDTO player;
    private String gameId;
}
