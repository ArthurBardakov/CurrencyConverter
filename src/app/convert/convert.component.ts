import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CurrencyAPIService } from '../services/currency-api.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})
export class ConvertComponent implements OnInit {

  public CurrencyList$!: Observable<{[key: string]: string}>;
  private readonly defaultFromCrc: string;
  private readonly defaultToCrc: string;
  private readonly defaultAmount: number;
  public FromCurrency: string;
  public FromValue$!: Observable<number>;
  public ToCurrency: string;
  public ToValue$!: Observable<number>;

  constructor(private currencySrc: CurrencyAPIService) {
    this.defaultFromCrc = 'EUR';
    this.FromCurrency = this.defaultFromCrc;
    this.defaultToCrc = 'USD';
    this.ToCurrency = this.defaultToCrc;
    this.defaultAmount = 1;
  }

  ngOnInit(): void {
    this.CurrencyList$ = this.currencySrc.GetCurrencyList();
    this.FromValue$ = of(this.defaultAmount);
    this.ToValue$ = this.currencySrc.Convert(
      this.defaultFromCrc,
      this.defaultToCrc,
      this.defaultAmount);
  }

  public Convert(value: string, forward: boolean): void {
    const amount = (+value);
    if (amount === 0) return;
    console.log(amount);
    console.log(forward);
    
    const from = forward ? this.FromCurrency : this.ToCurrency;
    const to = forward ? this.ToCurrency : this.FromCurrency;
    const value$ = this.currencySrc.Convert(from, to, amount);
    if(forward) { this.ToValue$ = value$; }
    else { this.FromValue$ = value$; }
  }
}
