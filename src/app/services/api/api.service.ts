import { Injectable, Inject, Injector } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Params, ActivatedRoute } from '@angular/router';
import { ServerMode } from '../models/enums';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerOptionService } from '../base/server-option.service';
import { StorageService } from '../base/storage.service';

@Injectable()
export class APIService {
  _apiURI: string;
  _serverMode: ServerMode = ServerMode.Local;
  _headeroptions: HttpHeaders;
  _headeroptionsFiles: HttpHeaders;
  _accessToken = '';

  appversion = '1.0.0';

  constructor(
    private storage: StorageService,
    private http: HttpClient,
    private serop: ServerOptionService,
    private acroute: ActivatedRoute
  ) {
    serop.setServerMode();
    this.setAPiSettings(APIVS.V1);
    this.setaccessToken();
  }

  setAPiSettings(apivs: APIVS = APIVS.V1) {
    this.serop.setServerMode();
    this.setaccessToken();

    if (this.serop._baseurl.toLowerCase().indexOf('localhost') > 0) {
      this._apiURI = APILink.localv1;
      this._serverMode = ServerMode.Local;
    } else if (
      this.serop._baseurl.toLowerCase().indexOf('sandbox') > 0 ||
      this.serop._baseurl.toLowerCase().indexOf('beta') > 0
    ) {
      this._apiURI = APILink.betav1;
      this._serverMode = ServerMode.Beta;
    } else {
      this._apiURI = APILink.livev1;
      this._serverMode = ServerMode.Live;
    }
  }

  setaccessToken() {
    this._accessToken = this.storage.getAuthToken();
  }

  gethttpParms(params: Params): HttpParams {
    let paramsback: HttpParams = new HttpParams();
    if (params) {
      for (let property in params) {
        if (params.hasOwnProperty(property)) {
          paramsback = paramsback.append(property, params[property]);
        }
      }
    }

    return paramsback;
  }

  getFormData(parms: any): FormData {
    var form_data = new FormData();
    for (var key in parms) {
      form_data.append(key, parms[key]);
    }
    return form_data;
  }

  buildheaders(apivs: APIVS) {
    this.setAPiSettings(apivs);
    this.setaccessToken();
    let device = '2';
    let appvs = this.appversion;
    if (this.acroute.snapshot.queryParams.device) {
      device = this.acroute.snapshot.queryParams.device;
    }
    if (this.acroute.snapshot.queryParams.appversion) {
      appvs = this.acroute.snapshot.queryParams.appversion;
    }

  }

  build(method: Apimethods, ...extrereplace: string[]) {
    let methodstring = method.toString();
    if (extrereplace.length > 0) {
      methodstring = FormatString(methodstring, ...extrereplace);
    }
    return `${this._apiURI}${methodstring}`;
  }

  get<T>(
    apivs: APIVS, method: Apimethods, parms: any, ...extrereplace: string[]): Observable<T> {
    this.buildheaders(apivs);
    const options = {
      // headers: this._headeroptions,
      params: this.gethttpParms(parms),
    };
    return this.http.get<T>(this.build(method, ...extrereplace), options).pipe(
      map((data: T) => {
        return data;
      })
    );
  }

  post<T>(apivs: APIVS, method: Apimethods, isFormData: boolean, parms: any, ...extrereplace: string[]): Observable<T> {
    this.buildheaders(apivs);
    const options = {
      // headers: this._headeroptions
    };
    const body = isFormData ? this.getFormData(parms) : JSON.stringify(parms);
    return this.http
      .post<T>(this.build(method, ...extrereplace), body, options)
      .pipe(
        map((data: T) => {
          return data;
        })
      );
  }


  delete<T>(apivs: APIVS, method: Apimethods, parms: any, ...extrereplace: string[]): Observable<T> {
    this.buildheaders(apivs);
    const options = {
      // headers: this._headeroptions,
      params: this.gethttpParms(parms),
    };
    const body = JSON.stringify(parms);
    return this.http
      .delete<T>(this.build(method, ...extrereplace), options)
      .pipe(
        map((data: T) => {
          return data;
        })
      );
  }

  put<T>(apivs: APIVS, method: Apimethods, parms: any, ...extrereplace: string[]): Observable<T> {
    this.buildheaders(apivs);
    const options = {
      // headers: this._headeroptions
    };
    const body = JSON.stringify(parms);
    return this.http
      .put<T>(this.build(method, ...extrereplace), body, options)
      .pipe(
        map((data: T) => {
          return data;
        })
      );
  }
}

export enum APILink {
  livev1 = 'https://60b0b0101f26610017ffee8a.mockapi.io/api/v1/',
  betav1 = 'https://60b0b0101f26610017ffee8a.mockapi.io/api/v1/',
  localv1 = 'https://60b0b0101f26610017ffee8a.mockapi.io/api/v1/',
}

export enum APIVS {
  V1 = 1,
}

export enum Apimethods {
  // property api
  events = 'event',
  gettask = 'event/{0}/task',
  addTask = 'event/{0}/task',
  eventById = 'event/{0}',



  // cities = 'get/cities',
}

export function FormatString(str: string, ...val: string[]) {
  for (let index = 0; index < val.length; index++) {
    str = str.replace(`{${index}}`, val[index]);
  }
  return str;
}
