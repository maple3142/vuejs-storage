import { VueConstructor, Option } from './interfaces'

import { createLSStorage } from './lsstorage'

import * as assign from 'object-assign'

export function install(Vue: VueConstructor) {
	Vue.mixin({
		created() {
			if ('storage' in this.$options) {
				const option: Option = this.$options.storage
				const { keys, merge } = option

				const ls = createLSStorage(option)

				let optdata = {};
				for (const k of keys) {
					optdata[k] = this[k]
				}

				let data = null
				if (ls.exists()) {
					data = ls.get()
				} else {
					const tmp = {}
					for (const k of keys) {
						tmp[k] = optdata[k]
					}
					data = tmp
					ls.set(data)
				}
				data = merge ? merge(optdata, data) : assign(optdata, data)

				for (const k of keys) {
					this[k] = data[k]
					this.$watch(k, (value) => {
						data[k] = value
						ls.set(data)
					})
				}
			}
		}
	});
}
