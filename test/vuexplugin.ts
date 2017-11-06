import { createVuexPlugin } from '../src/vuexplugin'
import Vue from 'vue/dist/vue.min.js'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		count: 1
	},
	plugins: [createVuexPlugin({
		namespace: 'vuextest'
	})]
})
const div = document.createElement('div')
div.id = 'appvuexplugin'
document.body.appendChild(div)
describe('vuexplugin', () => {
	it('no error', done => {
		new Vue({
			el: '#appvuexplugin',
			computed: {
				count() {
					return store.state.count
				}
			},
			template: `<span ref="count">{{count}}</span>`,
			mounted() {
				this.$refs.count.innerHTML.should.equal('1')
				done()
			}
		})
	})
})

