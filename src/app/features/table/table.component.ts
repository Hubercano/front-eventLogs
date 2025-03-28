import { Component, inject } from '@angular/core';
import { EventsService } from '../../shared/services/events.service';
import { Event } from '../../shared/interfaces/event.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [
    JsonPipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  private eventsService = inject(EventsService)

  listEvents: Event[] = [];
  listTypes: string[] = ["update", "success", "error"];

  constructor () {
    this.filterType("","","")
  }

  filterType(type:string, startDate:string, endDate:string) {
    this.eventsService.getEvents(type, startDate, endDate).subscribe({
      next: (events) => {
        this.listEvents = events;
      },
      error: (error) => {
        console.error('Error al obtener los eventos:', error);
      }
    });
  }

  parce(e:any) {
    return JSON.parse(e)
  }

}
