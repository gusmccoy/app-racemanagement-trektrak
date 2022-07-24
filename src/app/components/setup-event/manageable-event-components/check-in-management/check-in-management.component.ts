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
  selectedCheckIns: CheckIn[] = [];

  submitted: boolean = false;
  checkInDialog: boolean = false;
  editCheckInPanel: boolean = false;

  checkIn: CheckIn = {};
  selectedEvent?: number;

  ngOnInit(): void {}

  fetchCheckIns(id: number) {
    this.selectedEvent = id;
    this.checkInService.getAllCheckInsByEventId(this.selectedEvent as number)
      .subscribe(data => this.checkIns = data);
  }

  editCheckIn(checkIn: CheckIn) {
    this.checkIn = {...checkIn};
    //this.checkInDialog = true;
  }

  deleteCheckIn(checkIn: CheckIn) {
    this.checkIns = this.checkIns.filter(val => val.id !== checkIn.id);
    this.checkInService.deleteById(checkIn.id as number);
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
    if(this.checkIn.id) {
      this.checkIns[this.findIndexById(this.checkIn.id)] = this.checkIn;
      this.checkInService.updateCheckIn(this.checkIn);
      this.messageService.add({severity:'success', summary: 'Successful!', detail: 'Check-In Updated', life: 3000});
    
    } else {
      this.checkIn.eventId = this.selectedEvent;
      this.checkIn.timestamp = new Date();
      this.checkInService.submitNewCheckIn(this.checkIn).subscribe(
        data => {
          this.checkIn.id = data;
        }
      );
      this.checkIns.push(this.checkIn);
      this.messageService.add({severity:'success', summary: 'Successful!', detail: 'Check-In Added', life: 3000});
      this.checkIns = [...this.checkIns];
    }
    this.checkInDialog = false;
    this.checkIn = {};
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.checkIns.length; i++) {
        if (this.checkIns[i].id === id) {
          index = i;
          break;
        }
    }
    return index;
  }
}
