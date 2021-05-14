export default {
  data() {
    return {
      data: '',
    }
  },
  watch: {
    value: {
      deep: true,
      handler () {
        if (this.fetch) {
          this.fetch(this.value)
        }
        else {
          this.data = this.value
        }
      },
    },
    data: {
      deep: true,
      handler() {
        this.$emit('input', this.data)
      },
    },
  },
}