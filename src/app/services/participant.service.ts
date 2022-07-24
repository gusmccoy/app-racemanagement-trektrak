import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Participant } from '../model/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }

  private baseUrl = "https://www.gusmccoy.dev/ws_racemanagement_trektrak/participant";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  submitNewParticipant(newParticipantRequest : Participant) : Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/new`, 
      newParticipantRequest, this.httpOptions);
  }

  getAllParticipants() : Observable<Participant[]> {
    return this.http.get<Participant[]>(`${this.baseUrl}/all`, this.httpOptions);
  }

  getAllParticipantsByEventId(eventId: number) : Observable<Participant[]> {
    return this.http.get<Participant[]>(`${this.baseUrl}/all/${eventId}`, this.httpOptions);
  }

  deleteById(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, this.httpOptions)
      .subscribe();
  }

  updateParticipant(updatedParticipant: Participant) {
    this.http.put(`${this.baseUrl}/update`, updatedParticipant, this.httpOptions).subscribe();
  }
}
