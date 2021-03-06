import { NgModule } from '@angular/core';
import {
  TranslateModule,
  TranslateLoader,
  TranslateStore,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    // TranslateModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],

      },
      isolate: false
    }),
  ],
  providers: [TranslateService, TranslateStore],
  exports: [TranslateModule],
})
export class AppTranslationModule { }

