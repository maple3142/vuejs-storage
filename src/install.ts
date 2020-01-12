import { Vue, VueConstructor, Option } from './interfaces'
import { set, copy } from './objpath'
import { localStorage } from './drivers'
import defaultMerge from './merge'

function applyPersistence(vm, option: Option) {
	const { keys, merge = defaultMerge, namespace: ns, driver = localStorage } = option

	let originaldata = {}
	for (const k of keys) {
		copy(originaldata, vm, k)
	}

	let data = null
	if (driver.has(ns)) {
		data = driver.get(ns)
	} else {
		const tmp = {}
		for (const k of keys) {
			copy(tmp, originaldata, k)
		}
		data = tmp
		driver.set(ns, data)
	}
	data = merge(originaldata, data)
	for (const k of keys) {
		copy(vm, data, k)
		vm.$watch(k, {
			handler: value => {
				set(data, k, value)
				driver.set(ns, data)
			},
			deep: true
		})
	}
}

export function install(Vue: VueConstructor) {
	Vue.mixin({
		created() {
			function cloneOptions(options: Option, ref: any) {
				const clonedOptions: Option = {
					keys: [],
					namespace: ''
				}
				for (var prop in options) {
					if (options.hasOwnProperty(prop)) {
						if (prop === 'namespaceFactory') {
							clonedOptions['namespace'] = options[prop](ref)
						} else {
							clonedOptions[prop] = options[prop]
						}
					}
				}
				return clonedOptions
			}
			if ('storage' in this.$options) {
				const options: Option | Option[] = this.$options.storage
				if (Array.isArray(options)) options.forEach(opt => applyPersistence(this, cloneOptions(opt, this)))
				else applyPersistence(this, cloneOptions(options, this))
			}
		}
	})
}
