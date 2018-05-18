import { Store, VuexPlugin, Option } from './interfaces'
import { copy } from './objpath'
import LSStorage from './lsstorage'

import defaultMerge from './merge'

/**
 * Create Vuex plugin
 */
export function createVuexPlugin(option: Option): VuexPlugin<object> {
	const ls = new LSStorage(option)
	const { keys, merge = defaultMerge, namespace: ns } = option
	return (store: Store<object>) => {
		if (ls.has(ns)) {
			const data = ls.get(ns)
			store.replaceState(merge(store.state, data))
		} else {
			const data = {}
			for (const k of keys) {
				copy(data, store.state, k)
			}
			ls.set(ns, data)
		}
		store.subscribe((mutation, state) => {
			const data = {}
			for (const k of keys) {
				copy(data, state, k)
			}
			ls.set(ns, data)
		})
	}
}
