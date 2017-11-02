import { Option, lsStorage } from './interfaces'

/**
 * Create customize localStorage
 */
export function createLSStorage({
	storage = window.localStorage,
	stringify = JSON.stringify,
	parse = JSON.parse
}: Option): lsStorage {
	return {
		setItem(key, value) {
			storage.setItem(key, stringify(value))
		},
		removeItem(key) {
			storage.removeItem(key)
		},
		getItem(key) {
			return parse(storage.getItem(key))
		}
	}
}