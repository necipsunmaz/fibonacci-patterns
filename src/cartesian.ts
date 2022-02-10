export class CartesianOptions {
  maxApsis: number = 0;
  maxOrdinat: number = 0;
  margin: number = 50;
  brace: number = 50;
  scale: number = 1;
  drawDelay: number = 0;
  openLineInfo: boolean = true;
  lineFontSize: number = 18;
  lineFontType: string = 'Arial';
}

export class Cartesian {
  public _cartesianOptions: CartesianOptions;
  private _ctx: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;
  private _drawIntervals: any[] = [];

  constructor(private canvas: HTMLCanvasElement, options: CartesianOptions = new CartesianOptions()) {
    this._ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    this._cartesianOptions = options;
    this._width = Math.floor(canvas.width / 2);
    this._height = Math.floor(canvas.height / 2);
    if (!this._cartesianOptions.maxApsis || !this._cartesianOptions.maxOrdinat) {
      this._cartesianOptions.maxApsis = (this._width - this._cartesianOptions.margin) * this._cartesianOptions.scale;
      this._cartesianOptions.maxOrdinat = (this._height - this._cartesianOptions.margin) * this._cartesianOptions.scale;
    }

    this._createCartesian();
  }

  public drawPoint(x: number, y: number, diameter: number = 5, index: number = 0) {
    const interval = setInterval(() => {
      this._ctx.beginPath();
      this._ctx.arc(x, y, diameter, 0, Math.PI * 2, true);
      this._ctx.closePath();
      this._ctx.fill();
      clearInterval(interval);
    }, this._cartesianOptions.drawDelay * index);
    this._drawIntervals.push(interval);
  }

  public clear() {
    this._drawIntervals.forEach(interval => clearInterval(interval));
    this._drawIntervals = [];
    this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
    this._createCartesian();
  }

  private _createCartesian() {
    // Center
    this._ctx.translate(this._width, this._height);
    this._ctx.scale(this._cartesianOptions.scale, this._cartesianOptions.scale);

    // Add apsis brace of line
    if (this._cartesianOptions.openLineInfo) {
      this._addBraceInformation();
    }
  }

  private _addBraceInformation() {
    // Add apsis and ordinat line
    this._ctx.beginPath();
    this._ctx.moveTo(-this._cartesianOptions.maxApsis, 0);
    this._ctx.lineTo(this._cartesianOptions.maxApsis, 0);
    this._ctx.stroke();
    this._ctx.moveTo(0, -this._cartesianOptions.maxOrdinat);
    this._ctx.lineTo(0, this._cartesianOptions.maxOrdinat);
    this._ctx.stroke();

    // Add apsis and ordinat text
    this._ctx.font = this._generateFont();
    this._ctx.fillText('+x', this._cartesianOptions.maxApsis + 10, 5);
    this._ctx.fillText('-y', -5, this._cartesianOptions.maxOrdinat + 30);
    this._ctx.fillText('+y', -5, -(this._cartesianOptions.maxOrdinat + 20));
    this._ctx.fillText('-x', -(this._cartesianOptions.maxApsis + 30), 5);

    this._ctx.font = this._generateFont(this._cartesianOptions.lineFontSize / 2);

    const apsisBraceCount = Math.floor(this._cartesianOptions.maxApsis / this._cartesianOptions.brace);
    for (let i = 0; i < apsisBraceCount; i++) {
      const apsis = (i + 1) * this._cartesianOptions.brace;
      this._ctx.strokeRect(apsis, -4, 1, 9);
      this._ctx.fillText(apsis.toString(), apsis - 10, -10);
      this._ctx.strokeRect(-apsis, -4, 1, 9);
      this._ctx.fillText('-' + apsis.toString(), -apsis - 10, -10);
    }

    const ordinatBraceCount = Math.floor(this._cartesianOptions.maxOrdinat / this._cartesianOptions.brace);
    for (let i = 0; i < ordinatBraceCount; i++) {
      const ordinat = (i + 1) * this._cartesianOptions.brace;
      this._ctx.strokeRect(-4, ordinat, 9, 1);
      this._ctx.fillText(ordinat.toString(), 10, ordinat + 4);
      this._ctx.strokeRect(-4, -ordinat, 9, 1);
      this._ctx.fillText('-' + ordinat.toString(), 10, -ordinat + 4);
    }
  }

  private _generateFont(size: number = this._cartesianOptions.lineFontSize) {
    return `${size}px ${this._cartesianOptions.lineFontType}`;
  }
}
