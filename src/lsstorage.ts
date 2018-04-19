import { Option, lsStorage } from './interfaces'

/**
 * Create customize localStorage
 */
export default class LSStorage {
	private storage: Storage
	private stringify: (any) => string
	private parse: (string) => any
	constructor({ storage = window.localStorage, stringify = JSON.stringify, parse = JSON.parse }: Option) {
		this.storage = storage
		this.stringify = stringify
		this.parse = parse
	}
	set(key, value) {
		this.storage.setItem(key, this.stringify(value))
	}
	get(key) {
		return this.parse(this.storage.getItem(key))
	}
	has(key) {
		return this.storage.getItem(key) != null
	}
}
