export { Vue, VueConstructor } from 'vue/types/vue'
export { Plugin as VuexPlugin, Store } from 'vuex/types/index'
export interface Option {
	storage?: Storage,
	stringify?(obj: any): string,
	parse?(str: String): any
}
export interface VuexOption extends Option{
	namespace: string
}
export interface StorageOption extends Option {
	namespace: string,
	data?: object
}
export interface lsStorage {
	setItem(key: string, value: any)
	removeItem(key: string)
	getItem(key: string): any
}