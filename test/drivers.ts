import { localStorage, sessionStorage } from '../src/drivers'

describe('drivers', () => {
	it('localStorage', () => {
		localStorage.set('a', { a: 1 })
		localStorage.has('a').should.equal(true)
		localStorage.get('a').should.deep.equal({ a: 1 })
		localStorage.has('b').should.equal(false)
	})
	it('sessionStorage', () => {
		sessionStorage.set('a', { a: 1 })
		sessionStorage.has('a').should.equal(true)
		sessionStorage.get('a').should.deep.equal({ a: 1 })
		sessionStorage.has('b').should.equal(false)
	})
})
