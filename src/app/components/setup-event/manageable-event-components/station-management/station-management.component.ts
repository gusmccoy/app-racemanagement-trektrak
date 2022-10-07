import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Station } from 'src/app/model/station.model';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-station-management',
  templateUrl: './station-management.component.html',
  styleUrls: ['./station-management.component.css']
})
export class StationManagementComponent implements OnInit {

  constructor(private stationService: StationService, private messageService: MessageService) { }

  stations: Station[] = [];
  selectedStations: Station[] = [];
  uploadedFiles: any[] = [];

  submitted: boolean = false;
  stationDialog: boolean = false;
  editStationPanel: boolean = false;

  selectedEvent?: number;
  station: Station = {};

  ngOnInit(): void {
  }

  fetchStations(id: number) {
    this.selectedEvent = id;
    this.stationService.getAllStationsByEventId(this.selectedEvent as number)
      .subscribe(data => this.stations = data);
  }

  editStation(station: Station) {
    this.station = {...station};
    this.stationDialog = true;
  }

  deleteStation(station: Station) {
    this.stations = this.stations.filter(val => val.id !== station.id);
    this.stationService.deleteById(station.id as number);
  };

  openNew() {
    this.station = {};
    this.submitted = false;
    this.stationDialog = true;
  }

  hideDialog() {
    this.stationDialog = false;
    this.submitted = false;
  }

  saveStation() {
    this.submitted = true;
    if(this.station.id) {
      this.stations[this.findIndexById(this.station.id)] = this.station;
      this.stationService.updateStation(this.station);
      this.messageService.add({severity:'success', summary: 'Successful!', detail: 'Station Updated', life: 3000});
    
    } else {
      this.station.eventId = this.selectedEvent;
      this.stationService.submitNewStation(this.station).subscribe(
        data => {
          this.station.id = data;
        }
      );
      this.stations.push(this.station);
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Station Created!', life: 3000});
      this.stations = [...this.stations];
    }
    this.stationDialog = false;
    this.station = {};
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.stations.length; i++) {
        if (this.stations[i].id === id) {
          index = i;
          break;
        }
    }
    return index;
  }

  onUpload(event: any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

}
