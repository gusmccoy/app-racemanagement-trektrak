import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatus } from 'src/app/static/login-status';

@Component({
  selector: 'app-race-management',
  templateUrl: './race-management.component.html',
  styleUrls: ['./race-management.component.css']
})
export class RaceManagementComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    if(!LoginStatus.status) {
      LoginStatus.wasNavigatedToLogin = true;
      this.route.navigateByUrl('');
    }
  }

  createclick(event: any) {
    console.log("Create was clicked!");
  }

}
