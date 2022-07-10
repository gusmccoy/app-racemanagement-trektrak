import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Login } from '../../model/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private route: Router)
    { }

  login : Login = {
    username: "",
    password: ""
  }

  loginSuccessful = false;

  ngOnInit(): void {
  }

  async loginSubmit(event: any) {
    (await this.loginService.submitLoginRequest(this.login)).subscribe(async data => {
      if(await this.loginService.decryptData(data.password, this.login.password)) {
        console.log("Login successful");
        this.route.navigateByUrl('home');
      } else {
        console.log("Login unsuccessful");
      }
    });
  }
}
