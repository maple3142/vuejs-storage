import { createVuexPlugin } from '../src/vuexplugin'
import Vue from 'vue/dist/vue.min.js'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.use(Vuex)
const div = document.createElement('div')
div.id = 'appvuexplugin'
let vm
describe('vuexplugin', () => {
	it('first', done => {
		const store = new Vuex.Store({
			state: {
				count: 1
			},
			mutations: {
				inc: (state: any) => state.count++
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest',
					keys: ['count']
				})
			]
		})
		vm = new Vue({
			computed: {
				count() {
					return this.$store.state.count
				}
			},
			template: `<span ref="count">{{count}}</span>`,
			mounted() {
				this.$refs.count.innerHTML.should.equal('1')
				this.$store.commit('inc')
				done()
			},
			store
		}).$mount(div)
	})
	it('second', done => {
		vm.$destroy()
		const store = new Vuex.Store({
			state: {
				count: 1
			},
			mutations: {
				inc: (state: any) => state.count++
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest',
					keys: ['count']
				})
			]
		})
		vm = new Vue({
			computed: {
				count() {
					return this.$store.state.count
				}
			},
			template: `<span ref="count">{{count}}</span>`,
			mounted() {
				this.$refs.count.innerHTML.should.equal('2')
				done()
			},
			store
		}).$mount(div)
	})
})
