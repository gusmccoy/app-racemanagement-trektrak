import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../model/station.model';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  submitNewStation(newStationRequest : Station) : void {
    this.http.post<Station>("https://www.gusmccoy.dev/ws_racemanagement_trektrak/station/new", 
    newStationRequest, this.httpOptions).subscribe();
  }

  getAllStations() : Observable<Station[]> {
    return this.http.get<Station[]>("https://www.gusmccoy.dev/ws_racemanagement_trektrak/station/all", this.httpOptions);
  }

  getAllStationsByEventId(eventId: number) : Observable<Station[]> {
    return this.http.get<Station[]>(`https://www.gusmccoy.dev/ws_racemanagement_trektrak/station/all/${eventId}`, this.httpOptions);
  }
}
