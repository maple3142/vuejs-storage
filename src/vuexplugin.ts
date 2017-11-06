import { Store, VuexPlugin, VuexOption } from './interfaces'

import { createLSStorage } from './lsstorage'

const assign = (<any>Object).assign

/**
 * Create Vuex plugin
 */
export function createVuexPlugin(option: VuexOption): VuexPlugin<Object> {
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