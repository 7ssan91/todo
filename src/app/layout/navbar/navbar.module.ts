import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppTranslationModule } from 'src/app/app.translation.module';
import { URLPipeModule } from 'src/app/services/pipes/href/href.module';


import { NavbarComponent } from './navbar.component';

const COMPONENTS = [
    NavbarComponent
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        AppTranslationModule,
        URLPipeModule
    ],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    providers: []
})
export class NavbarModule { }
