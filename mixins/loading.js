export default {
  data () {
    return {
      loadings: {},
    }
  },
  methods: {
    setLoading (name = 'app') {
      this.loadings[name] = this.$loading({
        text: 'Carregando',
      })
    },
    unsetLoading (name = 'app') {
      this.loadings[name].close()

      delete this.loadings[name]
    },
    getLoading (name = 'app') {
      return this.loadings[name]
    },
  },
}