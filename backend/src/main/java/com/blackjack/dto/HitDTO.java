package com.blackjack.dto;

import lombok.Data;

@Data
public class HitDTO {
    private PlayerDTO player;
    private String gameId;
}
