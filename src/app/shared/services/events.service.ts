import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Event } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private http = inject(HttpClient)

  createEvents(data:Event) {
    return this.http.post("http://localhost:3000/events", data)
  }

  getEvents(typeEvent:string, startDate:string, endDate:string) {
    return this.http.get<Event[]>(`http://localhost:3000/events?typeEvent=${typeEvent}&startDate=${startDate}&endDate=${endDate}`)
  }
}
