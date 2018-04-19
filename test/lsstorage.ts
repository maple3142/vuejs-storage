import LSStorage from '../src/lsstorage'
const ls = new LSStorage({ namespace: 'test' })
import { should } from 'chai'

describe('lsstorage', () => {
	const obj = { a: 1, b: 2 }
	it('set', () => {
		ls.set('test', obj)
	})
	it('get', () => {
		ls.get('test').should.deep.equal(obj)
	})
	it('has', () => {
		ls.has('test').should.equal(true)
		ls.has('test2').should.equal(false)
	})
})
