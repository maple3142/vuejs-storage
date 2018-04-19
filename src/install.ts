import { VueConstructor, Option } from './interfaces'
import LSStorage from './lsstorage'
import { set, copy } from './objpath'

import assign from './assign'

export function install(Vue: VueConstructor) {
	Vue.mixin({
		created() {
			if ('storage' in this.$options) {
				const option: Option = this.$options.storage
				const { keys, merge = assign, namespace: ns } = option

				const ls = new LSStorage(option)

				let optdata = {}
				for (const k of keys) {
					copy(optdata, this, k)
				}

				let data = null
				if (ls.has(ns)) {
					data = merge(optdata, ls.get(ns))
					ls.set(ns, data)
				} else {
					const tmp = {}
					for (const k of keys) {
						copy(tmp, optdata, k)
					}
					data = tmp
					ls.set(ns, data)
				}

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
