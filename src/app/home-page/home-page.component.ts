import { Component, OnInit } from '@angular/core';
import { EventModule, TaskModule } from '../services/models/models';
import { TodoService } from '../services/todo service/todo.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  display: boolean = false;
  eventList: EventModule[] = [];
  taskList: TaskModule[] = [];
  eventId: any;
  constructor(private todo: TodoService) { }
  eventAction(id) {
    console.log(id);
    this.eventId = id
    this.display = true;
  }
  //get events
  getEvents() {
    this.todo.getEventList().subscribe((da: EventModule[]) => {
      this.eventList = da

    })
  }
  //get tasks
  getTasks(id) {
    this.todo.getTaskList(id).subscribe((da: TaskModule[]) => {
      this.taskList = da

    })
  }
  //get update on add or edit
  getUpdate(updatedEvent) {
    this.eventList = updatedEvent;
    this.display = false;
  }



  //edit event 
  ngOnInit(): void {
    this.getEvents();

  }

}
