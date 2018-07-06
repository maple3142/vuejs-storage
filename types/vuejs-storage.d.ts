/* main.js */
import Vue from 'vue/types/index'
import Vuex from 'vuex/types/index'
import { Plugin as VuexPlugin } from 'vuex/types/index'
import { StorageDriver, Option } from '../src/interfaces'

/* entry.js */
export = vuejsStorage

declare function vuejsStorage(option: Option): VuexPlugin<any>
declare namespace vuejsStorage {
	function install(Vue: Vue): void
}

/* override vue option */
declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		storage?: Option | Option[]
	}
}
