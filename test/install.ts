import * as plugin from '../src/install'
import Vue from 'vue/dist/vue.min.js'

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.use(plugin)

const div = document.createElement('div')
div.id = 'appinstall'
document.body.appendChild(div)

let app: any
describe('plugin', () => {
	before(() => {
		localStorage.clear()
	})
	it('data in storage should be accessible', () => {
		app = new Vue({
			el: '#appinstall',
			storage: {
				namespace: 'vue1',
				data: {
					a: 1
				}
			},
			template: `{{a}}`
		})
		app.a.should.equal(1)
	})
	it('data should be store as json in localStorage', () => {
		localStorage.getItem('vue1').should.equal(JSON.stringify({ a: 1 }))
	})
	it('data can be change', () => {
		app.a = 2
		app.a.should.equal(2)
	})
})