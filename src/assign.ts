export function assign(dest: object, source: object): object {
	for (const k in source) {
		dest[k] = source[k]
	}
	return dest
}