# vuejs-storage
*vue.js and vuex plugin to persistence data with localStorage/sessionStorage*

[![Build Status](https://travis-ci.org/maple3142/vuejs-storage.svg?branch=master)](https://travis-ci.org/maple3142/vuejs-storage)


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
    //data here won't be saved
  },
  storage: {
    data: {
      count: 0//this will be saved in localStorage
    },
    namespace: 'my-namespace',
  }
})

//vuex example
const store = new Vuex.Store({
  //state...
  plugins: [
    vuejsStorage({
      //don't use "data" here
      namespace: 'my-namespace',
      storage: window.sessionStorage //if you want to use sessionStorage instead of localStorage
    })
  ]
})
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
const vuexplugin=vuejsStorage(/* option object*/)
```

### `option`

Option object, can be used when create **Vuex** plugin or in **Vue** option `storage` field

```javascript
{
  data: {
    //Vue data object,REQUIRED only in Vue's storage field
  },
  storage: sessionStorage, //any object has 'setItem' 'getItem' api, default: localStorage
  namespace: 'ns', //a string, REQUIRED
  parse: JSON.parse, //deserialize function, default: JSON.parse
  stringify: JSON.stringify //serialize function, default: JSON.stringify
}
```

## [Example](https://rawgit.com/maple3142/vuejs-storage/master/example.html)
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>example</title>
  <script src="dist/vuejs-storage.js"></script>
  <!--import from cdn-->
  <!--script src="https://unpkg.com/vuejs-storage"></script-->
  <script src="https://unpkg.com/vue"></script>
  <script src="https://unpkg.com/vuex"></script>
</head>

<body>
  <div id="app">
    <div>
      <span>Vue counter: {{count}}</span>
      <button @click="add">add</button>
    </div>
    <div>
      <span>Vuex counter: {{vuexcount}}</span>
      <button @click="vuexadd">add</button>
    </div>
  </div>
  <div id="app2">
    <div>
      <span>sessionStorage counter: {{count}} {{message}}</span>
      <button @click="add">add</button>
    </div>
  </div>
  <div>
    Try open this page in another tab.
  </div>
  <script>
    Vue.use(Vuex)
    Vue.use(vuejsStorage)

    const store = new Vuex.Store({
      state: {
        count: 0
      },
      mutations: {
        increment(state) {
          state.count++
        }
      },
      plugins: [
        vuejsStorage({ namespace: 'vuex-app' }) //call vuejsStorage with options will return a plugin
      ]
    })

    var app = new Vue({
      el: '#app',
      storage: { //provide options in storage
        data: {
          count: 0
        },
        namespace: 'app'
      },
      methods: {
        add: function () {
          this.count++
        },
        vuexadd: function () {
          store.commit('increment')
        }
      },
      computed: {
        vuexcount() {
          return store.state.count
        }
      }
    })

    //advanced example
    var app2 = new Vue({
      el: '#app2',
      data: {
        message: 'Hello'
      },
      storage: function () { //function syntax is ok
        return {
          data: {
            count: 0
          },
          storage: sessionStorage,
          namespace: 'app2'
        }
      },
      methods: {
        add: function () {
          this.count++
        }
      }
    })
  </script>
</body>

</html>
```

## Other Example

### [Persistant todo list](https://codepen.io/maple3142/full/MEagWw/)
