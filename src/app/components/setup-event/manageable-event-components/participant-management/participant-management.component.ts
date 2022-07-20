import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Participant } from 'src/app/model/participant.model';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-participant-management',
  templateUrl: './participant-management.component.html',
  styleUrls: ['./participant-management.component.css']
})
export class ParticipantManagementComponent implements OnInit {

  constructor(private participantService: ParticipantService, private messageService: MessageService) { }

  participants: Participant[] = [];
  selectedParticipants: Participant[] = [];

  submitted: boolean = false;
  participantDialog: boolean = false;
  editParticipantPanel: boolean = false;

  selectedEvent?: number;

  participant: Participant = {
    bib: 0,
    firstName: '',
    lastName: '',
    eventId: 0
  };

  ngOnInit(): void {
  }

  fetchParticipants(id: number) {
    this.selectedEvent = id;
    this.participantService.getAllParticipantsByEventId(this.selectedEvent as number)
      .subscribe(data => this.participants = data);
  }

  editParticipant(participant: Participant) {
    this.participant = {...participant};
  }

  deleteParticipant(participant: Participant) {
  };

  openNew() {
    this.participant = {
      bib: 0,
      firstName: '',
      lastName: '',
      eventId: 0
    };
    this.submitted = false;
    this.participantDialog = true;
  }

  hideDialog() {
    this.participantDialog = false;
    this.submitted = false;
  }

  saveParticipant() {
    this.submitted = true;

    if (this.participant.firstName.trim()) {
        //if (this.product.id) {
          //  this.products[this.findIndexById(this.product.id)] = this.product;
            //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        //}
        //else {
            //this.product.id = this.createId();
            this.participant.eventId = this.selectedEvent as number;
            this.participantService.submitNewParticipant(this.participant);
            this.participants.push(this.participant);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Participant Added!', life: 3000});
        //}

        this.participants = [...this.participants];
        this.participantDialog = false;
        this.participant = {
          bib: 0,
          firstName: '',
          lastName: '',
          eventId: 0
        };
    }
    this.participantDialog = false;
  }

}
