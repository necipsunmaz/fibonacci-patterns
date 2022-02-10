import { Fibonacci } from './fibonacci';
import { RADIANS } from './utils/math';

export interface Seed {
  distance: number;
  theta: number;
  x: number;
  y: number;
}

export class SunFlower extends Fibonacci {
  private _numberOfSeed: number;

  constructor(numberOfSeed: number) {
    super();
    this._numberOfSeed = numberOfSeed;
    if (numberOfSeed < 1) {
      throw 'Parameters not accepted!';
    }
  }

  public createSeeds = () =>
    new Promise<Seed[]>(resolve => {
      this.calculatePhi(this._numberOfSeed / 10).then(phi => {
        const goldenAngle = 360 - 360 / phi;
        const seeds: Seed[] = [];
        for (let i = 0; i < this._numberOfSeed; i++) {
          const previousSeed = seeds[i - 1];
          const seed = {
            distance: Math.sqrt(i + 1),
            theta: previousSeed ? previousSeed.theta + goldenAngle : 0,
          } as Seed;

          seed.x = seed.distance * Math.cos(RADIANS(seed.theta));
          seed.y = seed.distance * Math.sin(RADIANS(seed.theta));

          seeds.push(seed);
        }

        resolve(seeds);
      });
    });
}
