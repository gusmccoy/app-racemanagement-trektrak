import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';
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

  submitted: boolean = false;

  stationDialog: boolean = false;

  selectedEvent?: number;

  station: Station = {
    stationNumber: 0,
    name: ''
  };

  selectedStations: Station[] = [];

  editStationPanel: boolean = false;

  ngOnInit(): void {
  }

  fetchStations(id: number) {
    this.selectedEvent = id;
    this.stationService.getAllStationsByEventId(this.selectedEvent as number)
      .subscribe(data => this.stations = data);
  }

  editStation(station: Station) {
    this.station = {...station};
  }

  deleteStation(station: Station) {

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
        //if (this.product.id) {
          //  this.products[this.findIndexById(this.product.id)] = this.product;
            //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        //}
        //else {
            //this.product.id = this.createId();
            this.station.eventId = this.selectedEvent;
            this.stationService.submitNewStation(this.station);
            this.stations.push(this.station);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Station Created!', life: 3000});
        //}

        this.stations = [...this.stations];
        this.stationDialog = false;
        this.station = {};
  }

}
