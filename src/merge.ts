// a simple object merge function implementation
export const isobj = x => typeof x === 'object' && !Array.isArray(x) && x !== null
const merge = (o, o1) => {
	for (const k of Object.keys(o1)) {
		if (isobj(o1[k])) {
			if (!(k in o)) o[k] = o1[k]
			else merge(o[k], o1[k])
		} else o[k] = o1[k]
	}
	return o
}
export default merge
