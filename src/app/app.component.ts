import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CurrencyBoom } from './canvas/currency-boom';
import { CurrencyAPIService } from './services/currency-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('grid') public grid!: ElementRef<HTMLElement>;
  @ViewChild('currency_boom') public currencyBoom!: ElementRef<HTMLElement>;
  public title = 'Currency Converter';

  constructor(private currencySrc: CurrencyAPIService) {}

  async ngAfterViewInit(): Promise<void> {
    const canvas = this.currencyBoom.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const gridEl = this.grid.nativeElement as HTMLElement;
    const gridStyle = getComputedStyle(gridEl);
    const gwidth = Math.round(+gridStyle.width.replace('px', ''));
    const gheight = Math.round(+gridStyle.height.replace('px', ''));
    canvas.width = gwidth;
    canvas.height = gheight;
    const cl = await firstValueFrom(this.currencySrc.GetCurrencyList());
    const ccodes = Object.keys(cl);
    const cb = new CurrencyBoom(canvas, ctx, ccodes);
    cb.Draw();
  }
}
