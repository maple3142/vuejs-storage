import * as plugin from '../src/install'
import Vue from 'vue/dist/vue.min.js'

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.use(plugin)

const div = document.createElement('div')
div.id = 'appinstall'
document.body.appendChild(div)

let vm: any
describe('plugin', () => {
	before(() => {
		localStorage.clear()
	})
	it('data in storage should be accessible', () => {
		vm = new Vue({
			el: '#appinstall',
			data: {
				a: 1,
				b: 2
			},
			storage: {
				namespace: 'vue1',
				keys: ['a']
			},
			template: `{{a}}`
		})
		vm.a.should.equal(1)
	})
	it('data should be store as json in localStorage', () => {
		localStorage.getItem('vue1').should.equal(JSON.stringify({ a: 1 }))
	})
	it('data can be change', done => {
		vm.a = 2
		vm.a.should.equal(2)
		setTimeout(done, 0) //vue's watch is not synchronous
	})
	it('data can be load from localStorage', () => {
		vm.$destroy()
		vm = new Vue({
			el: '#appinstall',
			data: {
				a: 1,
				b: 2
			},
			storage: {
				namespace: 'vue1',
				keys: ['a']
			},
			template: `{{a}}`
		})
		vm.a.should.equal(2)
	})
	it('can handle nested key', done => {
		vm.$destroy()
		vm = new Vue({
			el: '#appinstall',
			data: {
				a: { b: { c: 5 } },
				d: 123
			},
			storage: {
				namespace: 'vue2',
				keys: ['a.b.c']
			},
			template: `{{a}}`
		})
		setTimeout(() => {
			JSON.parse(localStorage.vue2).should.deep.equal({ a: { b: { c: 5 } } })
			done()
		}, 0)
	})
})
