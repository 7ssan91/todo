import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './task-form.component';
import { AppTranslationModule } from 'src/app/app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [TaskFormComponent],
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule
  ], exports: [
    TaskFormComponent
  ]
})
export class TaskFormModule { }
