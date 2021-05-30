import { Injectable } from '@angular/core';
// import { HandleError } from '../httperror.service';
import { ServerMode } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  public local: string = 'en';
  private _allowlog: boolean = true;
  // public handleError: HandleError;

  public currentServerMode: ServerMode = ServerMode.Local;

  constructor() { }
  log(e, location = '') {
    if (this._allowlog) {
        console.log('----------------------- Log from ' + location + ' --------------------------');
        console.log(e);
    }
}
}
