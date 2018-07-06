import { Vue, VueConstructor, VuexPlugin, StorageDriver } from './interfaces'

import { install } from './install'
import { createVuexPlugin } from './vuexplugin'
import * as drivers from './drivers'

export interface vjs {
	(): VuexPlugin<Object>
	install: (Vue: VueConstructor) => void
	drivers: { localStorage: StorageDriver; sessionStorage: StorageDriver }
}
const vuejsStorage = <vjs>function(option) {
	return createVuexPlugin(option)
}
vuejsStorage.install = install
vuejsStorage.drivers = drivers

export default vuejsStorage
