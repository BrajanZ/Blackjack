import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare var SockJS: new (arg0: string) => any;
declare var Stomp: { over: (arg0: any) => any };

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseURL = 'http://localhost:8090/';

  // progress!: Observable<any>;
  public progress = new BehaviorSubject<any>('');
  progressChanged = this.progress.asObservable();

  constructor(private _http: HttpClient, private router: Router) {}

  public stompClient: any;

  initializeWebSocketConnection(gameId: string) {
    const serverUrl = this.baseURL + 'socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    const that = this;
    //tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function (frame: any) {
      that.stompClient.subscribe(
        '/game/game-progress/' + gameId,
        (message: any) => {
          if (message.body) {
            if (JSON.parse(message.body).content.status === 'IN_PROGRESS') {
              that.router.navigate(['/battle/' + gameId]);
            }
            that.progress.next(message.body);
          }
        }
      );
    });
  }

  public getGamesList() {
    return this._http.get<any>(this.baseURL + 'game/gamesId');
  }

  public createGame(gameName: string, mail: string, username: string) {
    return this._http.post<any>(this.baseURL + 'game/start', {
      emailId: mail,
      userName: username,
      gameName: gameName,
    });
  }

  public connGame(gameId: string, mail: string, username: string) {
    return this._http.post<any>(this.baseURL + 'game/connect', {
      player: {
        emailId: mail,
        userName: username,
      },
      gameId: gameId,
    });
  }

  public connProgress(gameId: string, mail: string) {
    return this._http.post<any>(this.baseURL + 'game/progress', {
      player: {
        emailId: mail,
      },
      gameId: gameId,
    });
  }

  public hitCard(gameId: string, mail: string) {
    return this._http.post<any>(this.baseURL + 'game/hit', {
      player: {
        emailId: mail,
      },
      gameId: gameId,
    });
  }

  public stayCard(gameId: string, mail: string) {
    return this._http.post<any>(this.baseURL + 'game/stay', {
      player: {
        emailId: mail,
      },
      gameId: gameId,
    });
  }

  public reset(gameId: string, mail: string) {
    return this._http.post<any>(this.baseURL + 'game/reset', {
      player: {
        emailId: mail,
      },
      gameId: gameId,
    });
  }

  public setWinnerPoints(mail: string) {
    return this._http.post<any>(this.baseURL + 'winner', {
      emailId: mail,
    });
  }

  public setLoserPoints(mail: string) {
    return this._http.post<any>(this.baseURL + 'loser', {
      emailId: mail,
    });
  }
}
