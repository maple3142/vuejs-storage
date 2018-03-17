import { createLSStorage } from '../src/lsstorage'
const ls = createLSStorage({ namespace: 'test' })
import { should } from 'chai'

describe('lsstorage', () => {
	const obj = { a: 1, b: 2 }
	it('set', () => {
		ls.set(obj)
	})
	it('get', () => {
		ls.get().should.deep.equal(obj)
	})
})
