import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-race-management',
  templateUrl: './race-management.component.html',
  styleUrls: ['./race-management.component.css']
})
export class RaceManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createclick(event: any) {
    console.log("Create was clicked!");
  }

}
