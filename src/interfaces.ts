export { Vue, VueConstructor } from 'vue/types/vue'
export { Plugin as VuexPlugin, Store } from 'vuex/types/index'
export interface Option {
	storage?: Storage
	stringify?(obj: any): string
	parse?(str: String): any
	namespace: string
	keys?: string[]
}
export interface lsStorage {
	set(value: any)
	get(): any
	exists(): boolean
}
