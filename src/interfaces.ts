export { Vue, VueConstructor } from 'vue/types/vue'
export { Plugin as VuexPlugin, Store } from 'vuex/types/index'
export interface Option {
	storage?: Storage,
	stringify?(obj: any): string,
	parse?(str: String): any,
	namespace: string,
	keys?: string[]
}
export interface lsStorage {
	setItem(key: string, value: any)
	removeItem(key: string)
	getItem(key: string): any,
	has(key: string): boolean
}