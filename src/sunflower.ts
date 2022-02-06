import { Fibonacci } from './fibonacci';
import { RADIANS } from './utils/math';

export interface Seed {
  distance: number;
  theta: number;
  x: number;
  y: number;
}

export class SunFlower {
  public numberOfSeed: number;
  public goldenAngle: number = 0;
  public fibonacci: Fibonacci;
  public seeds: Seed[] = [];

  constructor(numberOfSeed: number) {
    this.numberOfSeed = numberOfSeed;
    this.fibonacci = new Fibonacci(numberOfSeed);
  }

  public calculateGoldenAngle() {
    this.goldenAngle = 360 - 360 / this.fibonacci.phi;
  }

  public flower() {
    this.calculateGoldenAngle();
    for (let i = 0; i < this.numberOfSeed; i++) {
      const previousSeed = this.seeds[i - 1];
      const seed = {
        distance: Math.sqrt(i + 1),
        theta: previousSeed ? previousSeed.theta + this.goldenAngle : 0,
      } as Seed;

      seed.x = seed.distance * Math.cos(RADIANS(seed.theta));
      seed.y = seed.distance * Math.sin(RADIANS(seed.theta));

      this.seeds.push(seed);
    }
  }
}
