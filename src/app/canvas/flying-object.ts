export class FlyingObject {
   public x!: number;
   public y!: number;
   public vx!: number;
   public vy!: number;
   public color!: string;
   public a!: number;
   public fontSize!: number;
   public fontWeight!: string;
   public symbol!: string;

   constructor(args: {
      x: number, y: number,
      vx: number, vy: number,
      fontSize: number, fontWeight: string,
      color: string, a: number, symbol: string}) {
      Object.assign(this, args);
   }
}