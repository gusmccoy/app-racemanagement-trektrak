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
    password: "",
    email: '',
    id: 0
  }

  loginSuccessful = false;

  ngOnInit(): void {
  }

  clickEvent(event: any) {
    this.loginService.submitLoginRequest(this.login).subscribe(data => {
      if(data === true) {
        this.route.navigateByUrl('home');
      }
    });
  }
}
