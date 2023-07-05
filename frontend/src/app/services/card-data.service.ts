import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardDataService {
  allCards = [
    '2C',
    '2D',
    '2H',
    '2S',
    '3C',
    '3D',
    '3H',
    '3S',
    '4C',
    '4D',
    '4H',
    '4S',
    '5C',
    '5D',
    '5H',
    '5S',
    '6C',
    '6D',
    '6H',
    '6S',
    '7C',
    '7D',
    '7H',
    '7S',
    '8C',
    '8D',
    '8H',
    '8S',
    '9C',
    '9D',
    '9H',
    '9S',
    '10C',
    '10D',
    '10H',
    '10S',
    'JC',
    'JD',
    'JH',
    'JS',
    'QC',
    'QD',
    'QH',
    'QS',
    'KC',
    'KD',
    'KH',
    'KS',
    'AC',
    'AD',
    'AH',
    'AS',
  ];

  gameActive = false;
  userCards: any[] = [];
  dealerCards: any[] = [];
  userScore = 0;
  dealerScore = 0;
  availableCards: any[] = [];
  gameResult = 'Let`s Play';

  constructor() {
    this.availableCards = this.allCards.slice();
  }

  reset() {
    this.availableCards = this.allCards.slice();
    this.gameActive = false;
    this.userCards = [];
    this.dealerCards = [];
    this.userScore = 0;
    this.dealerScore = 0;
    this.gameResult = "Let's Play";
  }

  getRandomCard(identity: any) {
    let randomCard = this.availableCards.splice(
      Math.floor(Math.random() * this.availableCards.length),
      1
    )[0];
    let cardScore: number = this.getCardScore(randomCard, identity);
    if (identity === 'dealer') {
      this.dealerCards.push(randomCard);

      this.dealerCards.filter((element) => {
        return element.includes('A');
      });

      let cardsValue = 0;

      this.dealerCards.forEach((element) => {
        cardsValue += this.checkScore(element.substring(0));
      });

      if (cardsValue > 21) {
        cardsValue = 0;
        this.dealerCards.forEach((element) => {
          cardsValue += this.checkScore(element.substring(0), true);
        });
      }

      this.dealerScore = cardsValue;
    } else {
      this.userCards.push(randomCard);

      this.userCards.filter((element) => {
        return element.includes('A');
      });

      let cardsValue = 0;

      this.userCards.forEach((element) => {
        cardsValue += this.checkScore(element.substring(0));
      });

      if (cardsValue > 21) {
        cardsValue = 0;
        this.userCards.forEach((element) => {
          cardsValue += this.checkScore(element.substring(0), true);
        });
      }

      this.userScore = cardsValue;
    }
  }

  checkScore(element: any, isMore = false): number {
    let cardValue = 0;

    if (parseInt(element)) {
      return parseInt(element);
    } else {
      if (element.includes('A')) {
        if (isMore) {
          return 1;
        } else {
          return 11;
        }
      } else {
        return 10;
      }
    }
  }

  getCardScore(cardID: any, identity: any) {
    let score = 0;
    let cardValue = 0;
    if (identity === 'dealer') {
      score = this.dealerScore;
    } else {
      score = this.userScore;
    }
    let royalCards = [
      'JC',
      'JD',
      'JH',
      'JS',
      'QC',
      'QD',
      'QH',
      'QS',
      'KC',
      'KD',
      'KH',
      'KS',
    ];
    let aceCards = ['AC', 'AD', 'AH', 'AS'];
    if (royalCards.includes(cardID)) {
      cardValue = 10;
    } else if (aceCards.includes(cardID)) {
      cardValue = 11;
      if (score + cardValue > 21) {
        cardValue = 1;
      }
    } else {
      cardValue = parseInt(cardID.substring(0, cardID.length - 1));
    }
    return cardValue;
  }
}
