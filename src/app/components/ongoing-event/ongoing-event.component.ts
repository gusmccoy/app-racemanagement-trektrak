import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CheckIn } from 'src/app/model/check-in.model';
import { Event } from 'src/app/model/event.model';
import { Station } from 'src/app/model/station.model';
import { CheckInService } from 'src/app/services/check-in.service';
import { EventService } from 'src/app/services/event.service';
import { StationService } from 'src/app/services/station.service';
import { LoginStatus } from 'src/app/static/login-status';

@Component({
  selector: 'app-ongoing-event',
  templateUrl: './ongoing-event.component.html',
  styleUrls: ['./ongoing-event.component.css']
})
export class OngoingEventComponent implements OnInit {

  constructor(private eventService: EventService, private stationService: StationService,
     private checkInService: CheckInService, private route: Router, private messageService: MessageService) { }

  events: Event[] = [];
  stations: Station[] = [];
  checkIns: CheckIn[] = [];

  selectedEvent?: Event;
  selectedStation?: Station;
  selectedCheckIns: CheckIn[] = [];

  checkinBib: number = 0;
  checkIn?: CheckIn;

  ngOnInit(): void {
    if(!LoginStatus.status) {
      LoginStatus.wasNavigatedToLogin = true;
      this.route.navigateByUrl('');
    }

    this.eventService.getAllEventsByUserId(LoginStatus.userId).subscribe(data => {
      this.events = data;
      this.selectedEvent = this.events[0]; 
      this.fetchEventStations(null);
    })
  }

  fetchEventStations(event: any) {
    this.stationService.getAllStationsByEventId(this.selectedEvent?.id as number).subscribe(data => {
      this.stations = data;
      if(this.stations.length > 0) {
        this.selectedStation = this.stations[0];
        this.fetchCheckIns(null);
      } else {
        this.checkIns = [];
      }
    });
  }

  fetchCheckIns(event: any) {
    this.checkInService.getAllCheckInsByEventAndStationId(this.selectedEvent?.id as number,
      this.selectedStation?.stationNumber as number).subscribe(data => {
      this.checkIns = data;
    })
  }

  postCheckIn() {
    if(this.validEntry(this.checkinBib)) {
      this.checkIn = {
        stationNumber: this.selectedStation?.stationNumber,
        eventId: this.selectedEvent?.id,
        bib: this.checkinBib,
        timestamp: new Date()
      }
      this.checkInService.submitNewCheckIn(this.checkIn);
      this.checkIns.push(this.checkIn);
      this.checkinBib = 0;
    } else {
      this.messageService.add({severity:'warn', summary: 'Notice', detail: 'Check in logged for bib not in list.', life: 3000});
    }
  }

  validEntry(entry: number): boolean {
    return entry >= 100;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key == "Enter"){
      this.postCheckIn();
    }
  }

}
