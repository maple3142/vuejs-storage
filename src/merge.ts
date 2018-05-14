// a simple object merge function implementation
export const isobj = x => typeof x === 'object' && !Array.isArray(x) && x !== null
function merge(obj1: object, ...objs: object[]) {
	for (const obj2 of objs) {
		for (const k in obj2) {
			if (!obj2.hasOwnProperty(k)) continue
			if (isobj(obj2[k])) merge(obj1[k], obj2[k])
			else obj1[k] = obj2[k]
		}
	}
	return obj1
}
export default merge
