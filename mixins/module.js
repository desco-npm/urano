import RouteMixin from './route'

export default {
  mixins: [ RouteMixin, ],
  computed: {
    Module () {
      return this.$route.meta.moduleMenu ? this.$route : this.getParentRoute()
    },
    moduleTitle () {
      return (this.Module.meta || {}).title
    },
    moduleName () {
      return (this.Module.meta || {}).name
    },
    moduleIcon () {
      return (this.Module.meta || {}).name
    },
    moduleDescription () {
      return (this.Module.meta || {}).description
    }
  },
  methods: {
    listModules () {
      return this.getChildrensByRoute('Base')
    },
    listMenuModules () {
      return this.listModules().filter(r => r.meta.moduleMenu)
    },
  },
}