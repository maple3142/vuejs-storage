import assign from 'lodash.assignin'

var count = 0

//default option
const defaults = {
	parse: JSON.parse,
	stringify: JSON.stringify,
	storage: window.localStorage,
	name: `vuejs-storage-${count++}`
}
/**
 * Data
 * @class
 */
class Data {
	/**
	 * Data constructor
	 * @constructor
	 * @param {Object} data data, same as "data" in vue options
	 * @param {Object=} option option object
	 * @param {String=} option.name name for Storage name, if not provide will auto generate a name by vuejs-storage count(unstable)
	 * @param {Storage=} option.storage localStorage/sessionStorage or something has similar api, default is window.localStorage
	 * @param {Function=} option.parse json parsing function, default is JSON.parse
	 * @param {Function=} option.stringify json stringifying function, default is JSON.stringify
	 */
	constructor(data, option = {}) {
		for (var k in defaults) {
			if (!(k in option)) {
				option[k] = defaults[k]
			}
		}
		this.option = option
		this.data = data
	}
}
const vuejsStorage = {
	/**
	 * Vue.js plugin
	 * @param {Vue} Vue 
	 * @param {Object=} config 
	 */
	install(Vue, config) {
		Vue.mixin({
			beforeCreate() {
				if ('storage' in this.$options) {
					if (typeof this.$options.storage === 'function') {
						this.$options.storage = this.$options.storage()
					}

					//storage object can be access from this.$storage
					this.$storage = this.$options.storage

					let { data, option } = this.$options.storage

					let tmp
					if ((tmp = option.storage.getItem(option.name)) !== null) {//if data exists
						data = assign(data, option.parse(tmp))//override
					}

					this.$options.data = assign(this.$options.data, data)//override

					option.storage.setItem(option.name, option.stringify(data))

					if (!('watch' in this.$options)) {
						this.$options.watch = {} //watch
					}
					Object.keys(data).forEach(k => {
						this.$options.watch[k] = v => { //update and save
							data[k] = v
							option.storage.setItem(option.name, option.stringify(data))
						}
					})
				}
			}
		})
	},
	Data
}

export default vuejsStorage