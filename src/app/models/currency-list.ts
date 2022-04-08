export class CurrencyList {
   public success: boolean;
   public symbols: {[key: string]: string};
 
   constructor(
     success: boolean,
     symbols: {[key: string]: string}) {
     this.success = success;
     this.symbols = symbols;
   }
}