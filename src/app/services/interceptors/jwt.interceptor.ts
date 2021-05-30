import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { StorageService } from './../base/storage.service';
import { catchError, map } from 'rxjs/operators';
const TOKEN_HEADER_KEY = 'Authorization';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  lang: string;

  constructor(private token: StorageService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.token.getAuthToken();
    if (this.router.url.includes('/en')) {
      this.lang = 'en'
    } else {
      this.lang = 'ar';
    }
    //send headers
    if (token != null && token != '') {
      request = request.clone({
        setHeaders: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'lang': this.lang,
        }
      });

    }
    else {
      request = request.clone({
        setHeaders: {
          // 'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          'lang': this.lang
        }

      });


    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => event), // pass further respone
      catchError((error: HttpErrorResponse) => {
        // here will be catched error from response, just check if its 401
        if (error && error.status == 401)
          console.log('error 401 handle')
        // then logout e.g. this.authService.logout()
        return throwError(error);
      }));

  }
}
