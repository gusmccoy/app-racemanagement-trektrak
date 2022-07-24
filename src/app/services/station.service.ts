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

  submitNewStation(newStationRequest : Station) : Observable<number> {
    return this.http.post<number>("https://www.gusmccoy.dev/ws_racemanagement_trektrak/station/new", 
      newStationRequest, this.httpOptions);
  }

  getAllStations() : Observable<Station[]> {
    return this.http.get<Station[]>("https://www.gusmccoy.dev/ws_racemanagement_trektrak/station/all", this.httpOptions);
  }

  getAllStationsByEventId(eventId: number) : Observable<Station[]> {
    return this.http.get<Station[]>(`https://www.gusmccoy.dev/ws_racemanagement_trektrak/station/all/${eventId}`, this.httpOptions);
  }

  deleteById(id: number) {
    return this.http.delete(`https://www.gusmccoy.dev/ws_racemanagement_trektrak/station/delete/${id}`, this.httpOptions);
  }
}
