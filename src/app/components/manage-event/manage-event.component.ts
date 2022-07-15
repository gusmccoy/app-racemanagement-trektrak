import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Participant } from 'src/app/model/participant.model';
import { ParticipantService } from 'src/app/services/participant.service';
import { CheckInManagementComponent } from './manageable-event-components/check-in-management/check-in-management.component';
import { ParticipantManagementComponent } from './manageable-event-components/participant-management/participant-management.component';
import { StationManagementComponent } from './manageable-event-components/station-management/station-management.component';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css']
})
export class ManageEventComponent implements OnInit {

  constructor(private participantService: ParticipantService) { }

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
      }
    ];
  }

  toggleEditScreen(screen: string) {
    switch(screen) {
      case "PARTICIPANT": {
        this.participantComponent.editParticipantPanel = true;
        this.checkInComponent.editCheckInPanel = false;
        this.stationComponent.editStationPanel = false;
        break;
      }
      case "STATION": {
        this.stationComponent.editStationPanel = true;
        this.participantComponent.editParticipantPanel = false;
        this.checkInComponent.editCheckInPanel = false;
        break;
      }
      case "CHECKIN": {
        this.checkInComponent.editCheckInPanel = true;
        this.stationComponent.editStationPanel = false;
        this.participantComponent.editParticipantPanel = false;
        break;
      }
    }
  }

}

