import { Store, VuexPlugin, Option } from './interfaces'

import { createLSStorage } from './lsstorage'

import * as assign from 'object-assign'

/**
 * Create Vuex plugin
 */
export function createVuexPlugin(option: Option): VuexPlugin<Object> {
	const ls = createLSStorage(option)
	const { keys, merge } = option
	return (store: Store<Object>) => {
		let data = null
		if (ls.exists()) {
			data = ls.get()
		} else {
			data = store.state
			ls.set(data)
		}
		store.replaceState(merge ? merge(store.state, data) : assign(store.state, data)) //merge state
		store.subscribe((mutation, state) => {
			const obj = {}
			keys.forEach(k => (obj[k] = state[k]))
			ls.set(obj)
		})
	}
}
