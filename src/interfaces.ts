export { Vue, VueConstructor } from 'vue/types/vue'
export { Plugin as VuexPlugin, Store } from 'vuex/types/index'
export interface Option {
	storage?: Storage
	stringify?(obj: any): string
	parse?(str: String): any
	merge?(...obj: object[]): object
	namespace: string
	keys?: string[]
}
