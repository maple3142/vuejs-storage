import { VueConstructor, StorageOption } from './interfaces'

import { createLSStorage } from './lsstorage'

const assign = (<any>Object).assign

export function install(Vue: VueConstructor) {
	Vue.mixin({
		beforeCreate() {
			if ('storage' in this.$options) {
				let option: StorageOption = this.$options.storage
				if (this.$options.storage instanceof Function) { //storage(){...} syntax	
					option = this.$options.storage.apply(this)
				}

				const ls = createLSStorage(option)
				option.data = assign(option.data, ls.getItem(option.namespace))
				ls.setItem(option.namespace, option.data)

				let data = this.$options.data || {}
				if (this.$options.data instanceof Function) { //data(){...} syntax
					data = this.$options.data.apply(this)
				}
				this.$options.data = assign(data, option.data) //merge storage's data into data

				//if no 'watch' option
				if (!('watch' in this.$options)) {
					this.$options.watch = {}
				}
				for (let key in option.data) {//create watchers
					let watcher: Function
					if (key in this.$options.watch) {//backup original watcher
						watcher = <Function>this.$options.watch[key]
					}
					this.$options.watch[key] = value => {
						option.data[key] = value
						ls.setItem(option.namespace, option.data)
						watcher.call(this, value)
					}
				}
			}
		}
	})
}