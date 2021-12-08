import { VueMaskDirective, } from 'v-mask'

export default (Vue) => {
  Vue.directive('mask', VueMaskDirective)
}