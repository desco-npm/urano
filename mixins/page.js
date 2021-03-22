export default {
  computed: {
    pageName () {
      return this.$route.name
    },
    pageTitle () {
      return this.$route.meta.title
    },
  },
}
