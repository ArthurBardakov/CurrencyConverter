import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CurrencyBoom } from './canvas/currency-boom';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('grid') public grid!: ElementRef<HTMLElement>;
  @ViewChild('currency_boom') public currencyBoom!: ElementRef<HTMLElement>;
  public title = 'Currency Converter';

  constructor() {}

  ngAfterViewInit() {
    const canvas = this.currencyBoom.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const gridEl = this.grid.nativeElement as HTMLElement;
    const gridStyle = getComputedStyle(gridEl);
    const gwidth = Math.round(+gridStyle.width.replace('px', ''));
    const gheight = Math.round(+gridStyle.height.replace('px', ''));
    canvas.width = gwidth;
    canvas.height = gheight;
    const cb = new CurrencyBoom(canvas, ctx);
    cb.Draw();
  }
}
