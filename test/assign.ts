import assign from '../src/assign'

class Test {}
;(<any>Test.prototype).value = 123
const obj1 = { a: 5, c: 7 }
const obj2 = new Test()
const obj3 = 'test'
Object.defineProperty(obj1, '__proto__', {
	enumerable: false,
	value: { x: 456 }
})

const objass = (<any>Object).assign

describe('assign', () => {
	it('2 value', () => {
		const expected = objass(obj1, obj2)
		const result = assign(obj1, obj2)
		result.should.deep.equal(expected)
	})
	it('3 value', () => {
		const expected = objass(obj1, obj2, obj3)
		const result = assign(obj1, obj2, obj3)
		result.should.deep.equal(expected)
	})
})
