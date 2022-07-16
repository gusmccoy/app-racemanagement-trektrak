import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CheckInManagementComponent } from './manageable-event-components/check-in-management/check-in-management.component';
import { EventManagementComponent } from './manageable-event-components/event-management/event-management.component';
import { ParticipantManagementComponent } from './manageable-event-components/participant-management/participant-management.component';
import { StationManagementComponent } from './manageable-event-components/station-management/station-management.component';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css']
})
export class ManageEventComponent implements OnInit {

  constructor() { }

  @ViewChild(EventManagementComponent)
  private eventComponent!: EventManagementComponent;

  @ViewChild(ParticipantManagementComponent)
  private participantComponent!: ParticipantManagementComponent;

  @ViewChild(StationManagementComponent)
  private stationComponent!: StationManagementComponent;

  @ViewChild(CheckInManagementComponent)
  private checkInComponent!: CheckInManagementComponent;

  items: MenuItem[] = [];

  ngOnInit(): void {

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
        break;
      }
      case "STATION": {
        this.stationComponent.editStationPanel = true;
        this.participantComponent.editParticipantPanel = false;
        this.checkInComponent.editCheckInPanel = false;
        this.eventComponent.editEventPanel = false;
        break;
      }
      case "CHECKIN": {
        this.checkInComponent.editCheckInPanel = true;
        this.stationComponent.editStationPanel = false;
        this.participantComponent.editParticipantPanel = false;
        this.eventComponent.editEventPanel = false;
        break;
      }
      case "EVENT": {
        this.eventComponent.editEventPanel = true;
        this.checkInComponent.editCheckInPanel = false;
        this.stationComponent.editStationPanel = false;
        this.participantComponent.editParticipantPanel = false;
        break;
      }
    }
  }

}

