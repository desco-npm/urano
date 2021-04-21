export default {
  computed: {
    pageName() {
      return this.$route.name
    },
    pageHumanName() {
      return this.$route.meta.name
    },
    pageTitle() {
      return this.$route.meta.title
    },
  },
}
