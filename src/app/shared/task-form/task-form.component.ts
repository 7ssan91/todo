import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from 'src/app/services/base/base.service';
import { EventModule, TaskModule } from 'src/app/services/models/models';
import { TodoService } from 'src/app/services/todo service/todo.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  addForm: FormGroup;
  dueDate: Date;
  event: EventModule = new EventModule();
  @Output('data') data: EventEmitter<TaskModule[]> = new EventEmitter<TaskModule[]>();
  tasks: TaskModule[] = []
  @Input('eventId') eventId: any;
  minDate = new Date()
  constructor(private formBuilder: FormBuilder, private todo: TodoService, public base: BaseService) { }
  initForm() {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      priority: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],

    });

  }
  //access to input
  get form() { return this.addForm.controls; }
  //add task to array
  addTask({ value, valid }: { value: TaskModule, valid: boolean }) {
    const index: number = this.tasks.indexOf(value);
    if (valid) {
      if (this.tasks.indexOf(value) === -1) {
        this.tasks.push(value);
        this.addForm.get('title').reset();
        this.addForm.get('priority').reset();
        this.addForm.get('startDate').reset();
        this.addForm.get('endDate').reset();
        // pass array of tasks to event 
        this.data.emit(this.tasks)
      }
    } else {
      (<any>Object).values(this.addForm.controls).forEach(control => {
        control.markAsTouched();

      });
    }
  }
  //remove task from array
  removeFromTasks(item) {
    const index: number = this.tasks.indexOf(item);
    this.tasks.splice(index, 1)
  }
  ngOnInit(): void {
    this.initForm();
  }

}
