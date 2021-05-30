import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { SeoService } from '../seo/seo.service';
import { ServerOptionService } from './server-option.service';
import { StorageService } from './storage.service';
// import * as dayjs from 'dayjs'
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  Browserrefresh: boolean = false;
  imgUrI = 'https://msaaken.asdevs.com/storage/';

  constructor(private core: CoreService, private seo: SeoService, public serop: ServerOptionService, public store: StorageService, private trans: TranslateService) { }
  isMobile() {
    var ua = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
      return true;
    } else {
      return false
    }
  }

  translate(value) {
    return this.trans.instant(value);
  }
  getlocal() {
    return console.log(this.core.local);//= value this.$locale.getValue();
  }
  translateString(en: string = '', ar: string = '') {
    if (this.trans.currentLang == 'en') {
      return en;
    }
    else
      return ar;
  }
  addStyle(isarabic = false) {
    this.seo.addLanguageLink(isarabic);
  }

  getRouteUrl(to) {
    this.serop.setServerMode();
    let isArabic = this.serop._baseurl.includes('/ar');
    let route = '';
    route = this.routeSwitch(isArabic, 1);
    return route + to;
  }

  getrouterlink(to) {
    let link = this.getRouteUrl(to);
    return [link];
  }

  routeSwitch(isArabic, Id) {
    let route = '';
    switch (Id) {
      case 1:
        route = isArabic ? '/ar' : '/en';
        break;
      default:
        route = isArabic ? '/ar' : '/en';
        break;
    }
    return route;
  }

  getBaseURL() {
    if (this.serop.isBrowser()) {
      return window.location.origin + this.getrouterlink('/')[0];

    }

  }
  // getRedirectLocalURL() {
  //   let route = '';
  //   let after = '';
  //   this.serop.setServerMode(true);

  //   after = this.serop._baseurl.split(this.translate('/en', '/ar'))[1];
  //   route = this.translate('/ar', '/en') + (after ?? '');
  //   return route;
  // }


  isLoggedIn() {
    return this.store.isLoggedIn();
  }



 













  rad(x) {
    return x * Math.PI / 180;
  };




}
