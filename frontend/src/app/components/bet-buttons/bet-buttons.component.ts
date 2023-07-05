import { Component, OnInit } from '@angular/core';

import { CardDataService } from 'src/app/services/card-data.service';

@Component({
  selector: 'app-bet-buttons',
  templateUrl: './bet-buttons.component.html',
  styleUrls: ['./bet-buttons.component.scss'],
})
export class BetButtonsComponent implements OnInit {
  constructor(public cardData: CardDataService) {}

  ngOnInit(): void {
    this.cardData.reset();
  }

  hit() {
    this.cardData.getRandomCard('user');
    if (this.cardData.userScore > 21) {
      this.cardData.gameResult = 'Bust';
      // this.cardData.reset();
    }
  }

  stay() {
    while (this.cardData.dealerScore <= 17) {
      this.cardData.getRandomCard('dealer');
    }

    if (this.cardData.userScore > 21) {
      this.cardData.gameResult = 'You lose!';
    } else if (
      this.cardData.dealerScore < 22 &&
      this.cardData.dealerScore > this.cardData.userScore
    ) {
      this.cardData.gameResult = 'You lose!';
    } else if (
      this.cardData.dealerScore < 22 &&
      this.cardData.dealerScore < this.cardData.userScore
    ) {
      this.cardData.gameResult = 'You win!';
    } else if (
      this.cardData.dealerScore < 22 &&
      this.cardData.dealerScore === this.cardData.userScore
    ) {
      this.cardData.gameResult = 'Draw!';
    } else if (this.cardData.dealerScore > 21) {
      this.cardData.gameResult = 'You win!';
    }
  }

  reset() {
    this.cardData.reset();
  }
}
