// a simple object merge function implementation
export const isobj = x => typeof x === 'object' && !Array.isArray(x) && x !== null
const merge = (target, source) => {
	for (const key of Object.keys(source)) {
		if (!isobj(source[key])) {
			target[key] = source[key]
			continue
		}

		if (!(key in target)) {
			target[key] = source[key]
			continue
		}

		const targetValue = (typeof target[key] === 'undefined' || target[key] === null) ? {} : target[key]
		merge(targetValue, source[key])
	}
	return target
}
export default merge
