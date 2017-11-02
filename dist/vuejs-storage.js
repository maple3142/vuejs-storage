(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vuejsStorage"] = factory();
	else
		root["vuejsStorage"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * Create customize localStorage
 */
function createLSStorage(_a) {
    var _b = _a.storage, storage = _b === void 0 ? window.localStorage : _b, _c = _a.stringify, stringify = _c === void 0 ? JSON.stringify : _c, _d = _a.parse, parse = _d === void 0 ? JSON.parse : _d;
    return {
        setItem: function (key, value) {
            storage.setItem(key, stringify(value));
        },
        removeItem: function (key) {
            storage.removeItem(key);
        },
        getItem: function (key) {
            return parse(storage.getItem(key));
        }
    };
}
exports.createLSStorage = createLSStorage;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function assign(dest, source) {
    for (var k in source) {
        dest[k] = source[k];
    }
    return dest;
}
exports.assign = assign;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var install_1 = __webpack_require__(3);
var vuexplugin_1 = __webpack_require__(4);
var vuejsStorage = function (option) {
    return vuexplugin_1.createVuexPlugin(option);
};
vuejsStorage.install = install_1.install;
module.exports = vuejsStorage;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var lsstorage_1 = __webpack_require__(0);
var assign_1 = __webpack_require__(1);
function install(Vue) {
    Vue.mixin({
        beforeCreate: function () {
            var _this = this;
            if ('storage' in this.$options) {
                var option_1 = this.$options.storage;
                if (this.$options.storage instanceof Function) {
                    option_1 = this.$options.storage.apply(this);
                }
                var ls_1 = lsstorage_1.createLSStorage(option_1);
                option_1.data = assign_1.assign(option_1.data, ls_1.getItem(option_1.namespace));
                var data = this.$options.data || {};
                if (this.$options.data instanceof Function) {
                    data = this.$options.data.apply(this);
                }
                this.$options.data = assign_1.assign(data, option_1.data); //merge storage's data into data
                //if no 'watch' option
                if (!('watch' in this.$options)) {
                    this.$options.watch = {};
                }
                var _loop_1 = function (key) {
                    var watcher = function () { };
                    if (key in this_1.$options.watch) {
                        watcher = this_1.$options.watch[key];
                    }
                    this_1.$options.watch[key] = function (value) {
                        option_1.data[key] = value;
                        ls_1.setItem(option_1.namespace, option_1.data);
                        watcher.call(_this, value);
                    };
                };
                var this_1 = this;
                for (var key in option_1.data) {
                    _loop_1(key);
                }
            }
        }
    });
}
exports.install = install;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var lsstorage_1 = __webpack_require__(0);
var assign_1 = __webpack_require__(1);
/**
 * Create Vuex plugin
 */
function createVuexPlugin(option) {
    var ls = lsstorage_1.createLSStorage(option);
    return function (store) {
        var data = store.state;
        data = assign_1.assign(data, ls.getItem(option.namespace)); //merge data
        store.replaceState(data); //set state
        store.subscribe(function (mutation, state) {
            ls.setItem(option.namespace, state);
        });
    };
}
exports.createVuexPlugin = createVuexPlugin;


/***/ })
/******/ ]);
});
//# sourceMappingURL=vuejs-storage.js.map