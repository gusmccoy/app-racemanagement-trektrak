import { Injectable } from '@angular/core';
import { Login } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn(): boolean {
      return true;
  }

  constructor() { }

  submitLoginRequest(loginRequest : Login) : boolean {
    return true;
  }
}
