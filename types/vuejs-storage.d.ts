/* main.js */
import Vue from 'vue/types/index'
import Vuex from 'vuex/types/index'
import { Plugin as VuexPlugin } from 'vuex/types/index'
import { StorageDriver, Option } from '../src/interfaces'
import { vjs } from '../src/index'

/* entry.js */
export = vjs

/* override vue option */
declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		storage?: Option | Option[]
	}
}
