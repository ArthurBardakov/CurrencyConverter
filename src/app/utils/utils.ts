import { MathExt } from "./math-ext";

export class Utils {

   public static get RandLightColor() {
      return 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
   }
  
   public static get RandomColor() {
      const color = Math.floor(0x1000000 * Math.abs(Math.random() - 0.5)).toString(16);
      return '#' + ('000000' + color).slice(-6);
   }

   public static RandomRGBA(aFrom: number = 0.1, aTo: number = 0.9) {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      const a = MathExt.RandomFloat(aFrom, aTo);
      return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + a + ')';
   }
}