import { Injectable, Inject } from '@angular/core';
import { StorageWTime } from '../models/enums';
import { EncryptHelper } from './encrypthelper.service';
import { ServerOptionService } from './server-option.service';
import * as dayjs from 'dayjs'

@Injectable()
export class StorageService {
  className = 'StorageService';


  constructor(@Inject('LOCALSTORAGE') private localStorage: any, @Inject('SessionStorage') private sessionStorage: any,
    public enc: EncryptHelper, private serop: ServerOptionService) {

  }


  setUser() {

  }


  getAuthToken() {
    let token = this.getTimeStamp<string>(StorageID.UserAuthToken);
    return token.HasValue ? token.Data : '';
  }


  isLoggedIn() {
    let token = this.getTimeStamp<string>(StorageID.UserAuthToken);
    if (!token.HasValue) {
      this.clearAll();
    }
    return token.HasValue;
  }



  set(storagetype: StorageType, Id: StorageID, Data: any, encrypt: boolean = true) {
    if (this.serop.isBrowser()) {
      if (encrypt) {
        Data = this.enc.encrypt(Data);
      }
      if (storagetype == StorageType.LOCALSTORAGE) {
        this.localStorage.setItem(Id, Data);
      } else {
        this.sessionStorage.setItem(Id, Data);
      }
    }
  }



  get(storagetype: StorageType, Id: StorageID, decrypt: boolean = true): any {
    let Data: any = '';
    if (this.serop.isBrowser()) {
      if (storagetype == StorageType.LOCALSTORAGE) {
        if (!!this.localStorage.getItem(Id)) {
          Data = this.localStorage.getItem(Id);
          if (decrypt) {
            Data = this.enc.decrypt(Data);
          }
        }
      } else if (storagetype == StorageType.SessionStorage) {
        if (!!this.sessionStorage.getItem(Id)) {
          Data = this.sessionStorage.getItem(Id);
          if (decrypt) {
            Data = this.enc.decrypt(Data);
          }
        }
      } else {
        if (!!this.localStorage.getItem(Id)) {
          Data = this.localStorage.getItem(Id);
          if (decrypt) {
            Data = this.enc.decrypt(Data);
          }
        } else if (!!this.sessionStorage.getItem(Id)) {
          Data = this.sessionStorage.getItem(Id);
          if (decrypt) {
            Data = this.enc.decrypt(Data);
          }
        }
      }
    }
    return Data;
  }

  clearAll() {
    if (this.serop.isBrowser()) {

      localStorage.removeItem(StorageID.UserAuthToken);
      localStorage.removeItem(StorageID.UserInfo);
    }
  }


  setWithTimeStamp<T>(Id: StorageID, Data: any, expireminutes: number = 500) {
    if (this.serop.isBrowser()) {
      let result: StorageWTime<T> = new StorageWTime<T>();
      result.Data = Data;
      result.expireDate = this.gDate(new Date(), expireminutes);
      let Fresult = this.enc.encrypt(JSON.stringify(result));
      this.localStorage.setItem(Id, Fresult);

    } else {
    }
  }


  getTimeStamp<T>(Id: StorageID): StorageWTime<T> {
    let back: StorageWTime<T> = new StorageWTime<T>();

    if (this.serop.isBrowser()) {
      let data = this.localStorage.getItem(Id);
      if (!!data) {
        let result = (JSON.parse(this.enc.decrypt(data)) as StorageWTime<T>);
        const now = new Date();
        if (now < this.gDate(result.expireDate)) {
          result.HasValue = true;
          return result;
        }
      }

    }
    return back;
  }

  gDate(date: Date, addMinutes = 0) {
    let back = dayjs(date).add(addMinutes, 'm').toDate();
    return back;
  }

}

export enum StorageType {
  LOCALSTORAGE = 'LOCALSTORAGE',
  SessionStorage = 'LOCALSTORAGE',
  Both = 'LOCALSTORAGE'
}

export enum StorageID {
  UserAuthToken = 'auth-token',
  UserInfo = 'auth-user'
}
