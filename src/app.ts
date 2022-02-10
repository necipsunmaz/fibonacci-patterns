import { CartesianOptions } from './cartesian';
import FibonacciPattern from './fibonacci-pattern';

// Spiral
const spiralCanvas = document.getElementById('spiral') as HTMLCanvasElement;
let thetaCount = 2500;
let line = 1;
let spiralOptions = {
  maxApsis: 400,
  maxOrdinat: 400,
  brace: 50,
  margin: 50,
  scale: 1,
  lineFontSize: 18,
  lineFontType: 'Arial',
  drawDelay: 0,
  openLineInfo: true,
} as CartesianOptions;

const spiral = new FibonacciPattern(spiralCanvas, spiralOptions);
spiral.makeSpiral(thetaCount, line);

// Spiral Option Listeners
document.getElementById('drawSpiral')?.addEventListener('click', () => spiral.makeSpiral(thetaCount, line));
document.getElementById('thetaInput')?.addEventListener('input', event => (thetaCount = Number((event.target as HTMLInputElement).value)));
document
  .getElementById('spiralScale')
  ?.addEventListener('input', event => (spiralOptions.scale = Number((event.target as HTMLInputElement).value)));
document
  .getElementById('spiralDelay')
  ?.addEventListener('input', event => (spiralOptions.drawDelay = Number((event.target as HTMLInputElement).value)));
document
  .getElementById('spiralBracket')
  ?.addEventListener('input', event => (spiralOptions.openLineInfo = (event.target as HTMLInputElement).value == '1' ? true : false));
document.getElementById('spiralLine')?.addEventListener('input', event => (line = Number((event.target as HTMLInputElement).value)));

// Sunflower
const sunflowerCanvas = document.getElementById('sunflower') as HTMLCanvasElement;
let seedCount = 8000;
let sunflowerOptions = {
  maxApsis: 125,
  maxOrdinat: 125,
  brace: 25,
  margin: 350,
  scale: 2.5,
  lineFontSize: 12,
  lineFontType: 'Arial',
  drawDelay: 1,
  openLineInfo: true,
} as CartesianOptions;

const sunflower = new FibonacciPattern(sunflowerCanvas, sunflowerOptions);

// Sunflower Option Listeners
document.getElementById('drawSunflower')?.addEventListener('click', () => sunflower.makeSunflower(seedCount));
document.getElementById('seedInput')?.addEventListener('input', event => (seedCount = Number((event.target as HTMLInputElement).value)));
document
  .getElementById('sunflowerScale')
  ?.addEventListener('input', event => (sunflowerOptions.scale = Number((event.target as HTMLInputElement).value)));
document
  .getElementById('sunflowerDelay')
  ?.addEventListener('input', event => (sunflowerOptions.drawDelay = Number((event.target as HTMLInputElement).value)));
document
  .getElementById('sunflowerBracket')
  ?.addEventListener('input', event => (sunflowerOptions.openLineInfo = (event.target as HTMLInputElement).value == '1' ? true : false));
