import { Injectable } from '@angular/core';
import { Login } from '../model/login.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedInStatus = false;

  isLoggedIn(): boolean {
      return true;
  }

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  submitLoginRequest(loginRequest : Login) : Observable<boolean> {
    return this.http.post<boolean>("https://gusmccoy.dev/ws_racemanagement_trektrak/user/authenicate", 
      loginRequest, this.httpOptions);
  }
}
