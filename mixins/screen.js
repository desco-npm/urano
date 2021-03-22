export default {
  data () {
    return {
      screen: {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        height: 0,
        width: 0,
      },
    }
  },
  mounted () {
    this.$q.screen.setSizes({ sm: 768, md: 992, lg: 1200, xl: 1920, })

    this.fetchScreens()
  },
  methods: {
    fetchScreens () {
      this.screen.size = this.$q.screen.name

      this.screen.xs = this.$q.screen.xs
      this.screen.sm = this.$q.screen.sm
      this.screen.md = this.$q.screen.md
      this.screen.lg = this.$q.screen.lg
      this.screen.xl = this.$q.screen.xl

      this.screen.height = screen.height
      this.screen.width = screen.width
    }
  },
  watch: {
    '$q.screen': {
      handler () {
        this.fetchScreens()
      },
      deep: true,
    }
  }
}
