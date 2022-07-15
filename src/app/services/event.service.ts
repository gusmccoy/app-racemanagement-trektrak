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

  submitNewEvent(newEventRequest : Event) : void {
    this.http.post<Event>("https://www.gusmccoy.dev/ws_racemanagement_trektrak/event/new", 
      newEventRequest, this.httpOptions).subscribe();
  }
}
