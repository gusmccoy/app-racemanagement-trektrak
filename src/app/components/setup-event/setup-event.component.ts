import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CheckInManagementComponent } from './manageable-event-components/check-in-management/check-in-management.component';
import { EventManagementComponent } from './manageable-event-components/event-management/event-management.component';
import { ParticipantManagementComponent } from './manageable-event-components/participant-management/participant-management.component';
import { StationManagementComponent } from './manageable-event-components/station-management/station-management.component';
import { Event } from 'src/app/model/event.model';
import { EventService } from 'src/app/services/event.service';
import { LoginStatus } from 'src/app/static/login-status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-event',
  templateUrl: './setup-event.component.html',
  styleUrls: ['./setup-event.component.css']
})
export class SetupEventComponent implements OnInit {

  constructor(private eventService: EventService, private route: Router) { }

  @ViewChild(EventManagementComponent)
  private eventComponent!: EventManagementComponent;
  @ViewChild(ParticipantManagementComponent)
  private participantComponent!: ParticipantManagementComponent;
  @ViewChild(StationManagementComponent)
  private stationComponent!: StationManagementComponent;
  @ViewChild(CheckInManagementComponent)
  private checkInComponent!: CheckInManagementComponent;

  items: MenuItem[] = [];
  events: Event[] = [];

  selectedEvent!: Event;
  toggleEventDropdown: boolean = false;

  ngOnInit(): void {

    if(!LoginStatus.status) {
      LoginStatus.wasNavigatedToLogin = true;
      this.route.navigateByUrl('');
    }

    this.eventService.getAllEventsByUserId(LoginStatus.userId).subscribe(data => {
      this.events = data;
    });
    
    this.items = [
      {
        label: 'Events',
        icon: 'pi pi-calendar',
        command: () => this.toggleEditScreen("EVENT")
      },
      {
          label:'Partipicants',
          icon:'pi pi-users',
          command: () => this.toggleEditScreen("PARTICIPANT")
      },
      {
          label:'Stations',
          icon:'pi pi-flag',
          command: () => this.toggleEditScreen("STATION")
      },
      {
          label:'Check-Ins',
          icon:'pi pi-check-circle',
          command: () => this.toggleEditScreen("CHECKIN")
      },
    ];
  }

  toggleEditScreen(screen: string) {
    switch(screen) {
      case "PARTICIPANT": {
        this.participantComponent.editParticipantPanel = true;
        this.checkInComponent.editCheckInPanel = false;
        this.stationComponent.editStationPanel = false;
        this.eventComponent.editEventPanel = false;
        this.toggleEventDropdown = true;
        this.refetchEvents();
        break;
      }
      case "STATION": {
        this.stationComponent.editStationPanel = true;
        this.participantComponent.editParticipantPanel = false;
        this.checkInComponent.editCheckInPanel = false;
        this.eventComponent.editEventPanel = false;
        this.toggleEventDropdown = true;
        this.refetchEvents();
        break;
      }
      case "CHECKIN": {
        this.checkInComponent.editCheckInPanel = true;
        this.stationComponent.editStationPanel = false;
        this.participantComponent.editParticipantPanel = false;
        this.eventComponent.editEventPanel = false;
        this.toggleEventDropdown = true;
        this.refetchEvents();
        break;
      }
      case "EVENT": {
        this.eventComponent.editEventPanel = true;
        this.checkInComponent.editCheckInPanel = false;
        this.stationComponent.editStationPanel = false;
        this.participantComponent.editParticipantPanel = false;
        this.toggleEventDropdown = false;
        this.eventComponent.fetchEvents();
        break;
      }
    }
  }

  refetchEvents() {
    this.eventService.getAllEventsByUserId(LoginStatus.userId).subscribe(data => {
      this.events = data;
    });
  }

  broadcastSelection(event: any) {
    this.checkInComponent.selectedEvent = this.selectedEvent.id;
    this.participantComponent.selectedEvent = this.selectedEvent.id;
    this.stationComponent.selectedEvent = this.selectedEvent.id;

    this.participantComponent.fetchParticipants(this.selectedEvent.id as number);
    this.checkInComponent.fetchCheckIns(this.selectedEvent.id as number);
    this.stationComponent.fetchStations(this.selectedEvent.id as number );
  }

}

