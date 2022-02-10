import { Cartesian, CartesianOptions } from './cartesian';
import { Spiral } from './spiral';
import { SunFlower } from './sunflower';
export default class FibonacciPattern extends Cartesian {
  constructor(canvas: HTMLCanvasElement, cartesianOptions: CartesianOptions = new CartesianOptions()) {
    super(canvas, cartesianOptions);
  }

  public makeSpiral(maxTheta: number, line: number) {
    this.clear();
    new Spiral(maxTheta, line).createCoordinate().then(coordinates => {
      coordinates.forEach((coordinate, i) => {
        this.drawPoint(coordinate.x, coordinate.y, 2, i);
      });
    });
  }

  public makeSunflower(seed: number) {
    this.clear();
    new SunFlower(seed).createSeeds().then(seeds => {
      seeds.forEach((seed, i) => {
        this.drawPoint(seed.x, seed.y, 0.7, i);
      });
    });
  }
}
