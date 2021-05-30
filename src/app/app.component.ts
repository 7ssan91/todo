import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BaseService } from './services/base/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'to-do';
  subzen: Subscription;

  constructor(
    public base: BaseService, private translate: TranslateService, public router: Router) { }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {

        if (this.subzen) this.subzen.unsubscribe();
        let url = evt.urlAfterRedirects.toLowerCase();
        this.base.Browserrefresh = !this.router.navigated;
        if (evt.urlAfterRedirects || (url.includes('?') && !url.includes('?id'))) {
          this.base.Browserrefresh = true;
        }

        if (url.includes('/ar')) {
          this.translate.use('ar');
          
          this.base.addStyle(true);
        } else {
          this.translate.use('en');
          this.base.addStyle(false);
        }
      }
    });

  }
}

