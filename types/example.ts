/* open this file in VSCODE shouldn't have any error */

import vuejsStorage from '../'
import Vuex from 'vuex'
new Vuex.Store({
	plugins: [vuejsStorage({
		namespace: 'vuex-name'
	})]
})
import Vue from 'vue'
new Vue({
	storage: {
		namespace: ''
	}
})