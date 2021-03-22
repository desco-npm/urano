import appMixin from './app'

export default {
  mixins: [ appMixin, ],
  computed: {
    pageSwiped () {
      return this.$route.meta.touchSwipe
    },
  },
  methods: {
    touchSwipe (e) {
      const direction = e.direction

      if (!this.pageSwiped) return

      const routeNames = this.$router.options.routes[0].children.map(i => i.name)

      const currentPos = routeNames.indexOf(this.appName)
      const newPos = currentPos + (direction === 'left' ? 1 : -1)
      const newRouteName = routeNames[newPos]

      if (!this.pageSwipedByName(newRouteName)) return

      this.$router.push({ name: newRouteName, })
    },
    pageSwipedByName (name) {
      const route = this.$router.options.routes[0].children.filter(i => i.name === name)[0]

      return route === undefined ? false : route.meta.touchSwipe
    },
  },
}
