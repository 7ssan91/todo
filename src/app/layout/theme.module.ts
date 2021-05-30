import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';
import { AppTranslationModule } from '../app.translation.module';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        NavbarModule,
        FooterModule,
        AppTranslationModule
    ],
    exports: [
        FooterModule,
        NavbarModule,

    ]
})
export class ThemeModule { }
