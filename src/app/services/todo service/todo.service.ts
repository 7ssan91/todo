import { Injectable } from '@angular/core';
import { Apimethods, APIService, APIVS } from '../api/api.service';
import { EventModule, TaskModule } from '../models/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private api: APIService) { };
  getEventList() {
    return this.api.get<EventModule[]>(APIVS.V1, Apimethods.events, {}).pipe(
      map((res: EventModule[]) => {
        return res
      })
    )
  }
  getTaskList(eventId) {
    return this.api.get<TaskModule[]>(APIVS.V1, Apimethods.gettask, {}, eventId).pipe(
      map((res: TaskModule[]) => {
        return res
      })
    )
  }
  getEventById(id) {
    return this.api.get<EventModule>(APIVS.V1, Apimethods.eventById, {}, id).pipe(
      map((res: EventModule) => {
        return res
      })
    )
  }
  addEvent(data) {
    return this.api.post<EventModule>(APIVS.V1, Apimethods.events, true, data).pipe(
      map((res: EventModule) => {
        return res
      })
    )
  }
  addTask(data, eventId) {
    return this.api.post<TaskModule[]>(APIVS.V1, Apimethods.addTask, true, data, eventId).pipe(
      map((res: TaskModule[]) => {
        return res
      })
    )
  }
  //update event
  updateEvent(data: EventModule, Id) {
    return this.api.put<any>(APIVS.V1, Apimethods.eventById, data, Id).pipe(
      map((res: any) => {
        return res
      }),
    );
  }
}
