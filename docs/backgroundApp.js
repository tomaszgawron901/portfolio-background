/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Application/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Application/app.ts":
/*!********************************!*\
  !*** ./src/Application/app.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = __webpack_require__(/*! ./canvas */ "./src/Application/canvas.ts");
function randn_bm() {
    var rand = 0;
    for (var i = 0; i < 3; i += 1) {
        rand += Math.random();
    }
    return rand / 3;
}
class BackgroundApp {
    constructor() {
        document.onvisibilitychange = () => { this.onVisibilityChange(); };
        window.onresize = () => { this.onWindowsResize(); };
        this.intervals = new Array();
        this.canvas = new canvas_1.default(window.innerWidth, window.innerHeight, 2, 50);
        document.body.appendChild(this.canvas.element);
        this.start();
    }
    start() {
        this.intervals.push(setInterval(() => {
            this.canvas.addCircle(Math.floor((randn_bm() * this.canvas.width)), Math.floor((randn_bm() * this.canvas.height)));
        }, 333));
        this.intervals.push(setInterval(() => {
            this.canvas.addCircle(Math.floor((randn_bm() * this.canvas.width)), Math.floor((randn_bm() * this.canvas.height)));
        }, 8888));
        this.intervals.push(setInterval(() => {
            this.canvas.addCircle(Math.floor((randn_bm() * this.canvas.width)), Math.floor((randn_bm() * this.canvas.height)));
        }, 6666));
        this.canvas.startDrawing();
    }
    stop() {
        while (this.intervals.length > 0) {
            clearInterval(this.intervals.pop());
        }
        this.canvas.stopDrawing();
    }
    onVisibilityChange() {
        if (document.visibilityState == "visible") {
            this.start();
        }
        else {
            this.stop();
        }
    }
    onWindowsResize() {
        this.stop();
        this.canvas.resizeCanvas(window.innerWidth, window.innerHeight);
        this.start();
    }
}
exports.BackgroundApp = BackgroundApp;


/***/ }),

/***/ "./src/Application/canvas.ts":
/*!***********************************!*\
  !*** ./src/Application/canvas.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const circleGroup_1 = __webpack_require__(/*! ./circleGroup */ "./src/Application/circleGroup.ts");
const circle_1 = __webpack_require__(/*! ./circle */ "./src/Application/circle.ts");
const roulette_1 = __webpack_require__(/*! ./roulette */ "./src/Application/roulette.ts");
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
class Canvas {
    constructor(width, height, step = 1, wavelenght = 100) {
        this.element = document.createElement('CANVAS');
        this.setSize(width, height);
        this.ctx = this.element.getContext('2d');
        this.colors = new roulette_1.default("#fc0303", "#fc5603", "#fca903", "#fce703", "#b1fc03", "#fce703", "#fca903", "#fc5603");
        this.groups = new Array();
        this.step = step;
        this.wavelenght = wavelenght;
    }
    resizeCanvas(width, height) {
        this.stopDrawing();
        this.setSize(width, height);
        this.groups = new Array();
        this.startDrawing();
    }
    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.halfWidth = Math.floor(this.width / 2);
        this.halfHeight = Math.floor(this.height / 2);
        this.diagonal = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
        this.element.width = width;
        this.element.height = height;
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    drawFrame() {
        this.groups.forEach(group => {
            this.ctx.drawImage(group.getImage(), 0, 0);
        });
    }
    addCircle(x, y) {
        let maxRadius = this.calculateDistanceToFurthestCorner(x, y);
        let newCircle = new circle_1.default(1, maxRadius, x, y);
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].pointInside(x, y)) {
                continue;
            }
            this.groups[i].add(newCircle);
            return;
        }
        let newCircleGroup = new circleGroup_1.default(newCircle, this.width, this.height);
        newCircleGroup.ctx.strokeStyle = this.colors.get();
        newCircleGroup.ctx.lineWidth = 5;
        this.groups.push(newCircleGroup);
    }
    calculateDistanceToFurthestCorner(x, y) {
        if (x < this.halfWidth) {
            if (y < this.halfHeight) {
                return distance(x, y, this.width, this.height);
            }
            else {
                return distance(x, y, this.width, 0);
            }
        }
        else {
            if (y < this.halfHeight) {
                return distance(x, y, 0, this.height);
            }
            else {
                return distance(x, y, 0, 0);
            }
        }
    }
    startDrawing() {
        if (this.interval) {
            return;
        }
        this.ctx.globalCompositeOperation = 'source-over';
        this.interval = setInterval(() => {
            this.groups.forEach(group => {
                group.circles.forEach(circle => {
                    circle.radius += this.step;
                });
            });
            if (this.groups.length > 0) {
                let firstCircle = this.groups[0].circles[0];
                if (firstCircle.radius >= firstCircle.maxRadius) {
                    this.groups.shift();
                }
            }
            this.clearCanvas();
            this.drawFrame();
        }, this.wavelenght);
    }
    stopDrawing() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
exports.default = Canvas;


/***/ }),

/***/ "./src/Application/circle.ts":
/*!***********************************!*\
  !*** ./src/Application/circle.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Circle {
    constructor(radius, maxRadius, x, y) {
        this.radius = radius;
        this.maxRadius = maxRadius;
        this.x = x;
        this.y = y;
    }
    pointInside(x, y) {
        let xDistance = Math.abs(this.x - x);
        if (xDistance > this.radius) {
            return false;
        }
        let yDistance = Math.abs(this.y - y);
        if (yDistance > this.radius) {
            return false;
        }
        let distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        return distance <= this.radius;
    }
}
exports.default = Circle;


/***/ }),

/***/ "./src/Application/circleGroup.ts":
/*!****************************************!*\
  !*** ./src/Application/circleGroup.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PI2 = Math.PI * 2;
class CircleGroup {
    constructor(firstCircle, canvasWidh, canvasHeight) {
        this.canvas = document.createElement('CANVAS');
        this.canvas.width = canvasWidh;
        this.canvas.height = canvasHeight;
        this._ctx = this.canvas.getContext('2d');
        this.circles = new Array();
        this.circles.push(firstCircle);
        this.largesCircle = firstCircle;
    }
    get ctx() {
        return this._ctx;
    }
    pointInside(x, y) {
        for (let i = 0; i < this.circles.length; i++) {
            if (this.circles[i].pointInside(x, y)) {
                return true;
            }
        }
        return false;
    }
    add(circle) {
        this.circles.push(circle);
    }
    getImage() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'source-over';
        this.circles.forEach(circle => {
            this.ctx.beginPath();
            this.ctx.arc(circle.x, circle.y, circle.radius, 0, PI2);
            this.ctx.closePath();
            this.ctx.stroke();
        });
        this.ctx.globalCompositeOperation = 'destination-out';
        this.circles.forEach(circle => {
            this.ctx.beginPath();
            this.ctx.arc(circle.x, circle.y, circle.radius, 0, PI2);
            this.ctx.closePath();
            this.ctx.fill();
        });
        return this.canvas;
    }
}
exports.default = CircleGroup;


/***/ }),

/***/ "./src/Application/roulette.ts":
/*!*************************************!*\
  !*** ./src/Application/roulette.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ListRoulette extends Array {
    constructor(...items) {
        super(...items);
    }
    get() {
        const tmp = this.shift();
        this.push(tmp);
        return tmp;
    }
}
exports.default = ListRoulette;


/***/ })

/******/ });