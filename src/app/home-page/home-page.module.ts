import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AppTranslationModule } from '../app.translation.module';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { EventFormModule } from '../shared/event-form/event-form.module';

const routes: Routes = [
  { path: '', component: HomePageComponent }
]


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppTranslationModule,
    DialogModule,
    AccordionModule,
    EventFormModule,

  ]
})
export class HomePageModule { }
