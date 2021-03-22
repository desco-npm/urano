export default {
  computed: {
    isLogged () {
      return this.$route.name !== 'Login'
    },
  },
}
