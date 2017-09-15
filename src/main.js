import assignIn from 'lodash.assignin'
import forEach from 'lodash.foreach'
import defaults from 'lodash.defaults'

var count = 0

/**
 * Data
 * @class
 */
class Data {
	/**
	 * Data constructor
	 * @constructor
	 * @param {Object} data data, same as "data" in vue options
	 * @param {Object=} options option object
	 * @param {String=} options.name name for Storage name, if not provide will auto generate a name by vuejs-storage count(unstable)
	 * @param {Storage=} options.storage localStorage/sessionStorage or something has similar api, default is window.localStorage
	 * @param {Function=} options.parse json parsing function, default is JSON.parse
	 * @param {Function=} options.stringify json stringifying function, default is JSON.stringify
	 */
	constructor(data, options={}) {
		this.option = defaults(options, {
			parse: JSON.parse,
			stringify: JSON.stringify,
			storage: window.localStorage,
			name: `vuejs-storage-${count++}`
		})
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
						this.$options.storage=this.$options.storage()
					}

					let { data, option } = this.$options.storage

					let tmp
					if ((tmp = option.storage.getItem(option.name)) !== null) {//if data exists
						data = assignIn(data, option.parse(tmp))//override
					}

					this.$options.data = assignIn(this.$options.data, data)//override

					if (!('watch' in this.$options)) {
						this.$options.watch = {} //watch
					}
					forEach(data, (v_dummy, k) => {
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