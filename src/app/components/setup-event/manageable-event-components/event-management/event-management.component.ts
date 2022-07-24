import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Event } from 'src/app/model/event.model';
import { EventService } from 'src/app/services/event.service';
import { LoginStatus } from 'src/app/static/login-status';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {

  constructor(private eventService: EventService, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  events: Event[] = [];
  selectedEvents: Event[] = [];

  submitted: boolean = false;
  eventDialog: boolean = false;
  editEventPanel: boolean = false;

  event: Event = {  };
  selectedEvent: String = "";

  ngOnInit(): void {}

  fetchEvents() {
    this.eventService.getAllEventsByUserId(LoginStatus.userId)
      .subscribe(data => this.events = data);
  }

  editEvent(event: Event) {
    this.event = {...event};
    this.eventDialog = true;
  }

  deleteEvent(event: Event) {
    this.events = this.events.filter(val => val.id !== event.id);
    this.eventService.deleteById(event.id as number);
  };

  openNew() {
    this.event = {};
    this.submitted = false;
    this.eventDialog = true;
  }

  hideDialog() {
    this.eventDialog = false;
    this.submitted = false;
  }

  saveEvent() {
    this.submitted = true;
    if(this.event.id) {
      this.events[this.findIndexById(this.event.id)] = this.event;
      this.eventService.updateEvent(this.event);
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Updated', life: 3000});
    
    } else {
      this.event.createUserId = LoginStatus.userId;
      this.eventService.submitNewEvent(this.event).subscribe(
        data => {
          console.log(data);
          this.event.id = data;
        }
      );
      this.events.push(this.event);
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Created!', life: 3000});
      this.events = [...this.events];
    }
    this.eventDialog = false;
    this.event = {};
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.events.length; i++) {
        if (this.events[i].id === id) {
          index = i;
          break;
        }
    }
    return index;
  }
}
