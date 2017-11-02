import { Store, VuexPlugin, Option } from './interfaces'

import { createLSStorage } from './lsstorage'
import { assign } from './assign'

/**
 * Create Vuex plugin
 */
export function createVuexPlugin(option: Option): VuexPlugin<Object> {
	const ls = createLSStorage(option)
	return (store: Store<Object>) => {
		let data = store.state
		data = assign(data, ls.getItem(option.namespace)) //merge data
		store.replaceState(data) //set state
		store.subscribe((mutation, state) => {
			ls.setItem(option.namespace, state)
		})
	}
}