import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppConfig, APP_CONFIG } from './app.config';
import { CurrencyAPIService } from './services/currency-api.service';
import { HttpErrorInterceptorService } from './services/http-error-interceptor.service';
import { InterceptorService } from './services/interceptor.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ConvertComponent } from './convert/convert.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConvertComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CurrencyAPIService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    {
      provide: APP_CONFIG,
      useValue: AppConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
