import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  submitNewEvent(newEventRequest : Event) : Observable<number> {
    return this.http.post<number>("https://www.gusmccoy.dev/ws_racemanagement_trektrak/event/new", 
      newEventRequest, this.httpOptions);
  }

  getAllEvents() : Observable<Event[]> {
    return this.http.get<Event[]>("https://www.gusmccoy.dev/ws_racemanagement_trektrak/event/all", this.httpOptions);
  }

  getAllEventsByUserId(userId: number) : Observable<Event[]> {
    return this.http.get<Event[]>(`https://www.gusmccoy.dev/ws_racemanagement_trektrak/event/all/${userId}`, this.httpOptions);
  }

  deleteById(id: number) {
    this.http.delete(`https://www.gusmccoy.dev/ws_racemanagement_trektrak/event/delete/${id}`, this.httpOptions).subscribe();
  }
}
