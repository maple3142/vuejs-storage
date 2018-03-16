import { createLSStorage } from '../src/lsstorage'
const ls = createLSStorage({ namespace: 'test' })
import { should } from 'chai'

describe('lsstorage', () => {
	const obj = { a: 1, b: 2 }
	it('setItem', () => {
		ls.setItem('test', obj)
	})
	it('getItem', () => {
		ls.getItem('test').should.deep.equal(obj)
	})
	it('removeItem', () => {
		ls.removeItem('test')
		should().equal(ls.getItem('test'), null)
	})
})
