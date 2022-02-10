/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fibonacci_pattern_1 = __importDefault(__webpack_require__(/*! ./fibonacci-pattern */ "./src/fibonacci-pattern.ts"));
// Spiral
const spiralCanvas = document.getElementById('spiral');
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
};
const spiral = new fibonacci_pattern_1.default(spiralCanvas, spiralOptions);
spiral.makeSpiral(thetaCount, line);
// Spiral Option Listeners
document.getElementById('drawSpiral')?.addEventListener('click', () => spiral.makeSpiral(thetaCount, line));
document.getElementById('thetaInput')?.addEventListener('input', event => (thetaCount = Number(event.target.value)));
document
    .getElementById('spiralScale')
    ?.addEventListener('input', event => (spiralOptions.scale = Number(event.target.value)));
document
    .getElementById('spiralDelay')
    ?.addEventListener('input', event => (spiralOptions.drawDelay = Number(event.target.value)));
document
    .getElementById('spiralBracket')
    ?.addEventListener('input', event => (spiralOptions.openLineInfo = event.target.value == '1' ? true : false));
document.getElementById('spiralLine')?.addEventListener('input', event => (line = Number(event.target.value)));
// Sunflower
const sunflowerCanvas = document.getElementById('sunflower');
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
};
const sunflower = new fibonacci_pattern_1.default(sunflowerCanvas, sunflowerOptions);
// Sunflower Option Listeners
document.getElementById('drawSunflower')?.addEventListener('click', () => sunflower.makeSunflower(seedCount));
document.getElementById('seedInput')?.addEventListener('input', event => (seedCount = Number(event.target.value)));
document
    .getElementById('sunflowerScale')
    ?.addEventListener('input', event => (sunflowerOptions.scale = Number(event.target.value)));
document
    .getElementById('sunflowerDelay')
    ?.addEventListener('input', event => (sunflowerOptions.drawDelay = Number(event.target.value)));
document
    .getElementById('sunflowerBracket')
    ?.addEventListener('input', event => (sunflowerOptions.openLineInfo = event.target.value == '1' ? true : false));


/***/ }),

/***/ "./src/cartesian.ts":
/*!**************************!*\
  !*** ./src/cartesian.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cartesian = exports.CartesianOptions = void 0;
class CartesianOptions {
    maxApsis = 0;
    maxOrdinat = 0;
    margin = 50;
    brace = 50;
    scale = 1;
    drawDelay = 0;
    openLineInfo = true;
    lineFontSize = 18;
    lineFontType = 'Arial';
}
exports.CartesianOptions = CartesianOptions;
class Cartesian {
    canvas;
    _cartesianOptions;
    _ctx;
    _width;
    _height;
    _drawIntervals = [];
    constructor(canvas, options = new CartesianOptions()) {
        this.canvas = canvas;
        this._ctx = canvas.getContext('2d');
        this._cartesianOptions = options;
        this._width = Math.floor(canvas.width / 2);
        this._height = Math.floor(canvas.height / 2);
        if (!this._cartesianOptions.maxApsis || !this._cartesianOptions.maxOrdinat) {
            this._cartesianOptions.maxApsis = (this._width - this._cartesianOptions.margin) * this._cartesianOptions.scale;
            this._cartesianOptions.maxOrdinat = (this._height - this._cartesianOptions.margin) * this._cartesianOptions.scale;
        }
        this._createCartesian();
    }
    drawPoint(x, y, diameter = 5, index = 0) {
        const interval = setInterval(() => {
            this._ctx.beginPath();
            this._ctx.arc(x, y, diameter, 0, Math.PI * 2, true);
            this._ctx.closePath();
            this._ctx.fill();
            clearInterval(interval);
        }, this._cartesianOptions.drawDelay * index);
        this._drawIntervals.push(interval);
    }
    clear() {
        this._drawIntervals.forEach(interval => clearInterval(interval));
        this._drawIntervals = [];
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
        this._createCartesian();
    }
    _createCartesian() {
        // Center
        this._ctx.translate(this._width, this._height);
        this._ctx.scale(this._cartesianOptions.scale, this._cartesianOptions.scale);
        // Add apsis brace of line
        if (this._cartesianOptions.openLineInfo) {
            this._addBraceInformation();
        }
    }
    _addBraceInformation() {
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
    _generateFont(size = this._cartesianOptions.lineFontSize) {
        return `${size}px ${this._cartesianOptions.lineFontType}`;
    }
}
exports.Cartesian = Cartesian;


/***/ }),

/***/ "./src/fibonacci-pattern.ts":
/*!**********************************!*\
  !*** ./src/fibonacci-pattern.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const cartesian_1 = __webpack_require__(/*! ./cartesian */ "./src/cartesian.ts");
const spiral_1 = __webpack_require__(/*! ./spiral */ "./src/spiral.ts");
const sunflower_1 = __webpack_require__(/*! ./sunflower */ "./src/sunflower.ts");
class FibonacciPattern extends cartesian_1.Cartesian {
    constructor(canvas, cartesianOptions = new cartesian_1.CartesianOptions()) {
        super(canvas, cartesianOptions);
    }
    makeSpiral(maxTheta, line) {
        this.clear();
        new spiral_1.Spiral(maxTheta, line).createCoordinate().then(coordinates => {
            coordinates.forEach((coordinate, i) => {
                this.drawPoint(coordinate.x, coordinate.y, 2, i);
            });
        });
    }
    makeSunflower(seed) {
        this.clear();
        new sunflower_1.SunFlower(seed).createSeeds().then(seeds => {
            seeds.forEach((seed, i) => {
                this.drawPoint(seed.x, seed.y, 0.7, i);
            });
        });
    }
}
exports["default"] = FibonacciPattern;


/***/ }),

/***/ "./src/fibonacci.ts":
/*!**************************!*\
  !*** ./src/fibonacci.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Fibonacci = void 0;
class Fibonacci {
    fibonacciSequences = (n) => new Promise(resolve => {
        n = Math.floor(n);
        const fibonacciNumbers = [0, 1];
        while (fibonacciNumbers.length < n) {
            fibonacciNumbers.push(fibonacciNumbers[fibonacciNumbers.length - 2] + fibonacciNumbers[fibonacciNumbers.length - 1]);
        }
        resolve(fibonacciNumbers);
    });
    calculatePhi = (n) => new Promise(resolve => {
        this.fibonacciSequences(n).then(numbers => {
            const phi = numbers[numbers.length - 1] / numbers[numbers.length - 2];
            resolve(phi);
        });
    });
}
exports.Fibonacci = Fibonacci;


/***/ }),

/***/ "./src/spiral.ts":
/*!***********************!*\
  !*** ./src/spiral.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Spiral = void 0;
const fibonacci_1 = __webpack_require__(/*! ./fibonacci */ "./src/fibonacci.ts");
const math_1 = __webpack_require__(/*! ./utils/math */ "./src/utils/math.ts");
const a = 0.001;
const b = 0.0053468;
class Spiral extends fibonacci_1.Fibonacci {
    _maxTheta;
    _line;
    constructor(maxTheta, line = 1) {
        super();
        if (maxTheta < 0 || line < 1) {
            throw 'Parameters not accepted!';
        }
        this._maxTheta = maxTheta;
        this._line = line;
    }
    createCoordinate = () => new Promise(resolve => {
        const coordinates = [];
        for (let line = 1; line <= this._line; line++) {
            for (let i = 0; i < this._maxTheta; i++) {
                coordinates.push(this._calculate(i, line));
            }
        }
        resolve(coordinates);
    });
    _calculate = (i, line = 1) => {
        return {
            theta: i,
            x: a * Math.cos((0, math_1.RADIANS)(i)) * Math.exp(b * i) * line,
            y: a * Math.sin((0, math_1.RADIANS)(i)) * Math.exp(b * i) * line,
        };
    };
}
exports.Spiral = Spiral;


/***/ }),

/***/ "./src/sunflower.ts":
/*!**************************!*\
  !*** ./src/sunflower.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SunFlower = void 0;
const fibonacci_1 = __webpack_require__(/*! ./fibonacci */ "./src/fibonacci.ts");
const math_1 = __webpack_require__(/*! ./utils/math */ "./src/utils/math.ts");
class SunFlower extends fibonacci_1.Fibonacci {
    _numberOfSeed;
    constructor(numberOfSeed) {
        super();
        this._numberOfSeed = numberOfSeed;
        if (numberOfSeed < 1) {
            throw 'Parameters not accepted!';
        }
    }
    createSeeds = () => new Promise(resolve => {
        this.calculatePhi(this._numberOfSeed / 10).then(phi => {
            const goldenAngle = 360 - 360 / phi;
            const seeds = [];
            for (let i = 0; i < this._numberOfSeed; i++) {
                const previousSeed = seeds[i - 1];
                const seed = {
                    distance: Math.sqrt(i + 1),
                    theta: previousSeed ? previousSeed.theta + goldenAngle : 0,
                };
                seed.x = seed.distance * Math.cos((0, math_1.RADIANS)(seed.theta));
                seed.y = seed.distance * Math.sin((0, math_1.RADIANS)(seed.theta));
                seeds.push(seed);
            }
            resolve(seeds);
        });
    });
}
exports.SunFlower = SunFlower;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwSEFBbUQ7QUFFbkQsU0FBUztBQUNULE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFzQixDQUFDO0FBQzVFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztBQUN0QixJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFDYixJQUFJLGFBQWEsR0FBRztJQUNsQixRQUFRLEVBQUUsR0FBRztJQUNiLFVBQVUsRUFBRSxHQUFHO0lBQ2YsS0FBSyxFQUFFLEVBQUU7SUFDVCxNQUFNLEVBQUUsRUFBRTtJQUNWLEtBQUssRUFBRSxDQUFDO0lBQ1IsWUFBWSxFQUFFLEVBQUU7SUFDaEIsWUFBWSxFQUFFLE9BQU87SUFDckIsU0FBUyxFQUFFLENBQUM7SUFDWixZQUFZLEVBQUUsSUFBSTtDQUNDLENBQUM7QUFFdEIsTUFBTSxNQUFNLEdBQUcsSUFBSSwyQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDakUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFcEMsMEJBQTBCO0FBQzFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDNUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUUsS0FBSyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNJLFFBQVE7S0FDTCxjQUFjLENBQUMsYUFBYSxDQUFDO0lBQzlCLEVBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBRSxLQUFLLENBQUMsTUFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakgsUUFBUTtLQUNMLGNBQWMsQ0FBQyxhQUFhLENBQUM7SUFDOUIsRUFBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFFLEtBQUssQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNySCxRQUFRO0tBQ0wsY0FBYyxDQUFDLGVBQWUsQ0FBQztJQUNoQyxFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBSSxLQUFLLENBQUMsTUFBMkIsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDdEksUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUUsS0FBSyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXJJLFlBQVk7QUFDWixNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQztBQUNsRixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDckIsSUFBSSxnQkFBZ0IsR0FBRztJQUNyQixRQUFRLEVBQUUsR0FBRztJQUNiLFVBQVUsRUFBRSxHQUFHO0lBQ2YsS0FBSyxFQUFFLEVBQUU7SUFDVCxNQUFNLEVBQUUsR0FBRztJQUNYLEtBQUssRUFBRSxHQUFHO0lBQ1YsWUFBWSxFQUFFLEVBQUU7SUFDaEIsWUFBWSxFQUFFLE9BQU87SUFDckIsU0FBUyxFQUFFLENBQUM7SUFDWixZQUFZLEVBQUUsSUFBSTtDQUNDLENBQUM7QUFFdEIsTUFBTSxTQUFTLEdBQUcsSUFBSSwyQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUUxRSw2QkFBNkI7QUFDN0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQzlHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFFLEtBQUssQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6SSxRQUFRO0tBQ0wsY0FBYyxDQUFDLGdCQUFnQixDQUFDO0lBQ2pDLEVBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFFLEtBQUssQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwSCxRQUFRO0tBQ0wsY0FBYyxDQUFDLGdCQUFnQixDQUFDO0lBQ2pDLEVBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFFLEtBQUssQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4SCxRQUFRO0tBQ0wsY0FBYyxDQUFDLGtCQUFrQixDQUFDO0lBQ25DLEVBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUksS0FBSyxDQUFDLE1BQTJCLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ2hFekksTUFBYSxnQkFBZ0I7SUFDM0IsUUFBUSxHQUFXLENBQUMsQ0FBQztJQUNyQixVQUFVLEdBQVcsQ0FBQyxDQUFDO0lBQ3ZCLE1BQU0sR0FBVyxFQUFFLENBQUM7SUFDcEIsS0FBSyxHQUFXLEVBQUUsQ0FBQztJQUNuQixLQUFLLEdBQVcsQ0FBQyxDQUFDO0lBQ2xCLFNBQVMsR0FBVyxDQUFDLENBQUM7SUFDdEIsWUFBWSxHQUFZLElBQUksQ0FBQztJQUM3QixZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQzFCLFlBQVksR0FBVyxPQUFPLENBQUM7Q0FDaEM7QUFWRCw0Q0FVQztBQUVELE1BQWEsU0FBUztJQU9BO0lBTmIsaUJBQWlCLENBQW1CO0lBQ25DLElBQUksQ0FBMkI7SUFDL0IsTUFBTSxDQUFTO0lBQ2YsT0FBTyxDQUFTO0lBQ2hCLGNBQWMsR0FBVSxFQUFFLENBQUM7SUFFbkMsWUFBb0IsTUFBeUIsRUFBRSxVQUE0QixJQUFJLGdCQUFnQixFQUFFO1FBQTdFLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQTZCLENBQUM7UUFFaEUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUU7WUFDMUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7WUFDL0csSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7U0FDbkg7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU0sU0FBUyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsV0FBbUIsQ0FBQyxFQUFFLFFBQWdCLENBQUM7UUFDNUUsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFCLENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxLQUFLO1FBQ1YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8sZ0JBQWdCO1FBQ3RCLFNBQVM7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1RSwwQkFBMEI7UUFDMUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVPLG9CQUFvQjtRQUMxQiw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFbkIsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXJFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU3RSxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25HLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQztZQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUQ7UUFFRCxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGlCQUFpQixFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7WUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDO0lBRU8sYUFBYSxDQUFDLE9BQWUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVk7UUFDdEUsT0FBTyxHQUFHLElBQUksTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDNUQsQ0FBQztDQUNGO0FBNUZELDhCQTRGQzs7Ozs7Ozs7Ozs7OztBQ3hHRCxpRkFBMEQ7QUFDMUQsd0VBQWtDO0FBQ2xDLGlGQUF3QztBQUN4QyxNQUFxQixnQkFBaUIsU0FBUSxxQkFBUztJQUNyRCxZQUFZLE1BQXlCLEVBQUUsbUJBQXFDLElBQUksNEJBQWdCLEVBQUU7UUFDaEcsS0FBSyxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxVQUFVLENBQUMsUUFBZ0IsRUFBRSxJQUFZO1FBQzlDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksZUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMvRCxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxhQUFhLENBQUMsSUFBWTtRQUMvQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzdDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdEJELHNDQXNCQzs7Ozs7Ozs7Ozs7Ozs7QUN6QkQsTUFBYSxTQUFTO0lBQ2Isa0JBQWtCLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUN4QyxJQUFJLE9BQU8sQ0FBVyxPQUFPLENBQUMsRUFBRTtRQUM5QixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixNQUFNLGdCQUFnQixHQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RIO1FBRUQsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFFRSxZQUFZLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUNsQyxJQUFJLE9BQU8sQ0FBUyxPQUFPLENBQUMsRUFBRTtRQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3hDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7Q0FDTjtBQW5CRCw4QkFtQkM7Ozs7Ozs7Ozs7Ozs7O0FDbkJELGlGQUF3QztBQUN4Qyw4RUFBdUM7QUFPdkMsTUFBTSxDQUFDLEdBQVcsS0FBSyxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxHQUFXLFNBQVMsQ0FBQztBQUU1QixNQUFhLE1BQU8sU0FBUSxxQkFBUztJQUMzQixTQUFTLENBQVM7SUFDbEIsS0FBSyxDQUFTO0lBQ3RCLFlBQVksUUFBZ0IsRUFBRSxPQUFlLENBQUM7UUFDNUMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtZQUM1QixNQUFNLDBCQUEwQixDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVNLGdCQUFnQixHQUFHLEdBQUcsRUFBRSxDQUM3QixJQUFJLE9BQU8sQ0FBcUIsT0FBTyxDQUFDLEVBQUU7UUFDeEMsTUFBTSxXQUFXLEdBQXVCLEVBQUUsQ0FBQztRQUMzQyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUM3QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdkMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzVDO1NBQ0Y7UUFFRCxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFFRyxVQUFVLEdBQUcsQ0FBQyxDQUFTLEVBQUUsT0FBZSxDQUFDLEVBQUUsRUFBRTtRQUNuRCxPQUFPO1lBQ0wsS0FBSyxFQUFFLENBQUM7WUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQU8sRUFBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUk7WUFDcEQsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJO1NBQ2pDLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0NBQ0g7QUEvQkQsd0JBK0JDOzs7Ozs7Ozs7Ozs7OztBQzFDRCxpRkFBd0M7QUFDeEMsOEVBQXVDO0FBU3ZDLE1BQWEsU0FBVSxTQUFRLHFCQUFTO0lBQzlCLGFBQWEsQ0FBUztJQUU5QixZQUFZLFlBQW9CO1FBQzlCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7UUFDbEMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE1BQU0sMEJBQTBCLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRU0sV0FBVyxHQUFHLEdBQUcsRUFBRSxDQUN4QixJQUFJLE9BQU8sQ0FBUyxPQUFPLENBQUMsRUFBRTtRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BELE1BQU0sV0FBVyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ3BDLE1BQU0sS0FBSyxHQUFXLEVBQUUsQ0FBQztZQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxJQUFJLEdBQUc7b0JBQ1gsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDMUIsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ25ELENBQUM7Z0JBRVYsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQU8sRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQU8sRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFFdkQsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQjtZQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0NBQ047QUFoQ0QsOEJBZ0NDOzs7Ozs7Ozs7Ozs7OztBQzFDRCxTQUFnQixPQUFPLENBQUMsT0FBZTtJQUNyQyxPQUFPLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUZELDBCQUVDOzs7Ozs7O1VDRkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpYm9uYWNjaS1wYXR0ZXJucy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vZmlib25hY2NpLXBhdHRlcm5zLy4vc3JjL2NhcnRlc2lhbi50cyIsIndlYnBhY2s6Ly9maWJvbmFjY2ktcGF0dGVybnMvLi9zcmMvZmlib25hY2NpLXBhdHRlcm4udHMiLCJ3ZWJwYWNrOi8vZmlib25hY2NpLXBhdHRlcm5zLy4vc3JjL2ZpYm9uYWNjaS50cyIsIndlYnBhY2s6Ly9maWJvbmFjY2ktcGF0dGVybnMvLi9zcmMvc3BpcmFsLnRzIiwid2VicGFjazovL2ZpYm9uYWNjaS1wYXR0ZXJucy8uL3NyYy9zdW5mbG93ZXIudHMiLCJ3ZWJwYWNrOi8vZmlib25hY2NpLXBhdHRlcm5zLy4vc3JjL3V0aWxzL21hdGgudHMiLCJ3ZWJwYWNrOi8vZmlib25hY2NpLXBhdHRlcm5zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZpYm9uYWNjaS1wYXR0ZXJucy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2ZpYm9uYWNjaS1wYXR0ZXJucy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZmlib25hY2NpLXBhdHRlcm5zL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYXJ0ZXNpYW5PcHRpb25zIH0gZnJvbSAnLi9jYXJ0ZXNpYW4nO1xuaW1wb3J0IEZpYm9uYWNjaVBhdHRlcm4gZnJvbSAnLi9maWJvbmFjY2ktcGF0dGVybic7XG5cbi8vIFNwaXJhbFxuY29uc3Qgc3BpcmFsQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwaXJhbCcpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xubGV0IHRoZXRhQ291bnQgPSAyNTAwO1xubGV0IGxpbmUgPSAxO1xubGV0IHNwaXJhbE9wdGlvbnMgPSB7XG4gIG1heEFwc2lzOiA0MDAsXG4gIG1heE9yZGluYXQ6IDQwMCxcbiAgYnJhY2U6IDUwLFxuICBtYXJnaW46IDUwLFxuICBzY2FsZTogMSxcbiAgbGluZUZvbnRTaXplOiAxOCxcbiAgbGluZUZvbnRUeXBlOiAnQXJpYWwnLFxuICBkcmF3RGVsYXk6IDAsXG4gIG9wZW5MaW5lSW5mbzogdHJ1ZSxcbn0gYXMgQ2FydGVzaWFuT3B0aW9ucztcblxuY29uc3Qgc3BpcmFsID0gbmV3IEZpYm9uYWNjaVBhdHRlcm4oc3BpcmFsQ2FudmFzLCBzcGlyYWxPcHRpb25zKTtcbnNwaXJhbC5tYWtlU3BpcmFsKHRoZXRhQ291bnQsIGxpbmUpO1xuXG4vLyBTcGlyYWwgT3B0aW9uIExpc3RlbmVyc1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RyYXdTcGlyYWwnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzcGlyYWwubWFrZVNwaXJhbCh0aGV0YUNvdW50LCBsaW5lKSk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhldGFJbnB1dCcpPy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGV2ZW50ID0+ICh0aGV0YUNvdW50ID0gTnVtYmVyKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpKSk7XG5kb2N1bWVudFxuICAuZ2V0RWxlbWVudEJ5SWQoJ3NwaXJhbFNjYWxlJylcbiAgPy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGV2ZW50ID0+IChzcGlyYWxPcHRpb25zLnNjYWxlID0gTnVtYmVyKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpKSk7XG5kb2N1bWVudFxuICAuZ2V0RWxlbWVudEJ5SWQoJ3NwaXJhbERlbGF5JylcbiAgPy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGV2ZW50ID0+IChzcGlyYWxPcHRpb25zLmRyYXdEZWxheSA9IE51bWJlcigoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKSkpO1xuZG9jdW1lbnRcbiAgLmdldEVsZW1lbnRCeUlkKCdzcGlyYWxCcmFja2V0JylcbiAgPy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGV2ZW50ID0+IChzcGlyYWxPcHRpb25zLm9wZW5MaW5lSW5mbyA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPT0gJzEnID8gdHJ1ZSA6IGZhbHNlKSk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BpcmFsTGluZScpPy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGV2ZW50ID0+IChsaW5lID0gTnVtYmVyKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpKSk7XG5cbi8vIFN1bmZsb3dlclxuY29uc3Qgc3VuZmxvd2VyQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1bmZsb3dlcicpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xubGV0IHNlZWRDb3VudCA9IDgwMDA7XG5sZXQgc3VuZmxvd2VyT3B0aW9ucyA9IHtcbiAgbWF4QXBzaXM6IDEyNSxcbiAgbWF4T3JkaW5hdDogMTI1LFxuICBicmFjZTogMjUsXG4gIG1hcmdpbjogMzUwLFxuICBzY2FsZTogMi41LFxuICBsaW5lRm9udFNpemU6IDEyLFxuICBsaW5lRm9udFR5cGU6ICdBcmlhbCcsXG4gIGRyYXdEZWxheTogMSxcbiAgb3BlbkxpbmVJbmZvOiB0cnVlLFxufSBhcyBDYXJ0ZXNpYW5PcHRpb25zO1xuXG5jb25zdCBzdW5mbG93ZXIgPSBuZXcgRmlib25hY2NpUGF0dGVybihzdW5mbG93ZXJDYW52YXMsIHN1bmZsb3dlck9wdGlvbnMpO1xuXG4vLyBTdW5mbG93ZXIgT3B0aW9uIExpc3RlbmVyc1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RyYXdTdW5mbG93ZXInKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzdW5mbG93ZXIubWFrZVN1bmZsb3dlcihzZWVkQ291bnQpKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWVkSW5wdXQnKT8uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBldmVudCA9PiAoc2VlZENvdW50ID0gTnVtYmVyKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpKSk7XG5kb2N1bWVudFxuICAuZ2V0RWxlbWVudEJ5SWQoJ3N1bmZsb3dlclNjYWxlJylcbiAgPy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGV2ZW50ID0+IChzdW5mbG93ZXJPcHRpb25zLnNjYWxlID0gTnVtYmVyKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpKSk7XG5kb2N1bWVudFxuICAuZ2V0RWxlbWVudEJ5SWQoJ3N1bmZsb3dlckRlbGF5JylcbiAgPy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGV2ZW50ID0+IChzdW5mbG93ZXJPcHRpb25zLmRyYXdEZWxheSA9IE51bWJlcigoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKSkpO1xuZG9jdW1lbnRcbiAgLmdldEVsZW1lbnRCeUlkKCdzdW5mbG93ZXJCcmFja2V0JylcbiAgPy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGV2ZW50ID0+IChzdW5mbG93ZXJPcHRpb25zLm9wZW5MaW5lSW5mbyA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPT0gJzEnID8gdHJ1ZSA6IGZhbHNlKSk7XG4iLCJleHBvcnQgY2xhc3MgQ2FydGVzaWFuT3B0aW9ucyB7XG4gIG1heEFwc2lzOiBudW1iZXIgPSAwO1xuICBtYXhPcmRpbmF0OiBudW1iZXIgPSAwO1xuICBtYXJnaW46IG51bWJlciA9IDUwO1xuICBicmFjZTogbnVtYmVyID0gNTA7XG4gIHNjYWxlOiBudW1iZXIgPSAxO1xuICBkcmF3RGVsYXk6IG51bWJlciA9IDA7XG4gIG9wZW5MaW5lSW5mbzogYm9vbGVhbiA9IHRydWU7XG4gIGxpbmVGb250U2l6ZTogbnVtYmVyID0gMTg7XG4gIGxpbmVGb250VHlwZTogc3RyaW5nID0gJ0FyaWFsJztcbn1cblxuZXhwb3J0IGNsYXNzIENhcnRlc2lhbiB7XG4gIHB1YmxpYyBfY2FydGVzaWFuT3B0aW9uczogQ2FydGVzaWFuT3B0aW9ucztcbiAgcHJpdmF0ZSBfY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHByaXZhdGUgX3dpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgX2hlaWdodDogbnVtYmVyO1xuICBwcml2YXRlIF9kcmF3SW50ZXJ2YWxzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgb3B0aW9uczogQ2FydGVzaWFuT3B0aW9ucyA9IG5ldyBDYXJ0ZXNpYW5PcHRpb25zKCkpIHtcbiAgICB0aGlzLl9jdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgICB0aGlzLl9jYXJ0ZXNpYW5PcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLl93aWR0aCA9IE1hdGguZmxvb3IoY2FudmFzLndpZHRoIC8gMik7XG4gICAgdGhpcy5faGVpZ2h0ID0gTWF0aC5mbG9vcihjYW52YXMuaGVpZ2h0IC8gMik7XG4gICAgaWYgKCF0aGlzLl9jYXJ0ZXNpYW5PcHRpb25zLm1heEFwc2lzIHx8ICF0aGlzLl9jYXJ0ZXNpYW5PcHRpb25zLm1heE9yZGluYXQpIHtcbiAgICAgIHRoaXMuX2NhcnRlc2lhbk9wdGlvbnMubWF4QXBzaXMgPSAodGhpcy5fd2lkdGggLSB0aGlzLl9jYXJ0ZXNpYW5PcHRpb25zLm1hcmdpbikgKiB0aGlzLl9jYXJ0ZXNpYW5PcHRpb25zLnNjYWxlO1xuICAgICAgdGhpcy5fY2FydGVzaWFuT3B0aW9ucy5tYXhPcmRpbmF0ID0gKHRoaXMuX2hlaWdodCAtIHRoaXMuX2NhcnRlc2lhbk9wdGlvbnMubWFyZ2luKSAqIHRoaXMuX2NhcnRlc2lhbk9wdGlvbnMuc2NhbGU7XG4gICAgfVxuXG4gICAgdGhpcy5fY3JlYXRlQ2FydGVzaWFuKCk7XG4gIH1cblxuICBwdWJsaWMgZHJhd1BvaW50KHg6IG51bWJlciwgeTogbnVtYmVyLCBkaWFtZXRlcjogbnVtYmVyID0gNSwgaW5kZXg6IG51bWJlciA9IDApIHtcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMuX2N0eC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuX2N0eC5hcmMoeCwgeSwgZGlhbWV0ZXIsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgIHRoaXMuX2N0eC5jbG9zZVBhdGgoKTtcbiAgICAgIHRoaXMuX2N0eC5maWxsKCk7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9LCB0aGlzLl9jYXJ0ZXNpYW5PcHRpb25zLmRyYXdEZWxheSAqIGluZGV4KTtcbiAgICB0aGlzLl9kcmF3SW50ZXJ2YWxzLnB1c2goaW50ZXJ2YWwpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIHRoaXMuX2RyYXdJbnRlcnZhbHMuZm9yRWFjaChpbnRlcnZhbCA9PiBjbGVhckludGVydmFsKGludGVydmFsKSk7XG4gICAgdGhpcy5fZHJhd0ludGVydmFscyA9IFtdO1xuICAgIHRoaXMuX2N0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgdGhpcy5fY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMud2lkdGgpO1xuICAgIHRoaXMuX2NyZWF0ZUNhcnRlc2lhbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlQ2FydGVzaWFuKCkge1xuICAgIC8vIENlbnRlclxuICAgIHRoaXMuX2N0eC50cmFuc2xhdGUodGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XG4gICAgdGhpcy5fY3R4LnNjYWxlKHRoaXMuX2NhcnRlc2lhbk9wdGlvbnMuc2NhbGUsIHRoaXMuX2NhcnRlc2lhbk9wdGlvbnMuc2NhbGUpO1xuXG4gICAgLy8gQWRkIGFwc2lzIGJyYWNlIG9mIGxpbmVcbiAgICBpZiAodGhpcy5fY2FydGVzaWFuT3B0aW9ucy5vcGVuTGluZUluZm8pIHtcbiAgICAgIHRoaXMuX2FkZEJyYWNlSW5mb3JtYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hZGRCcmFjZUluZm9ybWF0aW9uKCkge1xuICAgIC8vIEFkZCBhcHNpcyBhbmQgb3JkaW5hdCBsaW5lXG4gICAgdGhpcy5fY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuX2N0eC5tb3ZlVG8oLXRoaXMuX2NhcnRlc2lhbk9wdGlvbnMubWF4QXBzaXMsIDApO1xuICAgIHRoaXMuX2N0eC5saW5lVG8odGhpcy5fY2FydGVzaWFuT3B0aW9ucy5tYXhBcHNpcywgMCk7XG4gICAgdGhpcy5fY3R4LnN0cm9rZSgpO1xuICAgIHRoaXMuX2N0eC5tb3ZlVG8oMCwgLXRoaXMuX2NhcnRlc2lhbk9wdGlvbnMubWF4T3JkaW5hdCk7XG4gICAgdGhpcy5fY3R4LmxpbmVUbygwLCB0aGlzLl9jYXJ0ZXNpYW5PcHRpb25zLm1heE9yZGluYXQpO1xuICAgIHRoaXMuX2N0eC5zdHJva2UoKTtcblxuICAgIC8vIEFkZCBhcHNpcyBhbmQgb3JkaW5hdCB0ZXh0XG4gICAgdGhpcy5fY3R4LmZvbnQgPSB0aGlzLl9nZW5lcmF0ZUZvbnQoKTtcbiAgICB0aGlzLl9jdHguZmlsbFRleHQoJyt4JywgdGhpcy5fY2FydGVzaWFuT3B0aW9ucy5tYXhBcHNpcyArIDEwLCA1KTtcbiAgICB0aGlzLl9jdHguZmlsbFRleHQoJy15JywgLTUsIHRoaXMuX2NhcnRlc2lhbk9wdGlvbnMubWF4T3JkaW5hdCArIDMwKTtcbiAgICB0aGlzLl9jdHguZmlsbFRleHQoJyt5JywgLTUsIC0odGhpcy5fY2FydGVzaWFuT3B0aW9ucy5tYXhPcmRpbmF0ICsgMjApKTtcbiAgICB0aGlzLl9jdHguZmlsbFRleHQoJy14JywgLSh0aGlzLl9jYXJ0ZXNpYW5PcHRpb25zLm1heEFwc2lzICsgMzApLCA1KTtcblxuICAgIHRoaXMuX2N0eC5mb250ID0gdGhpcy5fZ2VuZXJhdGVGb250KHRoaXMuX2NhcnRlc2lhbk9wdGlvbnMubGluZUZvbnRTaXplIC8gMik7XG5cbiAgICBjb25zdCBhcHNpc0JyYWNlQ291bnQgPSBNYXRoLmZsb29yKHRoaXMuX2NhcnRlc2lhbk9wdGlvbnMubWF4QXBzaXMgLyB0aGlzLl9jYXJ0ZXNpYW5PcHRpb25zLmJyYWNlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFwc2lzQnJhY2VDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCBhcHNpcyA9IChpICsgMSkgKiB0aGlzLl9jYXJ0ZXNpYW5PcHRpb25zLmJyYWNlO1xuICAgICAgdGhpcy5fY3R4LnN0cm9rZVJlY3QoYXBzaXMsIC00LCAxLCA5KTtcbiAgICAgIHRoaXMuX2N0eC5maWxsVGV4dChhcHNpcy50b1N0cmluZygpLCBhcHNpcyAtIDEwLCAtMTApO1xuICAgICAgdGhpcy5fY3R4LnN0cm9rZVJlY3QoLWFwc2lzLCAtNCwgMSwgOSk7XG4gICAgICB0aGlzLl9jdHguZmlsbFRleHQoJy0nICsgYXBzaXMudG9TdHJpbmcoKSwgLWFwc2lzIC0gMTAsIC0xMCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3JkaW5hdEJyYWNlQ291bnQgPSBNYXRoLmZsb29yKHRoaXMuX2NhcnRlc2lhbk9wdGlvbnMubWF4T3JkaW5hdCAvIHRoaXMuX2NhcnRlc2lhbk9wdGlvbnMuYnJhY2UpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3JkaW5hdEJyYWNlQ291bnQ7IGkrKykge1xuICAgICAgY29uc3Qgb3JkaW5hdCA9IChpICsgMSkgKiB0aGlzLl9jYXJ0ZXNpYW5PcHRpb25zLmJyYWNlO1xuICAgICAgdGhpcy5fY3R4LnN0cm9rZVJlY3QoLTQsIG9yZGluYXQsIDksIDEpO1xuICAgICAgdGhpcy5fY3R4LmZpbGxUZXh0KG9yZGluYXQudG9TdHJpbmcoKSwgMTAsIG9yZGluYXQgKyA0KTtcbiAgICAgIHRoaXMuX2N0eC5zdHJva2VSZWN0KC00LCAtb3JkaW5hdCwgOSwgMSk7XG4gICAgICB0aGlzLl9jdHguZmlsbFRleHQoJy0nICsgb3JkaW5hdC50b1N0cmluZygpLCAxMCwgLW9yZGluYXQgKyA0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZW5lcmF0ZUZvbnQoc2l6ZTogbnVtYmVyID0gdGhpcy5fY2FydGVzaWFuT3B0aW9ucy5saW5lRm9udFNpemUpIHtcbiAgICByZXR1cm4gYCR7c2l6ZX1weCAke3RoaXMuX2NhcnRlc2lhbk9wdGlvbnMubGluZUZvbnRUeXBlfWA7XG4gIH1cbn1cbiIsImltcG9ydCB7IENhcnRlc2lhbiwgQ2FydGVzaWFuT3B0aW9ucyB9IGZyb20gJy4vY2FydGVzaWFuJztcbmltcG9ydCB7IFNwaXJhbCB9IGZyb20gJy4vc3BpcmFsJztcbmltcG9ydCB7IFN1bkZsb3dlciB9IGZyb20gJy4vc3VuZmxvd2VyJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpYm9uYWNjaVBhdHRlcm4gZXh0ZW5kcyBDYXJ0ZXNpYW4ge1xuICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBjYXJ0ZXNpYW5PcHRpb25zOiBDYXJ0ZXNpYW5PcHRpb25zID0gbmV3IENhcnRlc2lhbk9wdGlvbnMoKSkge1xuICAgIHN1cGVyKGNhbnZhcywgY2FydGVzaWFuT3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgbWFrZVNwaXJhbChtYXhUaGV0YTogbnVtYmVyLCBsaW5lOiBudW1iZXIpIHtcbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgbmV3IFNwaXJhbChtYXhUaGV0YSwgbGluZSkuY3JlYXRlQ29vcmRpbmF0ZSgpLnRoZW4oY29vcmRpbmF0ZXMgPT4ge1xuICAgICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSwgaSkgPT4ge1xuICAgICAgICB0aGlzLmRyYXdQb2ludChjb29yZGluYXRlLngsIGNvb3JkaW5hdGUueSwgMiwgaSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBtYWtlU3VuZmxvd2VyKHNlZWQ6IG51bWJlcikge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICBuZXcgU3VuRmxvd2VyKHNlZWQpLmNyZWF0ZVNlZWRzKCkudGhlbihzZWVkcyA9PiB7XG4gICAgICBzZWVkcy5mb3JFYWNoKChzZWVkLCBpKSA9PiB7XG4gICAgICAgIHRoaXMuZHJhd1BvaW50KHNlZWQueCwgc2VlZC55LCAwLjcsIGkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBGaWJvbmFjY2kge1xuICBwdWJsaWMgZmlib25hY2NpU2VxdWVuY2VzID0gKG46IG51bWJlcikgPT5cbiAgICBuZXcgUHJvbWlzZTxudW1iZXJbXT4ocmVzb2x2ZSA9PiB7XG4gICAgICBuID0gTWF0aC5mbG9vcihuKTtcbiAgICAgIGNvbnN0IGZpYm9uYWNjaU51bWJlcnM6IG51bWJlcltdID0gWzAsIDFdO1xuICAgICAgd2hpbGUgKGZpYm9uYWNjaU51bWJlcnMubGVuZ3RoIDwgbikge1xuICAgICAgICBmaWJvbmFjY2lOdW1iZXJzLnB1c2goZmlib25hY2NpTnVtYmVyc1tmaWJvbmFjY2lOdW1iZXJzLmxlbmd0aCAtIDJdICsgZmlib25hY2NpTnVtYmVyc1tmaWJvbmFjY2lOdW1iZXJzLmxlbmd0aCAtIDFdKTtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZShmaWJvbmFjY2lOdW1iZXJzKTtcbiAgICB9KTtcblxuICBwdWJsaWMgY2FsY3VsYXRlUGhpID0gKG46IG51bWJlcikgPT5cbiAgICBuZXcgUHJvbWlzZTxudW1iZXI+KHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5maWJvbmFjY2lTZXF1ZW5jZXMobikudGhlbihudW1iZXJzID0+IHtcbiAgICAgICAgY29uc3QgcGhpID0gbnVtYmVyc1tudW1iZXJzLmxlbmd0aCAtIDFdIC8gbnVtYmVyc1tudW1iZXJzLmxlbmd0aCAtIDJdO1xuICAgICAgICByZXNvbHZlKHBoaSk7XG4gICAgICB9KTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IEZpYm9uYWNjaSB9IGZyb20gJy4vZmlib25hY2NpJztcbmltcG9ydCB7IFJBRElBTlMgfSBmcm9tICcuL3V0aWxzL21hdGgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNwaXJhbENvb3JkaW5hdGUge1xuICB0aGV0YTogbnVtYmVyO1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn1cbmNvbnN0IGE6IG51bWJlciA9IDAuMDAxO1xuY29uc3QgYjogbnVtYmVyID0gMC4wMDUzNDY4O1xuXG5leHBvcnQgY2xhc3MgU3BpcmFsIGV4dGVuZHMgRmlib25hY2NpIHtcbiAgcHJpdmF0ZSBfbWF4VGhldGE6IG51bWJlcjtcbiAgcHJpdmF0ZSBfbGluZTogbnVtYmVyO1xuICBjb25zdHJ1Y3RvcihtYXhUaGV0YTogbnVtYmVyLCBsaW5lOiBudW1iZXIgPSAxKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAobWF4VGhldGEgPCAwIHx8IGxpbmUgPCAxKSB7XG4gICAgICB0aHJvdyAnUGFyYW1ldGVycyBub3QgYWNjZXB0ZWQhJztcbiAgICB9XG4gICAgdGhpcy5fbWF4VGhldGEgPSBtYXhUaGV0YTtcbiAgICB0aGlzLl9saW5lID0gbGluZTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVDb29yZGluYXRlID0gKCkgPT5cbiAgICBuZXcgUHJvbWlzZTxTcGlyYWxDb29yZGluYXRlW10+KHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgY29vcmRpbmF0ZXM6IFNwaXJhbENvb3JkaW5hdGVbXSA9IFtdO1xuICAgICAgZm9yIChsZXQgbGluZSA9IDE7IGxpbmUgPD0gdGhpcy5fbGluZTsgbGluZSsrKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbWF4VGhldGE7IGkrKykge1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2godGhpcy5fY2FsY3VsYXRlKGksIGxpbmUpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXNvbHZlKGNvb3JkaW5hdGVzKTtcbiAgICB9KTtcblxuICBwcml2YXRlIF9jYWxjdWxhdGUgPSAoaTogbnVtYmVyLCBsaW5lOiBudW1iZXIgPSAxKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRoZXRhOiBpLFxuICAgICAgeDogYSAqIE1hdGguY29zKFJBRElBTlMoaSkpICogTWF0aC5leHAoYiAqIGkpICogbGluZSxcbiAgICAgIHk6IGEgKiBNYXRoLnNpbihSQURJQU5TKGkpKSAqIE1hdGguZXhwKGIgKiBpKSAqIGxpbmUsXG4gICAgfSBhcyBTcGlyYWxDb29yZGluYXRlO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgRmlib25hY2NpIH0gZnJvbSAnLi9maWJvbmFjY2knO1xuaW1wb3J0IHsgUkFESUFOUyB9IGZyb20gJy4vdXRpbHMvbWF0aCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VlZCB7XG4gIGRpc3RhbmNlOiBudW1iZXI7XG4gIHRoZXRhOiBudW1iZXI7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgU3VuRmxvd2VyIGV4dGVuZHMgRmlib25hY2NpIHtcbiAgcHJpdmF0ZSBfbnVtYmVyT2ZTZWVkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IobnVtYmVyT2ZTZWVkOiBudW1iZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX251bWJlck9mU2VlZCA9IG51bWJlck9mU2VlZDtcbiAgICBpZiAobnVtYmVyT2ZTZWVkIDwgMSkge1xuICAgICAgdGhyb3cgJ1BhcmFtZXRlcnMgbm90IGFjY2VwdGVkISc7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNyZWF0ZVNlZWRzID0gKCkgPT5cbiAgICBuZXcgUHJvbWlzZTxTZWVkW10+KHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5jYWxjdWxhdGVQaGkodGhpcy5fbnVtYmVyT2ZTZWVkIC8gMTApLnRoZW4ocGhpID0+IHtcbiAgICAgICAgY29uc3QgZ29sZGVuQW5nbGUgPSAzNjAgLSAzNjAgLyBwaGk7XG4gICAgICAgIGNvbnN0IHNlZWRzOiBTZWVkW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9udW1iZXJPZlNlZWQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHByZXZpb3VzU2VlZCA9IHNlZWRzW2kgLSAxXTtcbiAgICAgICAgICBjb25zdCBzZWVkID0ge1xuICAgICAgICAgICAgZGlzdGFuY2U6IE1hdGguc3FydChpICsgMSksXG4gICAgICAgICAgICB0aGV0YTogcHJldmlvdXNTZWVkID8gcHJldmlvdXNTZWVkLnRoZXRhICsgZ29sZGVuQW5nbGUgOiAwLFxuICAgICAgICAgIH0gYXMgU2VlZDtcblxuICAgICAgICAgIHNlZWQueCA9IHNlZWQuZGlzdGFuY2UgKiBNYXRoLmNvcyhSQURJQU5TKHNlZWQudGhldGEpKTtcbiAgICAgICAgICBzZWVkLnkgPSBzZWVkLmRpc3RhbmNlICogTWF0aC5zaW4oUkFESUFOUyhzZWVkLnRoZXRhKSk7XG5cbiAgICAgICAgICBzZWVkcy5wdXNoKHNlZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzb2x2ZShzZWVkcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBSQURJQU5TKGRlZ3JlZXM6IG51bWJlcikge1xuICByZXR1cm4gZGVncmVlcyAqIChNYXRoLlBJIC8gMTgwKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=