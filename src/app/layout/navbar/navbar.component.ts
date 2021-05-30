import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  selectedLang: string = 'en';

  constructor(public base: BaseService, public router: Router, public translate: TranslateService) { }

  ngOnInit(): void {
    
  }

}
