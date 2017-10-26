import assign from 'lodash.assignin'

/**
 * Create customize localStorage
 * @param {Storage} storage a object should have setItem,getItem,removeItem, default: window.localStorage
 */
function create({
	storage = window.localStorage,
	stringify = JSON.stringify,
	parse = JSON.parse
} = {}) {
	return {
		setItem(key, value) {
			storage.setItem(key, stringify(value))
		},
		removeItem(key) {
			storage.removeItem(key)
		},
		getItem(key) {
			return parse(storage.getItem(key))
		}
	}
}

/**
 * Create Vuex plugin
 * @param {Object} option 
 */
function createVuexPlugin(option) {
	if (!('namespace' in option)) {
		throw new Error('namespace required')
	}
	const ls = create(option)
	return store => {
		let data = store.state
		data = assign(data, ls.getItem(option.namespace)) //merge data
		store.replaceState(data) //set state
		store.subscribe((mutation, state) => {
			ls.setItem(option.namespace, state)
		})
	}
}

function install(Vue, config) {
	Vue.mixin({
		beforeCreate() {
			if ('storage' in this.$options) {
				let option = this.$options.storage
				if (typeof option === 'function') { //storage(){...} syntax
					option = option.apply(this)
				}

				if (!('namespace' in option)) {
					throw new Error('namespace required')
				}
				if (!('namespace' in option)) {
					throw new Error('data required')
				}

				let ls = create(option)
				option.data = assign(option.data, ls.getItem(option.namespace))

				let data = this.$options.data || {}
				if (typeof data === 'function') { //data(){...} syntax
					data = data.apply(this)
				}
				this.$options.data = assign(data, option.data) //merge storage's data into data

				if (!('watch' in this.$options)) {
					this.$options.watch = {}
				}
				for (let key in option.data) {//create watchers
					let watcher = v => { }
					if (key in this.$options.watch) {//backup original watcher
						watcher = this.$options.watch[key]
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

export default { install, createVuexPlugin }