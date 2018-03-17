import { Store, VuexPlugin, Option } from './interfaces'

import { createLSStorage } from './lsstorage'

import * as assign from 'object-assign'

/**
 * Create Vuex plugin
 */
export function createVuexPlugin(option: Option): VuexPlugin<Object> {
	const ls = createLSStorage(option)
	return (store: Store<Object>) => {
		let data = null
		if (!ls.exists()) {
			data = store.state
			ls.set(data)
		} else {
			data = ls.get()
		}
		store.replaceState(assign(store.state, data)) //merge state
		store.subscribe((mutation, state) => {
			const obj = {}
			option.keys.forEach(k => (obj[k] = state[k]))
			ls.set(obj)
		})
	}
}
