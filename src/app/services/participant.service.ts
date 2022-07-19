import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Participant } from '../model/participant.model';
import { LoginStatus } from '../static/login-status';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  submitNewParticipant(newParticipantRequest : Participant) : void {
    this.http.post<Participant>("https://www.gusmccoy.dev/ws_racemanagement_trektrak/participant/new", 
    newParticipantRequest, this.httpOptions).subscribe();
  }

  getAllParticipants() : Observable<Participant[]> {
    return this.http.get<Participant[]>("https://www.gusmccoy.dev/ws_racemanagement_trektrak/participant/all", this.httpOptions);
  }

  getAllParticipantsByEventId(eventId: number) : Observable<Participant[]> {
    return this.http.get<Participant[]>(`https://www.gusmccoy.dev/ws_racemanagement_trektrak/participant/all/${eventId}`, this.httpOptions);
  }
}
