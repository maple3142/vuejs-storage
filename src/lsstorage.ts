import { Option, lsStorage } from './interfaces'

/**
 * Create customize localStorage
 */
export function createLSStorage({
	storage = window.localStorage,
	stringify = JSON.stringify,
	parse = JSON.parse,
	namespace
}: Option): lsStorage {
	return {
		set(value) {
			storage.setItem(namespace, stringify(value))
		},
		get() {
			return parse(storage.getItem(namespace))
		},
		exists() {
			return storage.getItem(namespace) != null
		}
	}
}
