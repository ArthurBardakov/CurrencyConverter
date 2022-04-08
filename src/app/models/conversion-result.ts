import { ConversionInfo } from "./conversion-info";
import { ConversionQuery } from "./conversion-query";

export class ConversionResult {
   public success: boolean;
   public query: ConversionQuery;
   public info: ConversionInfo;
   public date: Date;
   public result: number;

   constructor(
      success: boolean,
      query: ConversionQuery,
      info: ConversionInfo,
      date: Date,
      result: number) {
      this.success = success;
      this.query = query;
      this.info = info;
      this.date = date;
      this.result = result;
   }
}
