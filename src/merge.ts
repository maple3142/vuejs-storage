// a simple object merge function implementation
export const isobj = x => typeof x === 'object' && !Array.isArray(x) && x !== null
const merge = (target, source) => {
	for (const key of Object.keys(source)) {
		if (isobj(source[key])) {
			if (!(key in target)) {
				target[key] = source[key]
			} else {
				merge(target[key], source[key])
			}
		} else {
			target[key] = source[key]
		}
	}
	return target
}
export default merge
