export class Fibonacci {
  public fibonacciSequences = (n: number) =>
    new Promise<number[]>(resolve => {
      n = Math.floor(n);
      const fibonacciNumbers: number[] = [0, 1];
      while (fibonacciNumbers.length < n) {
        fibonacciNumbers.push(fibonacciNumbers[fibonacciNumbers.length - 2] + fibonacciNumbers[fibonacciNumbers.length - 1]);
      }

      resolve(fibonacciNumbers);
    });

  public calculatePhi = (n: number) =>
    new Promise<number>(resolve => {
      this.fibonacciSequences(n).then(numbers => {
        const phi = numbers[numbers.length - 1] / numbers[numbers.length - 2];
        resolve(phi);
      });
    });
}
