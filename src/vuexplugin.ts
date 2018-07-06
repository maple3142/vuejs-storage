import { Store, VuexPlugin, Option } from './interfaces'
import { copy } from './objpath'
import { localStorage } from './drivers'
import defaultMerge from './merge'

/**
 * Create Vuex plugin
 */
export function createVuexPlugin(option: Option): VuexPlugin<object> {
	const { keys, merge = defaultMerge, namespace: ns, driver = localStorage } = option
	return (store: Store<object>) => {
		if (driver.has(ns)) {
			const data = driver.get(ns)
			store.replaceState(merge(store.state, data))
		} else {
			const data = {}
			for (const k of keys) {
				copy(data, store.state, k)
			}
			driver.set(ns, data)
		}
		store.subscribe((mutation, state) => {
			const data = {}
			for (const k of keys) {
				copy(data, state, k)
			}
			driver.set(ns, data)
		})
	}
}
