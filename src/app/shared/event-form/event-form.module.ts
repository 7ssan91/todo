import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from './event-form.component';
import { AppTranslationModule } from 'src/app/app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TaskFormModule } from '../task-form/task-form.module';



@NgModule({
  declarations: [EventFormComponent],
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    TaskFormModule
  ],
  exports: [
    EventFormComponent
  ]
})
export class EventFormModule { }
