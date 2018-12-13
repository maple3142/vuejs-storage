import merge, { isobj } from '../src/merge'

class Test {}
;(<any>Test.prototype).value = 123
const obj1 = { a: 5, c: 7 }
const obj2 = new Test()
Object.defineProperty(obj1, '__proto__', {
	enumerable: false,
	value: { x: 456 }
})
const obj4 = { a: { b: 7 } }
const obj5 = { a: { c: 6 }, x: { test: 8 } }

const objass = (<any>Object).assign
const clone = obj => objass({}, obj)

describe('merge', () => {
	it('isobj', () => {
		isobj({}).should.be.true
		isobj('').should.be.false
		isobj([]).should.be.false
		isobj(null).should.be.false
		isobj(undefined).should.be.false
	})
	it('2 value', () => {
		const expected = objass({}, obj1, obj2)
		const result = merge(clone(obj1), obj2)
		result.should.deep.equal(expected)
	})
	it('deep', () => {
		const expected = { a: { b: 7, c: 6 }, x: { test: 8 } }
		const result = merge(clone(obj4), obj5)
		result.should.deep.equal(expected)
	})
	it('do not merge array', () => {
		merge({ arr: [{ a: 1, b: 2 }, { a: 3, b: 4 }], b: 4 }, { c: 5 }).should.deep.equal({
			arr: [{ a: 1, b: 2 }, { a: 3, b: 4 }],
			b: 4,
			c: 5
		})
	})
})
