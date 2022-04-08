import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { FIXER_API_ENDPOINTS } from '../fixer-api-endpoints';
import { map, Observable, retry, shareReplay, tap } from 'rxjs';
import { CurrencyList } from '../models/currency-list';
import { ConversionResult } from '../models/conversion-result';

@Injectable({
  providedIn: 'root'
})
export class CurrencyAPIService {

  private readonly maxRetryAttempts: number;
  private retryAttempts: number;

  constructor(
    protected http: HttpClient,
    @Inject(APP_CONFIG) protected config: IAppConfig) {
      this.maxRetryAttempts = 1;
      this.retryAttempts = 0;
    }

  public GetCurrencyList(): Observable<{[key: string]: string}> {
    return this.http.get<CurrencyList>(
      this.config.fixerApiEndpoint + FIXER_API_ENDPOINTS.CURRENCIES)
      .pipe(
        map(cl => {
          if (!cl.success && this.canRetry)
            { throw cl; }
          return cl;
        }),
        retry(this.maxRetryAttempts),
        tap(cl => this.retryAttempts = 0),
        map(cl => cl.symbols),
        shareReplay()
      );
  }

  private get canRetry(): boolean {
    return this.retryAttempts++ < this.maxRetryAttempts;
  }

  public Convert(from: string, to: string, amount: number): Observable<number> {
    return this.http.get<ConversionResult>(
      this.config.fixerApiEndpoint + FIXER_API_ENDPOINTS.CONVERT,
      {
        params: {
          from: from,
          to: to,
          amount: amount.toString()
        }
      }
    ).pipe(
      map(cr => {
        if (!cr.success && this.canRetry)
          { throw cr; }
        return cr;
      }),
      retry(this.maxRetryAttempts),
      tap(cr => this.retryAttempts = 0),
      map(cr => cr.result)
    );
  }
}