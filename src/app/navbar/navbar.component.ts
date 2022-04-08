import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyAPIService } from '../services/currency-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public UAH_TO_USD!: Observable<number>;
  public UAH_TO_EUR!: Observable<number>;

  constructor(private currencySrc: CurrencyAPIService) { }

  ngOnInit(): void {
    this.UAH_TO_USD = this.currencySrc.Convert('USD', 'UAH', 1);
    this.UAH_TO_EUR = this.currencySrc.Convert('EUR', 'UAH', 1);
  }
}
