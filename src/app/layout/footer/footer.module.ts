import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';


const COMPONENTS = [
    FooterComponent
];
@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]

})
export class FooterModule { }
