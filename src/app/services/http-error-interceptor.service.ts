import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { Observable, throwError } from 'rxjs';
 import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor() { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';

          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = error.error.message;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status},  Message: ${error.message}`;
          }

          console.log(errorMessage);
          return throwError(() => new Error(errorMessage));
        }));
  }
}
