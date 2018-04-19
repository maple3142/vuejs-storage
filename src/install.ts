import { VueConstructor, Option } from './interfaces'
import LSStorage from './lsstorage'
import { set, copy } from './objpath'

import assign from './assign'

export function install(Vue: VueConstructor) {
	Vue.mixin({
		created() {
			if ('storage' in this.$options) {
				const option: Option = this.$options.storage
				const { keys, merge, namespace: ns } = option

				const ls = new LSStorage(option)

				let optdata = {}
				for (const k of keys) {
					copy(optdata, this, k)
				}

				let data = null
				if (ls.has(ns)) {
					data = ls.get(ns)
				} else {
					const tmp = {}
					for (const k of keys) {
						copy(tmp, optdata, k)
					}
					data = tmp
					ls.set(ns, data)
				}
				data = merge ? merge(optdata, data) : assign(optdata, data)

				for (const k of keys) {
					copy(this, data, k)
					this.$watch(k, {
						handler: value => {
							set(data, k, value)
							ls.set(ns, data)
						},
						deep: true
					})
				}
			}
		}
	})
}
