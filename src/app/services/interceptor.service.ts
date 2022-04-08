import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private readonly fixerAPIHeaders: HttpHeaders;

  constructor(@Inject(APP_CONFIG) protected config: IAppConfig) {
    this.fixerAPIHeaders = new HttpHeaders({
      'X-RapidAPI-Host': 'fixer-fixer-currency-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '6f45bc2291msheaffc4acad25898p1c1f32jsn42d5b20a0e14'
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isCurrencyAPI(req.url)) {
      req = req.clone({headers: this.fixerAPIHeaders});      
    }
    
    return next.handle(req);
  }

  private isCurrencyAPI(url: string): boolean {
    return url.indexOf(this.config.fixerApiEndpoint) > -1;
  }
}
