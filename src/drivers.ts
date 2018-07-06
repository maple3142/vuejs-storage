import { StorageDriver } from './interfaces'
export default class StroageDriverImpl implements StorageDriver {
	private storage
	constructor(storage: Storage) {
		this.storage = storage
	}
	set(key: string, value: any) {
		this.storage.setItem(key, JSON.stringify(value))
	}
	get(key: string) {
		return JSON.parse(this.storage.getItem(key))
	}
	has(key: string) {
		return !!this.storage.getItem(key)
	}
}
export const localStorage = new StroageDriverImpl(window.localStorage)
export const sessionStorage = new StroageDriverImpl(window.sessionStorage)
