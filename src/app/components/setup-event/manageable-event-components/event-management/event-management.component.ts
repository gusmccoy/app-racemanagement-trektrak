import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Event } from 'src/app/model/event.model';
import { EventService } from 'src/app/services/event.service';
import { LoginStatus } from 'src/app/static/login-status';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {

  constructor(private eventService: EventService, private messageService: MessageService) { }

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
  }

  deleteEvent(event: Event) {};

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
        //if (this.product.id) {
          //  this.products[this.findIndexById(this.product.id)] = this.product;
            //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        //}
        //else {
            //this.product.id = this.createId();
            this.event.createUserId = 2;
            this.eventService.submitNewEvent(this.event);
            this.events.push(this.event);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Created!', life: 3000});
        //}

        this.events = [...this.events];
        this.eventDialog = false;
        this.event = {};
    }
}
