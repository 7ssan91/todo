import { Injectable, Inject, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common'
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private rendererFactory: RendererFactory2, private title: Title,
    private meta: Meta, @Inject(DOCUMENT) private document,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  isBrowser() {
    if (isPlatformBrowser(this.platformId)) {

      return true;
    }
    if (isPlatformServer(this.platformId)) {
      return false;
    }
    return false;
  }
  addLanguageLink(isarabic) {
    try {

      const body = this.document.body;
      body.dir = isarabic ? 'rtl' : 'ltr';
      // body.classList = isarabic ? 'rtl' : 'ltr';

    } catch (e) {
      console.error('Error within linkService : ', e);
    }

  }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

}
