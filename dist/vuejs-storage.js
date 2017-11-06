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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create customize localStorage
 */
function createLSStorage({ storage = window.localStorage, stringify = JSON.stringify, parse = JSON.parse }) {
    return {
        setItem(key, value) {
            storage.setItem(key, stringify(value));
        },
        removeItem(key) {
            storage.removeItem(key);
        },
        getItem(key) {
            return parse(storage.getItem(key));
        }
    };
}
exports.createLSStorage = createLSStorage;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const install_1 = __webpack_require__(2);
const vuexplugin_1 = __webpack_require__(3);
const vuejsStorage = function (option) {
    return vuexplugin_1.createVuexPlugin(option);
};
vuejsStorage.install = install_1.install;
module.exports = vuejsStorage;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lsstorage_1 = __webpack_require__(0);
const assign = Object.assign;
function install(Vue) {
    Vue.mixin({
        beforeCreate() {
            if ('storage' in this.$options) {
                let option = this.$options.storage;
                if (this.$options.storage instanceof Function) {
                    option = this.$options.storage.apply(this);
                }
                const ls = lsstorage_1.createLSStorage(option);
                option.data = assign(option.data, ls.getItem(option.namespace));
                ls.setItem(option.namespace, option.data);
                let data = this.$options.data || {};
                if (this.$options.data instanceof Function) {
                    data = this.$options.data.apply(this);
                }
                this.$options.data = assign(data, option.data); //merge storage's data into data
                //if no 'watch' option
                if (!('watch' in this.$options)) {
                    this.$options.watch = {};
                }
                for (let key in option.data) {
                    let watcher;
                    if (key in this.$options.watch) {
                        watcher = this.$options.watch[key];
                    }
                    this.$options.watch[key] = value => {
                        option.data[key] = value;
                        ls.setItem(option.namespace, option.data);
                        watcher.call(this, value);
                    };
                }
            }
        }
    });
}
exports.install = install;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lsstorage_1 = __webpack_require__(0);
const assign = Object.assign;
/**
 * Create Vuex plugin
 */
function createVuexPlugin(option) {
    const ls = lsstorage_1.createLSStorage(option);
    return (store) => {
        let data = store.state;
        data = assign(data, ls.getItem(option.namespace)); //merge data
        store.replaceState(data); //set state
        store.subscribe((mutation, state) => {
            ls.setItem(option.namespace, state);
        });
    };
}
exports.createVuexPlugin = createVuexPlugin;


/***/ })
/******/ ]);
});
//# sourceMappingURL=vuejs-storage.js.map