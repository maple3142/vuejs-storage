vuejs-storage
==============
*vue.js plugin to provide binding with localStorage/sessionStorage*
--------------

[codepen example](https://codepen.io/maple3142/full/eGNMBK/)
[simple todo list](https://codepen.io/maple3142/full/MEagWw/)
-----------

html
-------------
```javascript
Vue.use(vuejsStorage)
var app = new Vue({
  el: "#app",
  storage: new vuejsStorage.Data( //new vuejsStorage.Data(data,options)
    {
      text: "" //default value, will present if no record exists
    },
    {
      name: "app1"
    }
  )
})
var app2 = new Vue({
  el: "#app2",
  storage: new vuejsStorage.Data(
    {
      text: ""
    },
    {
      name: "app2",
      storage: window.sessionStorage //use sessionStorage instead
    }
  )
})
```
```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vuejs-storage"></script>
<div id="app">
  localStorage: <input type="text" v-model="text">
</div>
<div id="app2">
  sessionStorage: <input type="text" v-model="text">
</div>
```

single file component
-----------------------
main.js:
```javascript
import Vue from 'vue'
import vuejsStorage from 'vuejs-storage'
Vue.use(vuejsStorage)
```
test.vue
```html
<template>
  <div>
    <input type="text" v-model="text">
  </div>
</template>
<script>
import {Data} from 'vuejs-storage'
export default {
  storage: new Data({
    text: ''
  },{
    name: 'test.vue storage'
  })
  //or function syntax
  /*
  storage(){
	  return new Data(....)
  }
  */
}
</script>
```

data object
-----------------
[https://vuejs.org/v2/api/#Options-Data](https://vuejs.org/v2/api/#Options-Data)

options object
-----------------
```javascript
{
	name: String, //name in storage, default: 'vuejs-storage-${count of }'
	storage: Storage, //localStorage/sessionStorage or anything has setItem/getItem, default: window.localStorage
	parse: Function, //json parse function, default: JSON.stringify
	stringify: Function //json stringify function, default: JSON.stringify
}
```