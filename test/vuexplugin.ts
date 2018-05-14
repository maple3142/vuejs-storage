import { createVuexPlugin } from '../src/vuexplugin'
import Vue from 'vue/dist/vue.runtime.min.js'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('vuexplugin', () => {
	it('first', () => {
		const store = new Vuex.Store({
			state: {
				count: 1
			},
			mutations: {
				inc: (state: any) => state.count++
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest1',
					keys: ['count']
				})
			]
		})
		store.state.count.should.equal(1)
		store.commit('inc')
		JSON.parse(localStorage.getItem('vuextest1')).should.deep.equal({
			count: 2
		})
	})
	it('second', () => {
		const store = new Vuex.Store({
			state: {
				count: 1
			},
			mutations: {
				inc: (state: any) => state.count++
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest1',
					keys: ['count']
				})
			]
		})
		store.state.count.should.equal(2)
	})
	it('can handle nested key', () => {
		const store = new Vuex.Store({
			state: {
				a: { b: { c: 5 } },
				d: 123
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest2',
					keys: ['a.b.c']
				})
			]
		})
		JSON.parse(localStorage.getItem('vuextest2')).should.deep.equal({
			a: { b: { c: 5 } }
		})
	})
	it('merge fn works', () => {
		const store = new Vuex.Store({
			state: {
				a: { b: { c: 5 } },
				d: 123
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest2',
					keys: ['a'],
					merge: () => ({ a: 3 })
				})
			]
		})
		store.state.should.deep.equal({ a: 3 })
	})
	it('modules', () => {
		const store = new Vuex.Store({
			state: {
				a: 1
			},
			modules: {
				moduleA: {
					state: {
						a: 7
					}
				}
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest3',
					keys: ['a', 'moduleA']
				})
			]
		})
		JSON.parse(localStorage.getItem('vuextest3')).should.deep.equal({
			a: 1,
			moduleA: { a: 7 }
		})
	})
	it("other state shouldn't be change", () => {
		const store = new Vuex.Store({
			state: {
				a: 1,
				b: 2
			},
			modules: {
				moduleA: {
					state: {
						a: 1,
						b: 2
					}
				}
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest4',
					keys: ['a', 'moduleA.a']
				})
			]
		})
		JSON.parse(localStorage.getItem('vuextest4')).should.deep.equal({
			a: 1,
			moduleA: { a: 1 }
		})
		store.state.should.deep.equal({ a: 1, b: 2, moduleA: { a: 1, b: 2 } })
	})
	it('complex #1', () => {
		const store = new Vuex.Store({
			state: {
				ar: [{ value: 1 }, { value: 2 }],
				data: {
					data: {
						id: 123,
						value: 456
					},
					savedData: {
						id: 789,
						value: 101112,
						ar: [4, 5, 6, 7]
					}
				}
			},
			modules: {
				test: {
					state: {
						ar: [{ value: 1 }, { value: 2 }],
						wontBeSave: 1
					}
				}
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest5',
					keys: ['ar', 'test.ar']
				}),
				createVuexPlugin({
					namespace: 'vuextest5',
					storage: sessionStorage,
					keys: ['data.savedData']
				})
			]
		})
		JSON.parse(localStorage.getItem('vuextest5')).should.deep.equal({
			ar: [{ value: 1 }, { value: 2 }],
			test: {
				ar: [{ value: 1 }, { value: 2 }]
			}
		})
		JSON.parse(sessionStorage.getItem('vuextest5')).should.deep.equal({
			data: {
				savedData: {
					id: 789,
					value: 101112,
					ar: [4, 5, 6, 7]
				}
			}
		})
	})
})
