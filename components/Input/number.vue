<template lang="pug">
  .ur-number-input
    span(@keyup="onKeyUp")
      el-input(
        v-model="toDisplay"
        :placeholder="attrs.placeholder"
        :show-word-limit="attrs.showWordLimit"
        :disabled="attrs.disabled"
        @blur="onBlur"
      )
        template(slot="append" v-if="attrs.percent") %
        template(slot="append" v-if="attrs.append") {{attrs.append}}
        template(slot="prepend" v-if="attrs.money") R$
        template(slot="prepend" v-if="attrs.prepend") {{attrs.prepend}}
</template>

<script>
  export default {
    name: 'ur-number',
    props: {
      value: Number,
      params: { type: Object, default: () => ({}), },
    },
    data () {
      return {
        data: '',
        toDisplay: '',
      }
    },
    computed: {
      attrs() {
        return this.params;
      },
    },
    methods: {
      onBlur () {
        this.$emit('blur')
      },
      onKeyUp (event) {
        const key = event.key

        this.formatToDisplay()
      },
      formatToDisplay () {
        let toDisplay = this.toDisplay

        toDisplay = this.clean(toDisplay)
        toDisplay = this.formatInteger(toDisplay)

        this.toDisplay = toDisplay
      },
      formatInteger (value) {
        if (!this.attrs.mask) return value

        let integer = value.slice(0, this.attrs.precision * -1)
        let decimals = value.slice(this.attrs.precision * -1)

        integer = integer
          .split('')
          .reverse()
          .map((i, k) => (k + 1) % 3 === 0 ? `.${i}` : i)
          .reverse()
          .join('')

        if (integer[0] === '.') {
          integer = integer.slice(1)
        }
        else if (integer['0'] === '0' && integer.length > 1) {
          integer = integer.slice(1)
        }

        if (this.attrs.precision > 0) {
          integer = integer.padStart(1, '0')
          decimals = decimals.padStart(this.attrs.precision, '0')

          return `${integer},${decimals}`
        }
        else {
          return integer
        }

      },
      clean (val) {
        return val
          .split('')
          .filter((i) => !isNaN(Number(i)))
          .join('')
      }
    },
    mounted () {
      this.formatToDisplay()
    },
    watch: {
      toDisplay () {
        this.data = Number(this.toDisplay.split('.').join('').split(',').join('.'))
      },
      data () {
        this.$emit('input', this.data)
      },
      value () {
        if (!this.value) return

        this.data = this.value
        this.toDisplay = this.value.toString()

        this.formatToDisplay()
      },
    },
  }
</script>

<style lang="scss">
  .ur-number-input {
    [role=button] {
      display: none;
    }

    .el-input-number  {
      width: 100%;

      input {
        text-align: left;
      }
    }
  }
</style>