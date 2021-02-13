// a simple object merge function implementation
export const isobj = x => typeof x === 'object' && !Array.isArray(x) && x !== null && x !== undefined
const merge = (target, source) => {
	for (const key of Object.keys(source)) {
		if (isobj(source[key])) {
			if (!(key in target)) {
				target[key] = source[key]
			} else {
				const t = target[key] = target[key] || {}
				merge(t, source[key])
			}
		} else {
			target[key] = source[key]
		}
	}
	return target
}
export default merge
