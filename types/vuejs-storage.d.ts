/* main.js */
import Vue from 'vue'
import Vuex from 'vuex'
import { Plugin as VuexPlugin } from 'vuex/types/index'
interface Option {
	namespace: String,
	storage?: Storage,
	stringify?(obj: any): String,
	parse?(str: String): any
}
interface StorageOption extends Option {
	data?: Object
}

/* entry.js */
export = vuejsStorage

declare function vuejsStorage(option: Option): VuexPlugin<Object>
declare namespace vuejsStorage {
	function install(Vue: Vue, config?: Object): void
}

/* override vue option */
declare module "vue/types/options" {
	interface ComponentOptions<V extends Vue> {
		storage?: StorageOption
	}
}