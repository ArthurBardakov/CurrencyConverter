export class MathExt {

   public static Randomise<T>(arr: T[]): T[] {
      return arr.map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
   }

   public static RandomFloat(min: number, max: number, floats: number = 2): number {
      return +(Math.random() * (min - max) + max).toFixed(floats);
   }

   public static RandomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min);
   }
}