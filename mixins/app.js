import RouteMixin from './route'
import ModuleMixin from './module'

export default {
  mixins: [ RouteMixin, ModuleMixin ],
  computed: {
    App () {
      return this.$route.meta.appMenu ? this.$route : {}
    },
    appTitle () {
      return (this.App.meta || {}).title
    },
    appName () {
      return (this.App.meta || {}).name
    },
    appIcon () {
      return (this.App.meta || {}).icon
    },
    appDescription () {
      return (this.App.meta || {}).description
    }
  },
  methods: {
    listApps () {
      return this.App ? this.getChildrensByRoute(this.moduleName) : undefined
    },
    listMenuApps () {
      return [this.listApps() || []].filter(r => r.meta.appMenu)
    },
  },
}