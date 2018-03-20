export function get(obj: object, path: string): any {
	return path
		.replace(/\[([^[\]]*)\]/g, '.$1.')
		.split('.')
		.filter(t => t !== '')
		.reduce((prev, cur) => prev && prev[cur], obj)
}
export function set(obj: object, path: string, value: any): void {
	const paths = path
		.replace(/\[([^[\]]*)\]/g, '.$1.')
		.split('.')
		.filter(t => t !== '')
	function _set(paths, cur) {
		const pname = paths.shift()
		if (paths.length === 0) {
			cur[pname] = value
		} else {
			if (!cur.hasOwnProperty(pname)) cur[pname] = {}
			_set(paths, cur[pname])
		}
	}
	_set(paths, obj)
}
export function copy(dest: object, source: object, path: string): void {
	set(dest, path, get(source, path))
}
