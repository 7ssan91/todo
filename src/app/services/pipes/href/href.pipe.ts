import { PipeTransform, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateStore } from '@ngx-translate/core';

@Pipe({ name: 'durl', pure: false })
export class URLPipe implements PipeTransform {
  constructor(private loc: TranslateStore, private acroute: Router) { }

  transform(url: string = '', current = false): string {
    var local = this.loc.currentLang;

    if (current) {
      if (local == 'en') {
        return this.acroute.url.replace('/en', '/ar');
      } else {
        return this.acroute.url.replace('/ar', '/en');
      }
    }
    if (local == 'en') {
      return 'en/' + url;
    } else {
      return 'ar/' + url;
    }
  }
}
