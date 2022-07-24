import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckIn } from '../model/check-in.model';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private http: HttpClient) { }

  private baseUrl = "https://www.gusmccoy.dev/ws_racemanagement_trektrak/stationCheckIn";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  submitNewCheckIn(newStationRequest : CheckIn) : Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/new`, newStationRequest, this.httpOptions);
  }

  getAllCheckIns() : Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>(`${this.baseUrl}/all`, this.httpOptions);
  }

  getAllCheckInsByEventId(eventId: number) : Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>(`${this.baseUrl}/all/${eventId}`,
     this.httpOptions);
  }

  getAllCheckInsByEventAndStationId(eventId: number, stationId: number) : Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>(`${this.baseUrl}/all/${eventId}/${stationId}`,
     this.httpOptions);
  }

  deleteById(id: number) {
    this.http.delete(`${this.baseUrl}/delete/${id}`,
     this.httpOptions).subscribe();
  }

  updateCheckIn(updatedCheckin: CheckIn) {
    this.http.put(`${this.baseUrl}/update`, updatedCheckin, this.httpOptions).subscribe();
  }
}
