import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  private baseUrl = "https://www.gusmccoy.dev/ws_racemanagement_trektrak/event";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  submitNewEvent(newEventRequest : Event) : Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/new`, 
      newEventRequest, this.httpOptions);
  }

  getAllEvents() : Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/event/all`, this.httpOptions);
  }

  getAllEventsByUserId(userId: number) : Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/all/${userId}`, this.httpOptions);
  }

  deleteById(id: number) {
    this.http.delete(`${this.baseUrl}/delete/${id}`, this.httpOptions).subscribe();
  }

  updateEvent(updatedEvent: Event) {
    this.http.put(`${this.baseUrl}/update`, updatedEvent, this.httpOptions).subscribe();
  }
}
