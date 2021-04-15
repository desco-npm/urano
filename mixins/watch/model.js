export default {
  data() {
    return {
      data: '',
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.$emit('input', this.data)
      },
    },
  },
}