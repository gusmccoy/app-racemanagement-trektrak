import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CheckIn } from 'src/app/model/check-in.model';
import { CheckInService } from 'src/app/services/check-in.service';

@Component({
  selector: 'app-check-in-management',
  templateUrl: './check-in-management.component.html',
  styleUrls: ['./check-in-management.component.css']
})
export class CheckInManagementComponent implements OnInit {

  constructor(private checkInService: CheckInService, private messageService: MessageService) { }

  checkIns: CheckIn[] = [];

  submitted: boolean = false;

  checkInDialog: boolean = false;

  checkIn: CheckIn = {};

  selectedCheckIns: CheckIn[] = [];

  editCheckInPanel: boolean = false;

  selectedEvent?: number;

  ngOnInit(): void {}

  fetchCheckIns(id: number) {
    this.selectedEvent = id;
    this.checkInService.getAllCheckInsByEventId(this.selectedEvent as number)
      .subscribe(data => this.checkIns = data);
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
            this.checkIn.eventId = this.selectedEvent;
            this.checkIn.timestamp = new Date();
            this.checkInService.submitNewCheckIn(this.checkIn);
            this.checkIns.push(this.checkIn);
            this.messageService.add({severity:'success', summary: 'Successful!', detail: 'Check-In Added', life: 3000});
        //}

        this.checkIns = [...this.checkIns];
        this.checkInDialog = false;
        this.checkIn = {};
  }

}
