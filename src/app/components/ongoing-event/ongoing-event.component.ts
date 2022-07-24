import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { CheckIn } from 'src/app/model/check-in.model';
import { Event } from 'src/app/model/event.model';
import { Participant } from 'src/app/model/participant.model';
import { Station } from 'src/app/model/station.model';
import { CheckInService } from 'src/app/services/check-in.service';
import { EventService } from 'src/app/services/event.service';
import { ParticipantService } from 'src/app/services/participant.service';
import { StationService } from 'src/app/services/station.service';
import { LoginStatus } from 'src/app/static/login-status';

@Component({
  selector: 'app-ongoing-event',
  templateUrl: './ongoing-event.component.html',
  styleUrls: ['./ongoing-event.component.css']
})
export class OngoingEventComponent implements OnInit {

  constructor(private eventService: EventService, private stationService: StationService,
     private checkInService: CheckInService, private route: Router, private messageService: MessageService,
     private participantService: ParticipantService) { }

  events: Event[] = [];
  stations: Station[] = [];
  checkIns: CheckIn[] = [];
  participants: Participant[] = [];

  selectedEvent?: Event;
  selectedStation?: Station;
  selectedCheckIns: CheckIn[] = [];

  checkinBib?: number;
  checkIn?: CheckIn;

  items: MenuItem[] = [];

  entryValidationToggled: boolean = true;

  ngOnInit(): void {
    if(!LoginStatus.status) {
      LoginStatus.wasNavigatedToLogin = true;
      this.route.navigateByUrl('');
    }

    this.eventService.getAllEventsByUserId(LoginStatus.userId).subscribe(data => {
      this.events = data;
      this.selectedEvent = this.events[0]; 
      this.fetchEventStationsAndParticipants(null);
    })

    this.items = [
      {
        label: 'Check In Participants',
        icon: 'pi pi-check-circle',
      },
      {
        label:'Event Stats',
        icon:'pi pi-chart-bar',
        command: () => this.route.navigateByUrl('/not-found')
      },
      {
        label:'Event Reports',
        icon:'pi pi-book',
        command: () => this.route.navigateByUrl('/not-found')
      },
      {
        label:'Event Settings',
        icon:'pi pi-ellipsis-v',
        command: () => this.route.navigateByUrl('/not-found')
      },
    ];
  }

  fetchEventStationsAndParticipants(event: any) {
    this.participantService.getAllParticipantsByEventId(this.selectedEvent?.id as number).subscribe(data => {
      this.participants = data;
    });

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
    if(this.validEntry(this.checkinBib as number)) {
      this.checkIn = {
        stationNumber: this.selectedStation?.stationNumber,
        eventId: this.selectedEvent?.id,
        bib: this.checkinBib,
        timestamp: new Date()
      }
      this.checkInService.submitNewCheckIn(this.checkIn).subscribe(
        data => {
          this.checkIn!.id = data;
        }
      );
      this.checkIns.push(this.checkIn);
      this.checkinBib = undefined;
    }
  }

  validEntry(entry: number): boolean {
    if(this.entryValidationToggled)
      return this.validateEntry(entry);
    return true;
  }

  public validateEntry(checkIn: number): boolean {
    var result = true;
    var foundBib = false;
    this.participants.forEach( element => {
      if(element.bib === checkIn) {
        foundBib = true;
      }
    });

    if(foundBib) {
      this.checkIns.forEach(element => {
        if(element.bib === checkIn) {
          this.messageService.add({severity:'warn', summary: 'Notice', detail: 'Bib number has been logged for selected station', life: 3000});
          result = false;
        }
      });
    } else {
      this.messageService.add({severity:'warn', summary: 'Notice', detail: 'Bib number does not exist in participant list.', life: 3000});
      result = false;
    }

    return result;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key == "Enter"){
      this.postCheckIn();
    }
  }
}
