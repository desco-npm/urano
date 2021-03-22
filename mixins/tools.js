export default {
  methods: {
    addTool (name, tool) {
      this.addTools({ [name]: tool, })
    },
    addTools (tools) {
      this.$store.commit('LayoutTools/add', tools)
    },
    getTool (name) {
      return this.getTools()[name]
    },
    getTools () {
      return this.$store.state.LayoutTools.tools
    },
  },
}