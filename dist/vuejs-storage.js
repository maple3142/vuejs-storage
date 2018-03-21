(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.vuejsStorage = factory());
}(this, (function () { 'use strict';

    /**
     * Create customize localStorage
     */
    function createLSStorage(_a) {
        var _b = _a.storage, storage = _b === void 0 ? window.localStorage : _b, _c = _a.stringify, stringify = _c === void 0 ? JSON.stringify : _c, _d = _a.parse, parse = _d === void 0 ? JSON.parse : _d, namespace = _a.namespace;
        return {
            set: function (value) {
                storage.setItem(namespace, stringify(value));
            },
            get: function () {
                return parse(storage.getItem(namespace));
            },
            exists: function () {
                return storage.getItem(namespace) != null;
            }
        };
    }

    function get(obj, path) {
        return path
            .replace(/\[([^[\]]*)\]/g, '.$1.')
            .split('.')
            .filter(function (t) { return t !== ''; })
            .reduce(function (prev, cur) { return prev && prev[cur]; }, obj);
    }
    function set(obj, path, value) {
        var paths = path
            .replace(/\[([^[\]]*)\]/g, '.$1.')
            .split('.')
            .filter(function (t) { return t !== ''; });
        var cur = obj;
        for (var i = 0; i < paths.length - 1; i++) {
            var pname = paths[i];
            if (!cur.hasOwnProperty(pname))
                cur[pname] = {};
            cur = cur[pname];
        }
        cur[paths[paths.length - 1]] = value;
    }
    function copy(dest, source, path) {
        set(dest, path, get(source, path));
    }

    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    /* eslint-disable no-unused-vars */
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
    	if (val === null || val === undefined) {
    		throw new TypeError('Object.assign cannot be called with null or undefined');
    	}

    	return Object(val);
    }

    function shouldUseNative() {
    	try {
    		if (!Object.assign) {
    			return false;
    		}

    		// Detect buggy property enumeration order in older V8 versions.

    		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
    		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
    		test1[5] = 'de';
    		if (Object.getOwnPropertyNames(test1)[0] === '5') {
    			return false;
    		}

    		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    		var test2 = {};
    		for (var i = 0; i < 10; i++) {
    			test2['_' + String.fromCharCode(i)] = i;
    		}
    		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
    			return test2[n];
    		});
    		if (order2.join('') !== '0123456789') {
    			return false;
    		}

    		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    		var test3 = {};
    		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
    			test3[letter] = letter;
    		});
    		if (Object.keys(Object.assign({}, test3)).join('') !==
    				'abcdefghijklmnopqrst') {
    			return false;
    		}

    		return true;
    	} catch (err) {
    		// We don't expect any of the above to throw, but better to be safe.
    		return false;
    	}
    }

    var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    	var from;
    	var to = toObject(target);
    	var symbols;

    	for (var s = 1; s < arguments.length; s++) {
    		from = Object(arguments[s]);

    		for (var key in from) {
    			if (hasOwnProperty.call(from, key)) {
    				to[key] = from[key];
    			}
    		}

    		if (getOwnPropertySymbols) {
    			symbols = getOwnPropertySymbols(from);
    			for (var i = 0; i < symbols.length; i++) {
    				if (propIsEnumerable.call(from, symbols[i])) {
    					to[symbols[i]] = from[symbols[i]];
    				}
    			}
    		}
    	}

    	return to;
    };

    function install(Vue) {
        Vue.mixin({
            created: function () {
                if ('storage' in this.$options) {
                    var option = this.$options.storage;
                    var keys = option.keys, merge = option.merge;
                    var ls_1 = createLSStorage(option);
                    var optdata = {};
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var k = keys_1[_i];
                        copy(optdata, this, k);
                    }
                    var data_1 = null;
                    if (ls_1.exists()) {
                        data_1 = ls_1.get();
                    }
                    else {
                        var tmp = {};
                        for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
                            var k = keys_2[_a];
                            copy(tmp, optdata, k);
                        }
                        data_1 = tmp;
                        ls_1.set(data_1);
                    }
                    data_1 = merge ? merge(optdata, data_1) : objectAssign(optdata, data_1);
                    var _loop_1 = function (k) {
                        copy(this_1, data_1, k);
                        this_1.$watch(k, function (value) {
                            set(data_1, k, value);
                            ls_1.set(data_1);
                        });
                    };
                    var this_1 = this;
                    for (var _b = 0, keys_3 = keys; _b < keys_3.length; _b++) {
                        var k = keys_3[_b];
                        _loop_1(k);
                    }
                }
            }
        });
    }

    /**
     * Create Vuex plugin
     */
    function createVuexPlugin(option) {
        var ls = createLSStorage(option);
        var keys = option.keys, merge = option.merge;
        return function (store) {
            var data = null;
            if (ls.exists()) {
                data = ls.get();
            }
            else {
                var tmp = {};
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var k = keys_1[_i];
                    copy(tmp, store.state, k);
                }
                data = tmp;
                ls.set(data);
            }
            store.replaceState(merge ? merge(store.state, data) : objectAssign(store.state, data)); //merge state
            store.subscribe(function (mutation, state) {
                var obj = {};
                keys.forEach(function (k) { return copy(obj, state, k); });
                ls.set(obj);
            });
        };
    }

    var vuejsStorage = function (option) {
        return createVuexPlugin(option);
    };
    vuejsStorage.install = install;

    return vuejsStorage;

})));
