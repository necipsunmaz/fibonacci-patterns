import { Cartesian, CartesianOptions } from './cartesian';
import { FibonacciPatternEvent } from './fibonacci-pattern-event';
import { Spiral } from './spiral';

export interface Options {
  cartesianOptions: CartesianOptions;
}

export default class FibonacciPattern extends FibonacciPatternEvent {
  private _options: Options;
  private _canvas: HTMLCanvasElement;
  private _cartesian: Cartesian;

  constructor(private canvas: HTMLCanvasElement, private options: Options = <Options>{}) {
    super();
    this._canvas = canvas;
    this._options = options;
    this._cartesian = new Cartesian(canvas, options.cartesianOptions || new CartesianOptions());
  }

  public makeSpiral(maxTheta: number) {
    const spiral = new Spiral(maxTheta);
    spiral.coordinates.forEach(coordinate => {
      this._cartesian.drawPoint(coordinate.x, coordinate.y, 2);
    });
  }
}
