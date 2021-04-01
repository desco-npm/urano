export default {
  methods: {
    getRoutes () {
      return this.$router.options.routes
    },
    getRoute (name, routes) {
      if (!routes) {
        routes = this.getRoutes()
      }

      let route

      routes.every(r => {
        if (r.name === name) {
          route = r
        }
        else if (r.children) {
          route = this.getRoute(name, r.children)
        }

        return !route
      })

      return route
    },
    getChildrensByRoute (name) {
      return (this.getRoute(name) || {}).children
    },
    getParentRoute (name = this.$route.name, parent = {}) {
      const routes = parent.children || this.getRoutes()

      let route

      routes.every(r => {
        if (r.name === name) {
          route = parent
        }
        else if (r.children) {
          route = this.getParentRoute(name, r)
        }

        return !route
      })

      return route
    },
    go ({ name, }) {
      if (name === this.$route.name) return

      if (this.$route.meta.newTab) {
        const route = this.$router.resolve(this.getRoute(name))

        window.open(route.href, '_blank');
      }
      else {
        this.$router.push({ name, })
      }
    }
  },
}
