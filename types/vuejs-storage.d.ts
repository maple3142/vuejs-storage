/* main.js */
import Vue from 'vue'
import Vuex from 'vuex'
import { Plugin as VuexPlugin } from 'vuex/types/index'
interface Option {
	namespace: string,
	storage?: Storage,
	stringify?(obj: any): string,
	parse?(str: String): any
}
interface StorageOption extends Option {
	data?: object
}

/* entry.js */
export = vuejsStorage

declare function vuejsStorage(option: Option): VuexPlugin<object>
declare namespace vuejsStorage {
	function install(Vue: Vue, config?: Object): void
}

/* override vue option */
declare module "vue/types/options" {
	interface ComponentOptions<V extends Vue> {
		storage?: StorageOption
	}
}