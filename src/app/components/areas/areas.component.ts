import { Component, OnInit } from '@angular/core';

import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
})
export class AreasComponent implements OnInit {
  gameResult = "Let's Play";
  name = 'username';

  progressData: any;

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.progress();
  }

  progress() {
    this.messageService.progressChanged.subscribe((res) => {
      let mail: any = localStorage.getItem('mail');

      if (res) {
        this.progressData = JSON.parse(res);
        if (this.progressData.content.winner) {
          this.gameResult = this.progressData.content.winner.userName + ' win!';
          if (this.progressData.content.winner.emailId === mail) {
            this.messageService.setWinnerPoints(mail).subscribe();
          } else {
            this.messageService.setLoserPoints(mail).subscribe();
          }
        } else {
          this.gameResult = "Let's Play";
        }

        if (this.progressData.content.draw) {
          this.gameResult = 'Draw!';
        }
      }
    });
  }

  hit() {
    let game: string = this.progressData.content.gameId;
    let mail: any = localStorage.getItem('mail');
    this.messageService.hitCard(game, mail).subscribe((res) => {});
  }

  stay() {
    let game: string = this.progressData.content.gameId;
    let mail: any = localStorage.getItem('mail');
    this.messageService.stayCard(game, mail).subscribe((res) => {});
  }

  reset() {
    let game: string = this.progressData.content.gameId;
    let mail: any = localStorage.getItem('mail');
    this.messageService.reset(game, mail).subscribe((res) => {});
  }

  checkStay() {
    let mail: any = localStorage.getItem('mail');

    if (this.progressData?.content.player1.emailId === mail) {
      return this.progressData.content.player1.stay;
    }

    if (this.progressData?.content.player2.emailId === mail) {
      return this.progressData.content.player2.stay;
    }

    return true;
  }

  checkReset() {
    if (this.progressData?.content.winner) {
      return false;
    }

    if (this.progressData?.content.draw) {
      return false;
    }
    return true;
  }
}
