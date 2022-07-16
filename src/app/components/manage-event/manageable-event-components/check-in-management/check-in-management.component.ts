import { Component, OnInit } from '@angular/core';
import { CheckIn } from 'src/app/model/check-in.model';
import { CheckInService } from 'src/app/services/check-in.service';

@Component({
  selector: 'app-check-in-management',
  templateUrl: './check-in-management.component.html',
  styleUrls: ['./check-in-management.component.css']
})
export class CheckInManagementComponent implements OnInit {

  constructor(private checkInService: CheckInService) { }

  checkIns: CheckIn[] = [];

  submitted: boolean = false;

  checkInDialog: boolean = false;

  checkIn: CheckIn = {};

  selectedCheckIns: CheckIn[] = [];

  editCheckInPanel: boolean = false;

  ngOnInit(): void {
    this.checkInService.getAllCheckIns().subscribe(data => this.checkIns = data);

  }

  editCheckIn(checkIn: CheckIn) {
    this.checkIn = {...checkIn};
  }

  deleteCheckIn(checkIn: CheckIn) {

  };

  openNew() {
    this.checkIn = {};
    this.submitted = false;
    this.checkInDialog = true;
  }

  hideDialog() {
    this.checkInDialog = false;
    this.submitted = false;
  }

  saveCheckIn() {
    this.submitted = true;
        //if (this.product.id) {
          //  this.products[this.findIndexById(this.product.id)] = this.product;
            //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        //}
        //else {
            //this.product.id = this.createId();
            this.checkIn.eventId = 1;
            this.checkIn.timestamp = new Date();
            this.checkInService.submitNewCheckIn(this.checkIn);
            this.checkIns.push(this.checkIn);
            //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        //}

        this.checkIns = [...this.checkIns];
        this.checkInDialog = false;
        this.checkIn = {};
  }

}