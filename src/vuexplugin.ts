import { Store, VuexPlugin, Option } from './interfaces'
import { copy } from './objpath'
import LSStorage from './lsstorage'

import assign from './assign'

/**
 * Create Vuex plugin
 */
export function createVuexPlugin(option: Option): VuexPlugin<Object> {
	const ls = new LSStorage(option)
	const { keys, merge = assign, namespace: ns } = option
	return (store: Store<Object>) => {
		let data = null
		if (ls.has(ns)) {
			data = ls.get(ns)
		} else {
			const obj = {}
			for (const k of keys) {
				copy(obj, store.state, k)
			}
			data = obj
		}
		store.replaceState(merge(store.state, data)) //merge state
		ls.set(ns, data)
		store.subscribe((mutation, state) => {
			const obj = {}
			for (const k of keys) {
				copy(obj, state, k)
			}
			data = obj
			ls.set(ns, obj)
		})
	}
}
