/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cartesian.ts":
/*!**************************!*\
  !*** ./src/cartesian.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cartesian = exports.CartesianDot = exports.CartesianOptions = void 0;
class CartesianOptions {
    width = 400;
    height = 400;
    maxApsis = 0;
    maxOrdinat = 0;
    margin = 50;
    brace = 50;
    openBraceInfo = true;
    lineFontSize = 18;
    lineFontType = 'Arial';
}
exports.CartesianOptions = CartesianOptions;
class CartesianDot {
    dotWidth = 2;
    dotColor = '#000';
    x = 0;
    y = 0;
}
exports.CartesianDot = CartesianDot;
class Cartesian {
    canvas;
    options;
    _ctx;
    constructor(canvas, options = new CartesianOptions()) {
        this.canvas = canvas;
        this._ctx = canvas.getContext('2d');
        this.options = options;
        this.options.maxApsis = this.options.width - this.options.margin;
        this.options.maxOrdinat = this.options.height - this.options.margin;
        this._createCartesian();
    }
    drawPoint(x, y, diameter = 5) {
        this._ctx.beginPath();
        this._ctx.arc(x, y, diameter, 0, Math.PI * 2, true);
        this._ctx.closePath();
        this._ctx.fill();
    }
    _createCartesian() {
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
    _addBraceInformation() {
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
    _generateFont(size = this.options.lineFontSize) {
        return `${size}px ${this.options.lineFontType}`;
    }
}
exports.Cartesian = Cartesian;


/***/ }),

/***/ "./src/fibonacci-pattern-event.ts":
/*!****************************************!*\
  !*** ./src/fibonacci-pattern-event.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FibonacciPatternEvent = void 0;
class FibonacciPatternEvent {
    /* tslint:disable: variable-name */
    _et;
    /* tslint:enable: variable-name */
    constructor() {
        try {
            this._et = new EventTarget();
        }
        catch (error) {
            // Using document as EventTarget to support iOS 13 and older.
            // Because EventTarget constructor just exists at iOS 14 and later.
            this._et = document;
        }
    }
    addEventListener(type, listener, options) {
        this._et.addEventListener(type, listener, options);
    }
    dispatchEvent(event) {
        return this._et.dispatchEvent(event);
    }
    removeEventListener(type, callback, options) {
        this._et.removeEventListener(type, callback, options);
    }
}
exports.FibonacciPatternEvent = FibonacciPatternEvent;


/***/ }),

/***/ "./src/fibonacci-pattern.ts":
/*!**********************************!*\
  !*** ./src/fibonacci-pattern.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const cartesian_1 = __webpack_require__(/*! ./cartesian */ "./src/cartesian.ts");
const fibonacci_pattern_event_1 = __webpack_require__(/*! ./fibonacci-pattern-event */ "./src/fibonacci-pattern-event.ts");
const spiral_1 = __webpack_require__(/*! ./spiral */ "./src/spiral.ts");
class FibonacciPattern extends fibonacci_pattern_event_1.FibonacciPatternEvent {
    canvas;
    options;
    _options;
    _canvas;
    _cartesian;
    constructor(canvas, options = {}) {
        super();
        this.canvas = canvas;
        this.options = options;
        this._canvas = canvas;
        this._options = options;
        this._cartesian = new cartesian_1.Cartesian(canvas, options.cartesianOptions || new cartesian_1.CartesianOptions());
    }
    makeSpiral(maxTheta) {
        const spiral = new spiral_1.Spiral(maxTheta);
        spiral.coordinates.forEach(coordinate => {
            this._cartesian.drawPoint(coordinate.x, coordinate.y, 2);
        });
    }
}
exports["default"] = FibonacciPattern;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fibonacci_pattern_1 = __importDefault(__webpack_require__(/*! ./fibonacci-pattern */ "./src/fibonacci-pattern.ts"));
var canvas = document.querySelector('canvas');
var spiral = new fibonacci_pattern_1.default(canvas);
spiral.makeSpiral(2400);


/***/ }),

/***/ "./src/spiral.ts":
/*!***********************!*\
  !*** ./src/spiral.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Spiral = void 0;
const math_1 = __webpack_require__(/*! ./utils/math */ "./src/utils/math.ts");
const a = 0.001;
const b = 0.0053468;
class Spiral {
    coordinates = [];
    _maxTheta;
    constructor(maxTheta) {
        this._maxTheta = maxTheta;
        this._spiral();
    }
    _spiral() {
        for (let i = 0; i < this._maxTheta; i++) {
            this.coordinates.push({
                theta: i,
                x: a * Math.cos((0, math_1.RADIANS)(i)) * Math.exp(b * i),
                y: a * Math.sin((0, math_1.RADIANS)(i)) * Math.exp(b * i),
            });
        }
    }
}
exports.Spiral = Spiral;


/***/ }),

/***/ "./src/utils/math.ts":
/*!***************************!*\
  !*** ./src/utils/math.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RADIANS = void 0;
function RADIANS(degrees) {
    return degrees * (Math.PI / 180);
}
exports.RADIANS = RADIANS;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPLENBQUMsT0FBZTtJQUNyQyxPQUFPLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUZELDBCQUVDOzs7Ozs7O1VDRkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpYm9uYWNjaS1wYXR0ZXJuLy4vc3JjL2NhcnRlc2lhbi50cyIsIndlYnBhY2s6Ly9maWJvbmFjY2ktcGF0dGVybi8uL3NyYy9maWJvbmFjY2ktcGF0dGVybi1ldmVudC50cyIsIndlYnBhY2s6Ly9maWJvbmFjY2ktcGF0dGVybi8uL3NyYy9maWJvbmFjY2ktcGF0dGVybi50cyIsIndlYnBhY2s6Ly9maWJvbmFjY2ktcGF0dGVybi8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL2ZpYm9uYWNjaS1wYXR0ZXJuLy4vc3JjL3NwaXJhbC50cyIsIndlYnBhY2s6Ly9maWJvbmFjY2ktcGF0dGVybi8uL3NyYy91dGlscy9tYXRoLnRzIiwid2VicGFjazovL2ZpYm9uYWNjaS1wYXR0ZXJuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZpYm9uYWNjaS1wYXR0ZXJuL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZmlib25hY2NpLXBhdHRlcm4vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2ZpYm9uYWNjaS1wYXR0ZXJuL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ2FydGVzaWFuT3B0aW9ucyB7XG4gIHdpZHRoOiBudW1iZXIgPSA0MDA7XG4gIGhlaWdodDogbnVtYmVyID0gNDAwO1xuICBtYXhBcHNpczogbnVtYmVyID0gMDtcbiAgbWF4T3JkaW5hdDogbnVtYmVyID0gMDtcbiAgbWFyZ2luOiBudW1iZXIgPSA1MDtcbiAgYnJhY2U6IG51bWJlciA9IDUwO1xuICBvcGVuQnJhY2VJbmZvOiBib29sZWFuID0gdHJ1ZTtcbiAgbGluZUZvbnRTaXplOiBudW1iZXIgPSAxODtcbiAgbGluZUZvbnRUeXBlOiBzdHJpbmcgPSAnQXJpYWwnO1xufVxuXG5leHBvcnQgY2xhc3MgQ2FydGVzaWFuRG90IHtcbiAgZG90V2lkdGg6IG51bWJlciA9IDI7XG4gIGRvdENvbG9yOiBzdHJpbmcgPSAnIzAwMCc7XG4gIHg6IG51bWJlciA9IDA7XG4gIHk6IG51bWJlciA9IDA7XG59XG5cbmV4cG9ydCBjbGFzcyBDYXJ0ZXNpYW4ge1xuICBvcHRpb25zOiBDYXJ0ZXNpYW5PcHRpb25zO1xuICBwcml2YXRlIF9jdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIG9wdGlvbnM6IENhcnRlc2lhbk9wdGlvbnMgPSBuZXcgQ2FydGVzaWFuT3B0aW9ucygpKSB7XG4gICAgdGhpcy5fY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLm9wdGlvbnMubWF4QXBzaXMgPSB0aGlzLm9wdGlvbnMud2lkdGggLSB0aGlzLm9wdGlvbnMubWFyZ2luO1xuICAgIHRoaXMub3B0aW9ucy5tYXhPcmRpbmF0ID0gdGhpcy5vcHRpb25zLmhlaWdodCAtIHRoaXMub3B0aW9ucy5tYXJnaW47XG5cbiAgICB0aGlzLl9jcmVhdGVDYXJ0ZXNpYW4oKTtcbiAgfVxuXG4gIHB1YmxpYyBkcmF3UG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIsIGRpYW1ldGVyOiBudW1iZXIgPSA1KSB7XG4gICAgdGhpcy5fY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuX2N0eC5hcmMoeCwgeSwgZGlhbWV0ZXIsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICB0aGlzLl9jdHguY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5fY3R4LmZpbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUNhcnRlc2lhbigpIHtcbiAgICAvLyBDZW50ZXJcbiAgICB0aGlzLl9jdHgudHJhbnNsYXRlKHRoaXMub3B0aW9ucy53aWR0aCwgdGhpcy5vcHRpb25zLmhlaWdodCk7XG5cbiAgICAvLyBBZGQgYXBzaXMgYW5kIG9yZGluYXQgbGluZVxuICAgIHRoaXMuX2N0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLl9jdHgubW92ZVRvKC10aGlzLm9wdGlvbnMubWF4QXBzaXMsIDApO1xuICAgIHRoaXMuX2N0eC5saW5lVG8odGhpcy5vcHRpb25zLm1heEFwc2lzLCAwKTtcbiAgICB0aGlzLl9jdHguc3Ryb2tlKCk7XG4gICAgdGhpcy5fY3R4Lm1vdmVUbygwLCAtdGhpcy5vcHRpb25zLm1heE9yZGluYXQpO1xuICAgIHRoaXMuX2N0eC5saW5lVG8oMCwgdGhpcy5vcHRpb25zLm1heE9yZGluYXQpO1xuICAgIHRoaXMuX2N0eC5zdHJva2UoKTtcblxuICAgIC8vIEFkZCBhcHNpcyBhbmQgb3JkaW5hdCB0ZXh0XG4gICAgY29uc3QgZmlsbFRleHRNYXJnaW4gPSBNYXRoLnJvdW5kKHRoaXMub3B0aW9ucy5tYXJnaW4gKiAwLjQpO1xuICAgIHRoaXMuX2N0eC5mb250ID0gdGhpcy5fZ2VuZXJhdGVGb250KCk7XG4gICAgdGhpcy5fY3R4LmZpbGxUZXh0KCcrIHgnLCB0aGlzLm9wdGlvbnMubWF4QXBzaXMgKyBmaWxsVGV4dE1hcmdpbiwgNSk7XG4gICAgdGhpcy5fY3R4LmZpbGxUZXh0KCctIHknLCAtNSwgdGhpcy5vcHRpb25zLm1heE9yZGluYXQgKyBmaWxsVGV4dE1hcmdpbik7XG4gICAgdGhpcy5fY3R4LmZpbGxUZXh0KCcrIHknLCAtNSwgLSh0aGlzLm9wdGlvbnMubWF4T3JkaW5hdCArIGZpbGxUZXh0TWFyZ2luKSk7XG4gICAgdGhpcy5fY3R4LmZpbGxUZXh0KCctIHgnLCAtKHRoaXMub3B0aW9ucy5tYXhBcHNpcyArIHRoaXMub3B0aW9ucy5tYXJnaW4gKiAwLjY1KSwgNSk7XG5cbiAgICAvLyBBZGQgYXBzaXMgYnJhY2Ugb2YgbGluZVxuICAgIGlmICh0aGlzLm9wdGlvbnMub3BlbkJyYWNlSW5mbykge1xuICAgICAgdGhpcy5fYWRkQnJhY2VJbmZvcm1hdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZEJyYWNlSW5mb3JtYXRpb24oKSB7XG4gICAgdGhpcy5fY3R4LmZvbnQgPSB0aGlzLl9nZW5lcmF0ZUZvbnQodGhpcy5vcHRpb25zLmxpbmVGb250U2l6ZSAvIDIpO1xuXG4gICAgY29uc3QgYXBzaXNCcmFjZUNvdW50ID0gTWF0aC5yb3VuZCh0aGlzLm9wdGlvbnMubWF4QXBzaXMgLyB0aGlzLm9wdGlvbnMuYnJhY2UpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXBzaXNCcmFjZUNvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IGFwc2lzID0gKGkgKyAxKSAqIHRoaXMub3B0aW9ucy5icmFjZTtcbiAgICAgIHRoaXMuX2N0eC5zdHJva2VSZWN0KGFwc2lzLCAtNCwgMSwgOSk7XG4gICAgICB0aGlzLl9jdHguZmlsbFRleHQoYXBzaXMudG9TdHJpbmcoKSwgYXBzaXMgLSAxMCwgLTEwKTtcbiAgICAgIHRoaXMuX2N0eC5zdHJva2VSZWN0KC1hcHNpcywgLTQsIDEsIDkpO1xuICAgICAgdGhpcy5fY3R4LmZpbGxUZXh0KCctJyArIGFwc2lzLnRvU3RyaW5nKCksIC1hcHNpcyAtIDEwLCAtMTApO1xuICAgIH1cblxuICAgIGNvbnN0IG9yZGluYXRCcmFjZUNvdW50ID0gTWF0aC5yb3VuZCh0aGlzLm9wdGlvbnMubWF4T3JkaW5hdCAvIHRoaXMub3B0aW9ucy5icmFjZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmRpbmF0QnJhY2VDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCBvcmRpbmF0ID0gKGkgKyAxKSAqIHRoaXMub3B0aW9ucy5icmFjZTtcbiAgICAgIHRoaXMuX2N0eC5zdHJva2VSZWN0KC00LCBvcmRpbmF0LCA5LCAxKTtcbiAgICAgIHRoaXMuX2N0eC5maWxsVGV4dChvcmRpbmF0LnRvU3RyaW5nKCksIDEwLCBvcmRpbmF0ICsgNCk7XG4gICAgICB0aGlzLl9jdHguc3Ryb2tlUmVjdCgtNCwgLW9yZGluYXQsIDksIDEpO1xuICAgICAgdGhpcy5fY3R4LmZpbGxUZXh0KCctJyArIG9yZGluYXQudG9TdHJpbmcoKSwgMTAsIC1vcmRpbmF0ICsgNCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVGb250KHNpemU6IG51bWJlciA9IHRoaXMub3B0aW9ucy5saW5lRm9udFNpemUpIHtcbiAgICByZXR1cm4gYCR7c2l6ZX1weCAke3RoaXMub3B0aW9ucy5saW5lRm9udFR5cGV9YDtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEZpYm9uYWNjaVBhdHRlcm5FdmVudCBpbXBsZW1lbnRzIEV2ZW50VGFyZ2V0IHtcbiAgLyogdHNsaW50OmRpc2FibGU6IHZhcmlhYmxlLW5hbWUgKi9cbiAgcHJpdmF0ZSBfZXQ6IEV2ZW50VGFyZ2V0O1xuICAvKiB0c2xpbnQ6ZW5hYmxlOiB2YXJpYWJsZS1uYW1lICovXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX2V0ID0gbmV3IEV2ZW50VGFyZ2V0KCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFVzaW5nIGRvY3VtZW50IGFzIEV2ZW50VGFyZ2V0IHRvIHN1cHBvcnQgaU9TIDEzIGFuZCBvbGRlci5cbiAgICAgIC8vIEJlY2F1c2UgRXZlbnRUYXJnZXQgY29uc3RydWN0b3IganVzdCBleGlzdHMgYXQgaU9TIDE0IGFuZCBsYXRlci5cbiAgICAgIHRoaXMuX2V0ID0gZG9jdW1lbnQ7XG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QgfCBudWxsLFxuICAgIG9wdGlvbnM/OiBib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnMsXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICB9XG5cbiAgZGlzcGF0Y2hFdmVudChldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICByZW1vdmVFdmVudExpc3RlbmVyKFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBjYWxsYmFjazogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCB8IG51bGwsXG4gICAgb3B0aW9ucz86IGJvb2xlYW4gfCBFdmVudExpc3RlbmVyT3B0aW9ucyxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5fZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENhcnRlc2lhbiwgQ2FydGVzaWFuT3B0aW9ucyB9IGZyb20gJy4vY2FydGVzaWFuJztcbmltcG9ydCB7IEZpYm9uYWNjaVBhdHRlcm5FdmVudCB9IGZyb20gJy4vZmlib25hY2NpLXBhdHRlcm4tZXZlbnQnO1xuaW1wb3J0IHsgU3BpcmFsIH0gZnJvbSAnLi9zcGlyYWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xuICBjYXJ0ZXNpYW5PcHRpb25zOiBDYXJ0ZXNpYW5PcHRpb25zO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWJvbmFjY2lQYXR0ZXJuIGV4dGVuZHMgRmlib25hY2NpUGF0dGVybkV2ZW50IHtcbiAgcHJpdmF0ZSBfb3B0aW9uczogT3B0aW9ucztcbiAgcHJpdmF0ZSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBfY2FydGVzaWFuOiBDYXJ0ZXNpYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBwcml2YXRlIG9wdGlvbnM6IE9wdGlvbnMgPSA8T3B0aW9ucz57fSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuX2NhcnRlc2lhbiA9IG5ldyBDYXJ0ZXNpYW4oY2FudmFzLCBvcHRpb25zLmNhcnRlc2lhbk9wdGlvbnMgfHwgbmV3IENhcnRlc2lhbk9wdGlvbnMoKSk7XG4gIH1cblxuICBwdWJsaWMgbWFrZVNwaXJhbChtYXhUaGV0YTogbnVtYmVyKSB7XG4gICAgY29uc3Qgc3BpcmFsID0gbmV3IFNwaXJhbChtYXhUaGV0YSk7XG4gICAgc3BpcmFsLmNvb3JkaW5hdGVzLmZvckVhY2goY29vcmRpbmF0ZSA9PiB7XG4gICAgICB0aGlzLl9jYXJ0ZXNpYW4uZHJhd1BvaW50KGNvb3JkaW5hdGUueCwgY29vcmRpbmF0ZS55LCAyKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZpYm9uYWNjaVBhdHRlcm4gZnJvbSAnLi9maWJvbmFjY2ktcGF0dGVybic7XG5cbnZhciBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcblxudmFyIHNwaXJhbCA9IG5ldyBGaWJvbmFjY2lQYXR0ZXJuKGNhbnZhcyk7XG5zcGlyYWwubWFrZVNwaXJhbCgyNDAwKTtcbiIsImltcG9ydCB7IFJBRElBTlMgfSBmcm9tICcuL3V0aWxzL21hdGgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNwaXJhbENvb3JkaW5hdGUge1xuICB0aGV0YTogbnVtYmVyO1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn1cbmNvbnN0IGE6IG51bWJlciA9IDAuMDAxO1xuY29uc3QgYjogbnVtYmVyID0gMC4wMDUzNDY4O1xuXG5leHBvcnQgY2xhc3MgU3BpcmFsIHtcbiAgcHVibGljIGNvb3JkaW5hdGVzOiBTcGlyYWxDb29yZGluYXRlW10gPSBbXTtcbiAgcHJpdmF0ZSBfbWF4VGhldGE6IG51bWJlcjtcbiAgY29uc3RydWN0b3IobWF4VGhldGE6IG51bWJlcikge1xuICAgIHRoaXMuX21heFRoZXRhID0gbWF4VGhldGE7XG4gICAgdGhpcy5fc3BpcmFsKCk7XG4gIH1cblxuICBwcml2YXRlIF9zcGlyYWwoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tYXhUaGV0YTsgaSsrKSB7XG4gICAgICB0aGlzLmNvb3JkaW5hdGVzLnB1c2goe1xuICAgICAgICB0aGV0YTogaSxcbiAgICAgICAgeDogYSAqIE1hdGguY29zKFJBRElBTlMoaSkpICogTWF0aC5leHAoYiAqIGkpLFxuICAgICAgICB5OiBhICogTWF0aC5zaW4oUkFESUFOUyhpKSkgKiBNYXRoLmV4cChiICogaSksXG4gICAgICB9IGFzIFNwaXJhbENvb3JkaW5hdGUpO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIFJBRElBTlMoZGVncmVlczogbnVtYmVyKSB7XG4gIHJldHVybiBkZWdyZWVzICogKE1hdGguUEkgLyAxODApO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=