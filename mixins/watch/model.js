export default {
  props: {
    value: {
      type: String | Number | Object | Array | Boolean,
      required: false,
    }
  },
  data() {
    return {
      data: undefined,
    }
  },
  methods: {
    fetch () {
      this.data = this.value
    },
  },
  mounted () {
    this.fetch()
  },
  watch: {
    value: {
      deep: true,
      handler () {
        this.fetch(this.value)
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