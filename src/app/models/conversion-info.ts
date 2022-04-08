export class ConversionInfo {
   public timestamp: number;
   public rate: number;

   constructor(timestamp: number, rate: number) {
      this.timestamp = timestamp;
      this.rate = rate;
   }
}