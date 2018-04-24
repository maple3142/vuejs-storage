import * as plugin from '../src/install'
import Vue from 'vue/dist/vue.min.js'

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.use(plugin)

let vm: any
describe('plugin', () => {
	before(() => {
		localStorage.clear()
	})
	it('data should be store as json in localStorage', () => {
		vm = new Vue({
			data: {
				a: 1,
				b: 2
			},
			storage: {
				namespace: 'vue1',
				keys: ['a']
			}
		})
		vm.a.should.equal(1)
		JSON.parse(localStorage.getItem('vue1')).should.deep.equal({ a: 1 })
	})
	it('data can be change', done => {
		vm.a = 2
		vm.a.should.equal(2)
		vm.$nextTick(() => {
			JSON.parse(localStorage.getItem('vue1')).should.deep.equal({ a: 2 })
			done()
		})
	})
	it('data will be load from localStorage', () => {
		vm.$destroy()
		vm = new Vue({
			data: {
				a: 1,
				b: 2
			},
			storage: {
				namespace: 'vue1',
				keys: ['a']
			}
		})
		vm.a.should.equal(2)
	})
	it('can handle nested key', () => {
		vm.$destroy()
		vm = new Vue({
			data: {
				a: { b: { c: 5 } },
				d: 123
			},
			storage: {
				namespace: 'vue2',
				keys: ['a.b.c']
			}
		})
		JSON.parse(localStorage.getItem('vue2')).should.deep.equal({ a: { b: { c: 5 } } })
	})
	it('nested key can be change', done => {
		vm.a.b.c = 8
		vm.$nextTick(() => {
			JSON.parse(localStorage.getItem('vue2')).should.deep.equal({ a: { b: { c: 8 } } })
			done()
		})
	})
	it('can handle object', done => {
		vm.$destroy()
		localStorage.setItem('vue3', JSON.stringify({ a: { b: { c: 4 } } }))
		vm = new Vue({
			data: {
				a: { b: { c: 5 } }
			},
			storage: {
				namespace: 'vue3',
				keys: ['a']
			}
		})
		vm.$nextTick(() => {
			JSON.parse(localStorage.getItem('vue3')).should.deep.equal({ a: { b: { c: 4 } } })
			done()
		})
	})
	it('merge fn works', () => {
		vm.$destroy()
		vm = new Vue({
			data: {
				a: { b: { c: 5 } }
			},
			storage: {
				namespace: 'vue3', //merge fn only called if key exists
				keys: ['a'],
				merge: () => ({
					a: 123
				})
			}
		})
		vm.a.should.equal(123)
	})
	it('multiple storage', () => {
		vm.$destroy()
		vm = new Vue({
			data: {
				a: 1,
				b: 2
			},
			storage: [
				{
					namespace: 'vue4',
					keys: ['a']
				},
				{
					namespace: 'vue4',
					keys: ['b'],
					storage: sessionStorage
				}
			]
		})
		localStorage.getItem('vue4').should.equal(JSON.stringify({ a: 1 }))
		sessionStorage.getItem('vue4').should.equal(JSON.stringify({ b: 2 }))
	})
})
