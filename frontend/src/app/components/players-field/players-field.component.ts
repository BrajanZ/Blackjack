import { Component, OnInit } from '@angular/core';

import { Game } from '../../models/game';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players-field',
  templateUrl: './players-field.component.html',
  styleUrls: ['./players-field.component.scss'],
})
export class PlayersFieldComponent implements OnInit {
  title = 'websocket-frontend';
  input!: string;
  allGamesId: Game[] = [];

  constructor(public messageService: MessageService, private router: Router) {}

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames() {
    this.messageService.getGamesList().subscribe((response) => {
      let array: any = [];
      let result = Object.values(response).map((value) => array.push(value));
      this.allGamesId = array;
    });
  }

  conn(game: string) {
    let mail: any = localStorage.getItem('mail');
    let username: any = localStorage.getItem('username');
    this.messageService.connGame(game, mail, username).subscribe((res) => {
      this.messageService.initializeWebSocketConnection(res.gameId);
      this.router.navigate(['/battle/' + res.gameId]);

      setTimeout(() => {
        this.messageService.connProgress(res.gameId, mail).subscribe(() => {});
      }, 200);
    });
  }

  create() {
    if (this.input) {
      let mail: any = localStorage.getItem('mail');
      let username: any = localStorage.getItem('username');
      this.messageService
        .createGame(this.input, mail, username)
        .subscribe((res) => {
          this.getAllGames();
          this.messageService.initializeWebSocketConnection(res.gameId);
        });
      this.input = '';
    }
  }
}
