export class CartesianOptions {
  width: number = 400;
  height: number = 400;
  maxApsis: number = 0;
  maxOrdinat: number = 0;
  margin: number = 50;
  brace: number = 50;
  openBraceInfo: boolean = true;
  lineFontSize: number = 18;
  lineFontType: string = 'Arial';
}

export class CartesianDot {
  dotWidth: number = 2;
  dotColor: string = '#000';
  x: number = 0;
  y: number = 0;
}

export class Cartesian {
  options: CartesianOptions;
  private _ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement, options: CartesianOptions = new CartesianOptions()) {
    this._ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    this.options = options;
    this.options.maxApsis = this.options.width - this.options.margin;
    this.options.maxOrdinat = this.options.height - this.options.margin;

    this._createCartesian();
  }

  public drawPoint(x: number, y: number, diameter: number = 5) {
    this._ctx.beginPath();
    this._ctx.arc(x, y, diameter, 0, Math.PI * 2, true);
    this._ctx.closePath();
    this._ctx.fill();
  }

  private _createCartesian() {
    // Center
    this._ctx.translate(this.options.width, this.options.height);

    // Add apsis and ordinat line
    this._ctx.beginPath();
    this._ctx.moveTo(-this.options.maxApsis, 0);
    this._ctx.lineTo(this.options.maxApsis, 0);
    this._ctx.stroke();
    this._ctx.moveTo(0, -this.options.maxOrdinat);
    this._ctx.lineTo(0, this.options.maxOrdinat);
    this._ctx.stroke();

    // Add apsis and ordinat text
    const fillTextMargin = Math.round(this.options.margin * 0.4);
    this._ctx.font = this._generateFont();
    this._ctx.fillText('+ x', this.options.maxApsis + fillTextMargin, 5);
    this._ctx.fillText('- y', -5, this.options.maxOrdinat + fillTextMargin);
    this._ctx.fillText('+ y', -5, -(this.options.maxOrdinat + fillTextMargin));
    this._ctx.fillText('- x', -(this.options.maxApsis + this.options.margin * 0.65), 5);

    // Add apsis brace of line
    if (this.options.openBraceInfo) {
      this._addBraceInformation();
    }
  }

  private _addBraceInformation() {
    this._ctx.font = this._generateFont(this.options.lineFontSize / 2);

    const apsisBraceCount = Math.round(this.options.maxApsis / this.options.brace);
    for (let i = 0; i < apsisBraceCount; i++) {
      const apsis = (i + 1) * this.options.brace;
      this._ctx.strokeRect(apsis, -4, 1, 9);
      this._ctx.fillText(apsis.toString(), apsis - 10, -10);
      this._ctx.strokeRect(-apsis, -4, 1, 9);
      this._ctx.fillText('-' + apsis.toString(), -apsis - 10, -10);
    }

    const ordinatBraceCount = Math.round(this.options.maxOrdinat / this.options.brace);
    for (let i = 0; i < ordinatBraceCount; i++) {
      const ordinat = (i + 1) * this.options.brace;
      this._ctx.strokeRect(-4, ordinat, 9, 1);
      this._ctx.fillText(ordinat.toString(), 10, ordinat + 4);
      this._ctx.strokeRect(-4, -ordinat, 9, 1);
      this._ctx.fillText('-' + ordinat.toString(), 10, -ordinat + 4);
    }
  }

  private _generateFont(size: number = this.options.lineFontSize) {
    return `${size}px ${this.options.lineFontType}`;
  }
}
