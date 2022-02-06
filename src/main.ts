import FibonacciPattern from './fibonacci-pattern';

var canvas = document.querySelector('canvas') as HTMLCanvasElement;

var spiral = new FibonacciPattern(canvas);
spiral.makeSpiral(2400);
