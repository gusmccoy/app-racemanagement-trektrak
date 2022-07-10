import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequestDTO } from 'src/app/model/loginrequest.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private route: Router)
    { }

  createAccount: LoginRequestDTO = {
    username: "",
    password: "",
    email: ""
  }

  loginSuccessful = false;

  ngOnInit(): void {
  }

  async createAccountSubmit(event: any) {
    await this.loginService.submitCreateAccountRequest(this.createAccount);
    this.route.navigateByUrl('home');
  }

}
