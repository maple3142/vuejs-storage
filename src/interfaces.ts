export { Vue, VueConstructor } from 'vue/types/vue'
export { Plugin as VuexPlugin, Store } from 'vuex/types/index'
export interface StorageDriver {
	set: (key: string, value: any) => void
	get: (key: string) => any
	has: (key: string) => boolean
}
export interface Option {
	keys: string[]
	namespace: string
	merge?: (obj1: object, ...object) => object //default=internal merge function
	driver?: StorageDriver //default=localStorageDriver
}
export type StorageOption = Option | Option[]
export type StorageOptionWithFactory = StorageOption | (() => StorageOption)
