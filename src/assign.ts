// a simple object merge function implementation
export default function(obj1, ...objs) {
	for (const obj2 of objs) {
		for (const k in obj2) {
			if (!obj2.hasOwnProperty(k)) continue
			obj1[k] = obj2[k]
		}
	}
	return obj1
}
