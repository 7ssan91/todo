import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, APP_BASE_HREF } from '@angular/common';
import { CoreService } from './core.service';
import { ServerMode } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class ServerOptionService extends CoreService{
  public _baseurl: string = '';
  public appversion = '3.3.7';
  constructor(private injector: Injector, @Inject(PLATFORM_ID) private platformId: Object) {
    super();
    this.setServerMode();
}

setServerMode(fulllink: boolean = false) {
  if (this.isBrowser()) {
      this._baseurl = location.href.toString();
  } else {
      let requestObj = this.injector.get('SSRUrl');
      this._baseurl = requestObj.protocol + '://' + requestObj.get('host') + requestObj.baseUrl;
      if (fulllink) {
          this._baseurl += requestObj.url;
      }
  }

  if (this._baseurl.toLowerCase().indexOf("localhost") > 0) {
      this.currentServerMode = ServerMode.Local;
   } else {
      this.currentServerMode = ServerMode.Live;
  }

  // var local = this._baseurl.includes('/ar-') ? 'ar' : 'en';
  // this.setLocale(local);
}
isBrowser() {
  if (isPlatformBrowser(this.platformId)) {
      return true;
  }
  if (isPlatformServer(this.platformId)) {
      return false;
  }
  return false;
}

}
