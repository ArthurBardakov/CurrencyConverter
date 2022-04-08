export class ConversionQuery {
   public from: string;
   public to: string;
   public amount: number;

   constructor(from: string, to: string, amount: number) {
      this.from = from;
      this.to = to;
      this.amount = amount;
   }
}
