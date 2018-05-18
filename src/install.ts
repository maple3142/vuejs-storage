import { Vue, VueConstructor, Option } from './interfaces'
import LSStorage from './lsstorage'
import { set, copy } from './objpath'

import defaultMerge from './merge'

function applyPersistence(vm, option: Option) {
	const { keys, merge = defaultMerge, namespace: ns } = option

	const ls = new LSStorage(option)

	let originaldata = {}
	for (const k of keys) {
		copy(originaldata, vm, k)
	}

	let data = null
	if (ls.has(ns)) {
		data = ls.get(ns)
	} else {
		const tmp = {}
		for (const k of keys) {
			copy(tmp, originaldata, k)
		}
		data = tmp
		ls.set(ns, data)
	}
	data = merge(originaldata, data)
	for (const k of keys) {
		copy(vm, data, k)
		vm.$watch(k, {
			handler: value => {
				set(data, k, value)
				ls.set(ns, data)
			},
			deep: true
		})
	}
}

export function install(Vue: VueConstructor) {
	Vue.mixin({
		created() {
			if ('storage' in this.$options) {
				const option: Option | Option[] = this.$options.storage
				if (Array.isArray(option)) option.forEach(opt => applyPersistence(this, opt))
				else applyPersistence(this, option)
			}
		}
	})
}
