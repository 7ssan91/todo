import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { BaseService } from 'src/app/services/base/base.service';
import { EventModule, TaskModule } from 'src/app/services/models/models';
import { TodoService } from 'src/app/services/todo service/todo.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  addForm: FormGroup;
  tasks: TaskModule[] = [];
  dueDate: Date;
  event: EventModule = new EventModule();
  @Output('getUpdate') getUpdate = new EventEmitter<any>();
  @Input('eventId') eventId: any;
  minDate = new Date()
  constructor(private formBuilder: FormBuilder, private todo: TodoService, public base: BaseService) { }
  addEvent({ value, valid }: { value: EventModule, valid: boolean }) {
    if (this.eventId == " ") {
      //add event
      if (valid) {
        this.todo.addEvent(value).subscribe((da: EventModule) => {
          if (da) {
            this.getEvents();
            this.eventId = da.id;
            this.tasks.forEach(el => {
              this.todo.addTask(el, this.eventId).subscribe((da) => {
              })
            })
          }

        })
      } else {
        (<any>Object).values(this.addForm.controls).forEach(control => {
          control.markAsTouched();
        });
      }
    } else {
      if (valid) {
        this.todo.updateEvent(value, this.eventId).subscribe((da) => {
          this.getEvents();
          this.tasks.forEach(el => {
            this.todo.addTask(el, this.eventId).subscribe((da) => {
              console.log(da);

            })
          })
        })
      }
    }


  }
  initForm() {
    this.addForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      dueDate: ['', [Validators.required]],

    });



  }
  //access to input
  get form() { return this.addForm.controls; }

  // get event by id
  getEventById(id) {
    this.todo.getEventById(id).subscribe((da) => {
      this.event = da;
      this.addForm.get('eventName').setValue(this.event.eventName)
      this.addForm.get('dueDate').setValue(dayjs(this.event.dueDate).format('DD-MM-YYYY'));

    })
  }
  //update after submit 
  getEvents() {
    this.todo.getEventList().subscribe((da: EventModule[]) => {
      this.getUpdate.emit(da)

    })
  }
  // get task from child task form 
  getTasksData(e) {
    this.tasks = e;
  }
  ngOnInit(): void {
    console.log(this.eventId);

    this.initForm();
    this.getEventById(this.eventId)
  }

}
