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
	let cur = obj
	for (let i = 0; i < paths.length - 1; i++) {
		const pname = paths[i]
		if (!cur.hasOwnProperty(pname)) cur[pname] = {}
		cur = cur[pname]
	}
	cur[paths[paths.length - 1]] = value
}
export function copy(dest: object, source: object, path: string): void {
	set(dest, path, get(source, path))
}
