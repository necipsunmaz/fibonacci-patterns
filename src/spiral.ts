import { Fibonacci } from './fibonacci';
import { RADIANS } from './utils/math';

export interface SpiralCoordinate {
  theta: number;
  x: number;
  y: number;
}
const a: number = 0.001;
const b: number = 0.0053468;

export class Spiral extends Fibonacci {
  private _maxTheta: number;
  private _line: number;
  constructor(maxTheta: number, line: number = 1) {
    super();
    if (maxTheta < 0 || line < 1) {
      throw 'Parameters not accepted!';
    }
    this._maxTheta = maxTheta;
    this._line = line;
  }

  public createCoordinate = () =>
    new Promise<SpiralCoordinate[]>(resolve => {
      const coordinates: SpiralCoordinate[] = [];
      for (let line = 1; line <= this._line; line++) {
        for (let i = 0; i < this._maxTheta; i++) {
          coordinates.push(this._calculate(i, line));
        }
      }

      resolve(coordinates);
    });

  private _calculate = (i: number, line: number = 1) => {
    return {
      theta: i,
      x: a * Math.cos(RADIANS(i)) * Math.exp(b * i) * line,
      y: a * Math.sin(RADIANS(i)) * Math.exp(b * i) * line,
    } as SpiralCoordinate;
  };
}
