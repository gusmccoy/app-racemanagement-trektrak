import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
     private checkInService: CheckInService, private route: Router) { }

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
    })
  }

  fetchEventStations(event: any) {
    this.stationService.getAllStationsByEventId(this.selectedEvent?.createUserId as number).subscribe(data => {
      this.stations = data;
      this.selectedStation = this.stations[0];
      this.fetchCheckIns(null);
    });
  }

  fetchCheckIns(event: any) {
    this.checkInService.getAllCheckIns().subscribe(data => {
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
