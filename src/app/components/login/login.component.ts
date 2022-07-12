import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Login } from '../../model/login.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ MessageService ]
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private route: Router,
    private messageService: MessageService)
    { }

  login : Login = {
    username: "",
    password: ""
  }

  ngOnInit(): void {
  }

  async loginSubmit(event: any) {
    (await this.loginService.submitLoginRequest(this.login)).subscribe(async data => {
      if(await this.loginService.decryptData(data.password, this.login.password)) {
        console.log("Login successful");
        this.route.navigateByUrl('race-hub');
      } else {
        this.showError();
      }
    });
  }

  createAccount(event: any) {
    this.route.navigateByUrl('create');
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Login Failed', detail: 'Username and/or password was incorrect'});
  }
}
