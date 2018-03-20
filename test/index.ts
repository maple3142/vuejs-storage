import * as vuejsStorage from '../src/index'
import { install } from '../src/install'
import { createVuexPlugin } from '../src/vuexplugin'

const vjs = <any>vuejsStorage
describe('plugin entry', () => {
	it('install() should be same', () => [
		vjs.install.should.equal(install)
	])
	it('vuex plugin should be same', () => {
		const opt = { namespace: 'asd' }
		vjs(opt).toString().should.equal(createVuexPlugin(opt).toString())
	})
})
