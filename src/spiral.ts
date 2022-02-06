import { RADIANS } from './utils/math';

export interface SpiralCoordinate {
  theta: number;
  x: number;
  y: number;
}
const a: number = 0.001;
const b: number = 0.0053468;

export class Spiral {
  public coordinates: SpiralCoordinate[] = [];
  private _maxTheta: number;
  constructor(maxTheta: number) {
    this._maxTheta = maxTheta;
    this._spiral();
  }

  private _spiral() {
    for (let i = 0; i < this._maxTheta; i++) {
      this.coordinates.push({
        theta: i,
        x: a * Math.cos(RADIANS(i)) * Math.exp(b * i),
        y: a * Math.sin(RADIANS(i)) * Math.exp(b * i),
      } as SpiralCoordinate);
    }
  }
}
