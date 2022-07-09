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
    username : "",
    password : ""
  }

  ngOnInit(): void {
  }

  clickEvent(event: any) {
    if(this.loginService.submitLoginRequest(this.login)) {
      // NAVIGATE TO NEW PAGE
      this.route.navigateByUrl('home');
    }
  }

}
