import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  baseURL = 'http://localhost:8090/';
  constructor(private _http: HttpClient) {}

  public loginUserFromRemote(user: User): Observable<any> {
    return this._http.post<any>(this.baseURL + 'login', user);
  }

  public registerUserFromRemote(user: User): Observable<any> {
    return this._http.post<any>(this.baseURL + 'registeruser', user);
  }

  public getRanking() {
    return this._http.get<any>(this.baseURL + 'ranking');
  }
}
