import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckIn } from '../model/check-in.model';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  submitNewCheckIn(newStationRequest : CheckIn) : void {
    this.http.post<CheckIn>("https://www.gusmccoy.dev/ws_racemanagement_trektrak/stationCheckIn/new", 
    newStationRequest, this.httpOptions).subscribe();
  }

  getAllCheckIns() : Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>("https://www.gusmccoy.dev/ws_racemanagement_trektrak/stationCheckIn/all", this.httpOptions);
  }

  getAllCheckInsByEventId(eventId: number) : Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>(`https://www.gusmccoy.dev/ws_racemanagement_trektrak/stationCheckIn/all/${eventId}`,
     this.httpOptions);
  }

  getAllCheckInsByEventAndStationId(eventId: number, stationId: number) : Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>(`https://www.gusmccoy.dev/ws_racemanagement_trektrak/stationCheckIn/all/${eventId}/${stationId}`,
     this.httpOptions);
  }
}
