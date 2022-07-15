import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/model/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  constructor(private eventService : EventService,
    private route: Router) { }

  ngOnInit(): void {
  }
  event : Event = {
    name : "",
    createUserId : 0
  }

  startTime: Date = new Date();

  createNewEvent(event : any) {
    this.event.createUserId = 1;
    this.eventService.submitNewEvent(this.event);
    this.route.navigateByUrl('race-hub');
  }

}
