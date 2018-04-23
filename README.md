# vuejs-storage

> vue.js and vuex plugin to persistence data with localStorage/sessionStorage

[![npm](https://img.shields.io/npm/v/vuejs-storage.svg?style=flat-square)](https://www.npmjs.com/package/vuejs-storage)
[![Travis](https://img.shields.io/travis/maple3142/vuejs-storage.svg?style=flat-square)](https://travis-ci.org/maple3142/vuejs-storage)
[![codecov](https://img.shields.io/codecov/c/github/maple3142/vuejs-storage.svg?style=flat-square)](https://codecov.io/gh/maple3142/vuejs-storage)

## Usage

```js
//in webpack environment:
import vuejsStorage from 'vuejs-storage'
//in browser script tag:
const vuejsStorage = window.vuejsStorage

Vue.use(vuejsStorage)

//vue example
new Vue({
  //...
  data: {
    count: 0,
    text: ''
  },
  storage: {
    keys: ['count'],
    //keep data.count in localStorage
    namespace: 'my-namespace'
  }
})

//vuex example
const store = new Vuex.Store({
  //state...
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  plugins: [
    vuejsStorage({
      keys: ['count'],
      //keep state.count in localStorage
      namespace: 'my-namespace',
      storage: sessionStorage
      //if you want to use sessionStorage instead of localStorage
    })
  ]
})
```

## Nested key

```javascript
data: {
  a: {
    b: 1,
    c: 2
  }
},
storage: {
  namespace: 'test',
  keys: ['a.b']
  //only keep a.b in localStorage
}
```

## Vuex modules

```javascript
state: {
  a: 1
},
modules: {
  moduleA: {
    state: {
      a: 2
    }
  }
},
plugins: [
  vuejsStorage({
    namespace: 'test',
    keys: ['moduleA','a']
    // keep both root's state.a & moduleA's state
  })
]
```

## Multiple storage

```javascript
data: {
  a: 1,
  b: 2
},
storage: [
  {
    namespace: 'test',
    keys: ['a']
  },
  {
    namespace: 'test',
    keys: ['b'],
    storage: sessionStorage
  }
]
```

## API

### `vuejsStorage`

**Vue** plugin

```javascript
Vue.use(vuejsStorage)
```

### `vuejsStorage(option)`

Create a **Vuex** plugin

```javascript
const vuexplugin = vuejsStorage(/* option object*/)
```

### `option`

Option object, can be used when create **Vuex** plugin or in **Vue** option `storage` field

```javascript
{
  keys: [], //array of string
  /*
  this option is different when use in vue and vuex
  when used in Vue constructor option, keys means which data should be keep in localStorage
  when used in Vuex plugin, keys mean which state should be keep in localStorage
  */
  storage: sessionStorage, //any object has 'setItem' 'getItem' api, default: localStorage
  namespace: 'ns', //a string, REQUIRED
  parse: JSON.parse, //deserialize function, default: JSON.parse
  stringify: JSON.stringify, //serialize function, default: JSON.stringify
  merge: _assign //a function to merge object like Object.assign, default: internal implementation(src/assign.ts)
}
```

## Examples

* [Counter](https://rawgit.com/maple3142/vuejs-storage/master/example.html)
* [maple3142/TodoList](https://github.com/maple3142/TodoList)
