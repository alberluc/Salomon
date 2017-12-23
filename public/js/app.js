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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _App = __webpack_require__(1);\n\nvar App = new _App.AppModel();\n\nif (document.readyState !== 'loading') {\n    App.init();\n} else {\n    document.addEventListener('DOMContentLoaded', App.init.bind(App));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9hc3NldHMvanMvYXBwLmpzPzhiOTUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwTW9kZWwgfSBmcm9tICcuL2NvbXBvbmVudHMvQXBwJ1xyXG5cclxubGV0IEFwcCA9IG5ldyBBcHBNb2RlbCgpO1xyXG5cclxuaWYoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKXtcclxuICAgIEFwcC5pbml0KCk7XHJcbn1cclxuZWxzZXtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBBcHAuaW5pdC5iaW5kKEFwcCkpO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGFzc2V0cy9qcy9hcHAuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.AppModel = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Map2D = __webpack_require__(2);\n\nvar _SleepMode = __webpack_require__(3);\n\nvar _runningMap = __webpack_require__(4);\n\nvar _runningMap2 = _interopRequireDefault(_runningMap);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar AppModel = exports.AppModel = function () {\n    function AppModel() {\n        _classCallCheck(this, AppModel);\n    }\n\n    _createClass(AppModel, [{\n        key: 'init',\n        value: function init() {\n            this.initMap();\n            this.initSleepMode();\n        }\n    }, {\n        key: 'initMap',\n        value: function initMap() {\n            var Map2D = new _Map2D.Map2DModel(_runningMap2.default);\n        }\n    }, {\n        key: 'initSleepMode',\n        value: function initSleepMode() {\n            var SleepMode = new _SleepMode.SleepModeModel(1000, document.body, 'sleepMode-active');\n            SleepMode.watch([{\n                target: document,\n                event: 'click'\n            }, {\n                target: document,\n                event: 'mousemove'\n            }]);\n        }\n    }]);\n\n    return AppModel;\n}();\n\n;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9hc3NldHMvanMvY29tcG9uZW50cy9BcHAuanM/MGU2YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXAyRE1vZGVsIH0gZnJvbSAnLi9NYXAyRCdcclxuaW1wb3J0IHsgU2xlZXBNb2RlTW9kZWwgfSBmcm9tICcuL1NsZWVwTW9kZSdcclxuXHJcbmltcG9ydCBSdW5uaW5nTWFwQ29uZmlnIGZyb20gJy4vLi4vLi4vZGF0YXMvcnVubmluZy1tYXAtMDEnXHJcblxyXG5leHBvcnQgY2xhc3MgQXBwTW9kZWwge1xyXG5cclxuICAgIGluaXQgKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdE1hcCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFNsZWVwTW9kZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRNYXAgKCkge1xyXG4gICAgICAgIGxldCBNYXAyRCA9IG5ldyBNYXAyRE1vZGVsKFJ1bm5pbmdNYXBDb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRTbGVlcE1vZGUgKCkge1xyXG4gICAgICAgIGxldCBTbGVlcE1vZGUgPSBuZXcgU2xlZXBNb2RlTW9kZWwoMTAwMCwgZG9jdW1lbnQuYm9keSwgJ3NsZWVwTW9kZS1hY3RpdmUnKTtcclxuICAgICAgICBTbGVlcE1vZGUud2F0Y2goW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IGRvY3VtZW50LFxyXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdjbGljaydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBkb2N1bWVudCxcclxuICAgICAgICAgICAgICAgIGV2ZW50OiAnbW91c2Vtb3ZlJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBhc3NldHMvanMvY29tcG9uZW50cy9BcHAuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUNBOzs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUZBO0FBS0E7Ozs7OztBQUVBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Map2DModel = exports.Map2DModel = function Map2DModel(el, config) {\n    _classCallCheck(this, Map2DModel);\n\n    this.el = el;\n    this.config = config;\n};\n\n;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9hc3NldHMvanMvY29tcG9uZW50cy9NYXAyRC5qcz8zMDZmIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNYXAyRE1vZGVsIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoZWwsIGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuZWwgPSBlbDtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBhc3NldHMvanMvY29tcG9uZW50cy9NYXAyRC5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar SleepModeModel = exports.SleepModeModel = function () {\n    function SleepModeModel(durationBeforeSleep, elementChangeStateOnSleepMode, classNameSleepMode) {\n        _classCallCheck(this, SleepModeModel);\n\n        this.durationBeforeSleep = durationBeforeSleep;\n        this.watcher = null;\n        this.isActive = false;\n        this.elementChangeStateOnSleepMode = elementChangeStateOnSleepMode;\n        this.classNameSleepMode = classNameSleepMode;\n    }\n\n    _createClass(SleepModeModel, [{\n        key: \"watch\",\n        value: function watch(listeners) {\n            var _this = this;\n\n            this.listeners = listeners;\n            this.listeners.forEach(function (listener) {\n                _this.setWatcher(listener);\n            });\n            this.startWatcher();\n        }\n    }, {\n        key: \"setWatcher\",\n        value: function setWatcher(listener) {\n            listener.target.addEventListener(listener.event, this.onClientSignal.bind(this));\n        }\n    }, {\n        key: \"startWatcher\",\n        value: function startWatcher() {\n            var _this2 = this;\n\n            this.watcher = setTimeout(function () {\n                _this2.enableSleepMode();\n            }, this.durationBeforeSleep);\n        }\n    }, {\n        key: \"resetWatcher\",\n        value: function resetWatcher() {\n            clearTimeout(this.watcher);\n        }\n    }, {\n        key: \"restartWatcher\",\n        value: function restartWatcher() {\n            this.resetWatcher();\n            this.startWatcher();\n        }\n    }, {\n        key: \"onClientSignal\",\n        value: function onClientSignal() {\n            if (this.isActive) this.disableSleepMode();\n            this.restartWatcher();\n        }\n    }, {\n        key: \"enableSleepMode\",\n        value: function enableSleepMode() {\n            this.isActive = true;\n            this.elementChangeStateOnSleepMode.classList.add(this.classNameSleepMode);\n        }\n    }, {\n        key: \"disableSleepMode\",\n        value: function disableSleepMode() {\n            this.isActive = false;\n            this.elementChangeStateOnSleepMode.classList.remove(this.classNameSleepMode);\n        }\n    }]);\n\n    return SleepModeModel;\n}();\n\n;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9hc3NldHMvanMvY29tcG9uZW50cy9TbGVlcE1vZGUuanM/NTI0MSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU2xlZXBNb2RlTW9kZWwge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChkdXJhdGlvbkJlZm9yZVNsZWVwLCBlbGVtZW50Q2hhbmdlU3RhdGVPblNsZWVwTW9kZSwgY2xhc3NOYW1lU2xlZXBNb2RlKSB7XHJcbiAgICAgICAgdGhpcy5kdXJhdGlvbkJlZm9yZVNsZWVwID0gZHVyYXRpb25CZWZvcmVTbGVlcDtcclxuICAgICAgICB0aGlzLndhdGNoZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRDaGFuZ2VTdGF0ZU9uU2xlZXBNb2RlID0gZWxlbWVudENoYW5nZVN0YXRlT25TbGVlcE1vZGU7XHJcbiAgICAgICAgdGhpcy5jbGFzc05hbWVTbGVlcE1vZGUgPSBjbGFzc05hbWVTbGVlcE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgd2F0Y2ggKGxpc3RlbmVycykge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gbGlzdGVuZXJzO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4geyB0aGlzLnNldFdhdGNoZXIobGlzdGVuZXIpIH0pO1xyXG4gICAgICAgIHRoaXMuc3RhcnRXYXRjaGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0V2F0Y2hlciAobGlzdGVuZXIpIHtcclxuICAgICAgICBsaXN0ZW5lci50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lci5ldmVudCwgdGhpcy5vbkNsaWVudFNpZ25hbC5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0V2F0Y2hlciAoKSB7XHJcbiAgICAgICAgdGhpcy53YXRjaGVyID0gc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuZW5hYmxlU2xlZXBNb2RlKCkgfSwgdGhpcy5kdXJhdGlvbkJlZm9yZVNsZWVwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFdhdGNoZXIgKCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLndhdGNoZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3RhcnRXYXRjaGVyICgpIHtcclxuICAgICAgICB0aGlzLnJlc2V0V2F0Y2hlcigpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRXYXRjaGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGllbnRTaWduYWwgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKSB0aGlzLmRpc2FibGVTbGVlcE1vZGUoKTtcclxuICAgICAgICB0aGlzLnJlc3RhcnRXYXRjaGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlU2xlZXBNb2RlICgpIHtcclxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRDaGFuZ2VTdGF0ZU9uU2xlZXBNb2RlLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc05hbWVTbGVlcE1vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVTbGVlcE1vZGUgKCkge1xyXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRDaGFuZ2VTdGF0ZU9uU2xlZXBNb2RlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc05hbWVTbGVlcE1vZGUpO1xyXG4gICAgfVxyXG5cclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gYXNzZXRzL2pzL2NvbXBvbmVudHMvU2xlZXBNb2RlLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///3\n");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = {\n    units: [{\n        label: 'kilomètres',\n        key: 'km'\n    }],\n    distance: '32km',\n    hideAltitude: '1100km',\n    map: {\n        0: {\n            altitude: '1330km'\n        },\n        50: {\n            altitude: '1423km',\n            flag: {\n                key: ''\n            }\n        },\n        100: {\n            altitude: '1286km'\n        }\n    }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9hc3NldHMvZGF0YXMvcnVubmluZy1tYXAtMDEuanM/OGQxOCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICB1bml0czogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdraWxvbcOodHJlcycsXHJcbiAgICAgICAgICAgIGtleTogJ2ttJyxcclxuICAgICAgICB9XHJcbiAgICBdLFxyXG4gICAgZGlzdGFuY2U6ICczMmttJyxcclxuICAgIGhpZGVBbHRpdHVkZTogJzExMDBrbScsXHJcbiAgICBtYXA6IHtcclxuICAgICAgICAwOiB7XHJcbiAgICAgICAgICAgIGFsdGl0dWRlOiAnMTMzMGttJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgNTA6IHtcclxuICAgICAgICAgICAgYWx0aXR1ZGU6ICcxNDIza20nLFxyXG4gICAgICAgICAgICBmbGFnOiB7XHJcbiAgICAgICAgICAgICAgICBrZXk6ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIDEwMDoge1xyXG4gICAgICAgICAgICBhbHRpdHVkZTogJzEyODZrbSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gYXNzZXRzL2RhdGFzL3J1bm5pbmctbWFwLTAxLmpzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBREE7QUFWQTtBQVRBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///4\n");

/***/ })
/******/ ]);