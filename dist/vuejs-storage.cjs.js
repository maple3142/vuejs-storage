'use strict';

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

function parsePath(path) {
    return path
        .replace(/\[([^[\]]*)\]/g, '.$1.')
        .split('.')
        .filter(function (t) { return t !== ''; });
}
function get(obj, path) {
    return parsePath(path).reduce(function (prev, cur) { return prev && prev[cur]; }, obj);
}
function set(obj, path, value) {
    var paths = parsePath(path);
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

// a simple object merge function implementation
function assign (obj1) {
    var objs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objs[_i - 1] = arguments[_i];
    }
    for (var _a = 0, objs_1 = objs; _a < objs_1.length; _a++) {
        var obj2 = objs_1[_a];
        for (var k in obj2) {
            if (!obj2.hasOwnProperty(k))
                continue;
            obj1[k] = obj2[k];
        }
    }
    return obj1;
}

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
                data_1 = merge ? merge(optdata, data_1) : assign(optdata, data_1);
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
        store.replaceState(merge ? merge(store.state, data) : assign(store.state, data)); //merge state
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

module.exports = vuejsStorage;
