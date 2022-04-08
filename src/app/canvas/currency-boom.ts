import { MathExt } from "../utils/math-ext";
import { Utils } from "../utils/utils";
import { FlyingObject } from "./flying-object";

export class CurrencyBoom {

   private readonly canvas: HTMLCanvasElement;
   private readonly ctx: CanvasRenderingContext2D;
   private readonly symbols: string[];
   private readonly flyingObjs: FlyingObject[];

   constructor(
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.symbols = ['؋', '$', 'ƒ', '₼', 'R$', '៛', '¥', '₡',
         '₱', '£', '¢', '£', '₹', '﷼'];
      this.flyingObjs = [];
      this.initObjects();      
   }

   private initObjects(): void {
      const foLen = 250;

      for (let i = 0; i < foLen; i++) {
         this.flyingObjs.push(new FlyingObject({
            x: MathExt.RandomInt(0, this.canvas.width),
            y: MathExt.RandomInt(0, this.canvas.height),
            vx: MathExt.RandomInt(-1, 1),
            vy: MathExt.RandomInt(-1, 1),
            color: Utils.RandomRGBA(0.1, 0.7),
            symbol: this.symbols[Math.floor(Math.random() * this.symbols.length)],
            fontSize: MathExt.RandomInt(10, 35),
            fontWeight: MathExt.RandomInt(50, 100).toString(),
            a: MathExt.RandomFloat(0.1, 0.8)
         }));
      }
   }

   public Draw(): void {
      this.ctx.globalCompositeOperation = "destination-over";
      this.ctx.globalAlpha = 1;
      this.ctx.save();
   
      this.flyingObjs.forEach(fo => {
         this.ctx.font = '100 ' + fo.fontSize + 'px bt_mono';
         this.ctx.fillText(fo.symbol, fo.x, fo.y);
         this.ctx.restore();
         this.ctx.fillStyle = fo.color;
         fo.x += fo.vx;
         fo.y += fo.vy;
         fo.vx *= 0.99;
         fo.vy *= 0.99;
      });
   }
}
