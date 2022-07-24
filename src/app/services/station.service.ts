import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../model/station.model';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) { }

  private baseUrl = "https://www.gusmccoy.dev/ws_racemanagement_trektrak/station";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  submitNewStation(newStationRequest : Station) : Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/new`, 
      newStationRequest, this.httpOptions);
  }

  getAllStations() : Observable<Station[]> {
    return this.http.get<Station[]>(`${this.baseUrl}/all`, this.httpOptions);
  }

  getAllStationsByEventId(eventId: number) : Observable<Station[]> {
    return this.http.get<Station[]>(`${this.baseUrl}/all/${eventId}`, this.httpOptions);
  }

  deleteById(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, this.httpOptions).subscribe();
  }

  updateStation(updatedStation: Station) {
    this.http.put(`${this.baseUrl}/update`, updatedStation, this.httpOptions).subscribe();
  }
}
