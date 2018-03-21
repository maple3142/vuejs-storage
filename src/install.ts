import { VueConstructor, Option } from './interfaces'
import { createLSStorage } from './lsstorage'
import { set, copy } from './objpath'

import assign from 'object-assign'

export function install(Vue: VueConstructor) {
	Vue.mixin({
		created() {
			if ('storage' in this.$options) {
				const option: Option = this.$options.storage
				const { keys, merge } = option

				const ls = createLSStorage(option)

				let optdata = {}
				for (const k of keys) {
					copy(optdata, this, k)
				}

				let data = null
				if (ls.exists()) {
					data = ls.get()
				} else {
					const tmp = {}
					for (const k of keys) {
						copy(tmp, optdata, k)
					}
					data = tmp
					ls.set(data)
				}
				data = merge ? merge(optdata, data) : assign(optdata, data)

				for (const k of keys) {
					copy(this, data, k)
					this.$watch(k, value => {
						set(data, k, value)
						ls.set(data)
					})
				}
			}
		}
	})
}
