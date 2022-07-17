import { Injectable } from '@angular/core';
import { Login } from '../model/login.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import { LoginRequestResponseDTO } from '../model/loginresponse.model';
import { LoginRequestDTO } from '../model/loginrequest.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  async encryptData(password : string) {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  }

  async decryptData(hashedPasword : string, password : string) {
    return bcrypt.compare(password, hashedPasword);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  async submitLoginRequest(loginRequest : Login) : Promise<Observable<LoginRequestResponseDTO>> {
    return this.http.post<LoginRequestResponseDTO>("https://www.gusmccoy.dev/ws_racemanagement_trektrak/user/authenicate", 
      loginRequest, this.httpOptions);
  }

  async submitCreateAccountRequest(createAccountRequest : LoginRequestDTO) {
    var request = createAccountRequest;
    this.encryptData(createAccountRequest.password).then(
      data => {
        request.password = data;
        this.http.post<string>("https://www.gusmccoy.dev/ws_racemanagement_trektrak/user/new", 
          request, this.httpOptions).subscribe();
      }
    );
  }
}
