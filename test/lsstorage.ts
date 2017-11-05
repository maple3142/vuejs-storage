import { createLSStorage } from '../src/lsstorage'
const ls = createLSStorage({ storage: window.localStorage })
import 'mocha'

describe('lsstorage', () => {
	it('setItem', () => {
		ls.setItem('test', { a: 1, b: 2 })
	})
	it('getItem', () => {
		ls.getItem('test').should.equal({ a: 1, b: 2 })
	})
})