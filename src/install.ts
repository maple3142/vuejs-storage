import { VueConstructor, Option } from './interfaces'

import { createLSStorage } from './lsstorage'

import * as assign from 'object-assign'

export function install(Vue: VueConstructor) {
	Vue.mixin({
		beforeCreate() {
			if ('storage' in this.$options) {
				let option: Option = this.$options.storage

				const ls = createLSStorage(option)

				let optdata = this.$options.data || {}
				if (this.$options.data instanceof Function) {
					//data(){...} syntax
					optdata = this.$options.data.apply(this)
				}

				let data = null
				if (!ls.has(option.namespace)) {
					const tmp = {}
					option.keys.forEach(k => (tmp[k] = optdata[k]))
					data = tmp
					ls.setItem(option.namespace, data)
				} else {
					data = ls.getItem(option.namespace)
				}

				this.$options.data = assign(optdata, data) //merge storage's data into data

				//if no 'watch' option
				if (!('watch' in this.$options)) {
					this.$options.watch = {}
				}
				for (const key of option.keys) {
					//create watchers
					let watcher: Function = null
					if (key in this.$options.watch) {
						//backup original watcher
						watcher = <Function>this.$options.watch[key]
					}
					this.$options.watch[key] = value => {
						data[key] = value
						ls.setItem(option.namespace, data)
						if (watcher !== null) watcher.call(this, value)
					}
				}
			}
		}
	})
}
