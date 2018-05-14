import merge, { isobj } from '../src/merge'

class Test {}
;(<any>Test.prototype).value = 123
const obj1 = { a: 5, c: 7 }
const obj2 = new Test()
const obj3 = 'test'
Object.defineProperty(obj1, '__proto__', {
	enumerable: false,
	value: { x: 456 }
})
const obj4 = { a: { b: 7 } }
const obj5 = { a: { c: 6 }, x: 3 }

const objass = (<any>Object).assign

describe('merge', () => {
	it('isobj', () => {
		isobj({}).should.be.true
		isobj('').should.be.false
		isobj([]).should.be.false
		isobj(null).should.be.false
		isobj(undefined).should.be.false
	})
	it('2 value', () => {
		const expected = objass(obj1, obj2)
		const result = merge(obj1, obj2)
		result.should.deep.equal(expected)
	})
	it('3 value', () => {
		const expected = objass(obj1, obj2, obj3)
		const result = merge(obj1, obj2, <any>obj3)
		result.should.deep.equal(expected)
	})
	it('deep', () => {
		const expected = { a: { b: 7, c: 6 }, x: 3 }
		const result = merge(obj4, obj5)
		result.should.deep.equal(expected)
	})
	it('array no merging', () => {
		merge({ arr: [{ a: 1, b: 2 }, { a: 3, b: 4 }], b: 4 }, { c: 5 }).should.deep.equal({
			arr: [{ a: 1, b: 2 }, { a: 3, b: 4 }],
			b: 4,
			c: 5
		})
	})
})
