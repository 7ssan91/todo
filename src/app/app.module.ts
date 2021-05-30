import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpIterceptorProviders } from './services/interceptors';
import { APIService } from './services/api/api.service';
import { StorageService } from './services/base/storage.service';
import { SeoService } from './services/seo/seo.service';
import { BaseService } from './services/base/base.service';
import { ServerOptionService } from './services/base/server-option.service';
import { HttpErrorHandler } from './services/httperror.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './layout/theme.module';
import { EncryptHelper } from './services/base/encrypthelper.service';
import { RouterModule } from '@angular/router';
import { TodoService } from './services/todo service/todo.service';
import { AppTranslationModule } from './app.translation.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'todo-app' }),
    AppRoutingModule,
    ThemeModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    AppTranslationModule,
    TranslateModule,

  ],
  providers: [
    httpIterceptorProviders,
    APIService,
    StorageService,
    EncryptHelper,
    HttpErrorHandler,
    SeoService,
    BaseService,
    ServerOptionService,
    TodoService,
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    { provide: 'SessionStorage', useFactory: getSessionStorage },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getLocalStorage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}

export function getSessionStorage() {
  return typeof window !== 'undefined' ? window.sessionStorage : null;
}