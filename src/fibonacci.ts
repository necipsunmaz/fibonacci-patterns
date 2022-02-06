export class Fibonacci {
  private _index: number;
  public phi: number = 0;
  public indexPhi: number[] = [];

  /**
   *
   */
  constructor(index: number) {
    this._index = index;
    this.calculatePhi();
  }

  public fibonacciSequences(sequence: number): number[] {
    let n1 = 0,
      n2 = 1,
      nextTerm: number;

    const fibonacciNumbers: number[] = [];
    nextTerm = n1 + n2;
    while (nextTerm <= sequence) {
      n1 = n2;
      n2 = nextTerm;
      nextTerm = n1 + n2;
      fibonacciNumbers.push(nextTerm);
    }

    return fibonacciNumbers;
  }

  public calculatePhi(): number {
    const numbers = this.fibonacciSequences(this._index);

    for (let i = 0; i < numbers.length; i++) {
      const ratio = numbers[i + 1] / numbers[i];
      this.indexPhi.push(ratio);
      this.phi = ratio;
    }

    return this.phi;
  }
}
