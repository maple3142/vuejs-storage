import { Store, VuexPlugin, Option } from './interfaces'
import { copy } from './objpath'
import LSStorage from './lsstorage'

import assign from './assign'

/**
 * Create Vuex plugin
 */
export function createVuexPlugin(option: Option): VuexPlugin<Object> {
	const ls = new LSStorage(option)
	const { keys, merge, namespace: ns } = option
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
			ls.set(ns, data)
		}
		store.replaceState(merge ? merge(store.state, data) : assign(store.state, data)) //merge state
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
