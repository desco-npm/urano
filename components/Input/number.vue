<template lang="pug">
  .ur-number-input
    span(@keyup="onKeyup")
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
  import form from '~/mixins/form'

  export default {
    name: 'ur-number',
    props: {
      value: Number,
      params: { type: Object, default: () => ({}) },
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
      onKeyup (event) {

        const key = event.key
        const precision = this.attrs.precision || 0
        let integer = null
        let decimals = null
        let point = '.'

        this.data = this.cleanData()

        if (key === 'Backspace') {
          this.data = this.data.slice(0, -1)

          this.formatToDisplay()

          return
        }
        else if (isNaN(Number(key))) {
          this.formatToDisplay()

          return
        }

        this.data = !this.attrs.rightToLeft ? `${this.data}${key}` : `${key}${this.data}`

        if (precision > 0 && this.data.length + 1 > precision) {
          integer = this.data.slice(0, precision * -1)
          decimals = this.data.slice(precision * -1)
        }
        else {
          integer = this.data
        }

        if (this.params.mask) {
          point = ','

          integer = integer
            .split('')
            .reverse()
            .map((i, k) => (k + 1) % 3 === 0 ? `.${i}` : i)
            .reverse()
            .join('')

          if (integer[0] === '.') {
            integer = integer.slice(1)
          }
        }

        if (integer === '' && decimals) {
          this.data = decimals.toString()
        }
        else if (integer !== '' && !decimals) {
          this.data = integer.toString()
        }
        else if (integer && decimals) {
          this.data = `${integer}${point}${decimals}`
        }

        this.formatToDisplay()
      },
      formatToDisplay () {
        if (!this.data) return

        this.toDisplay = this.data

        if (this.attrs.mask && this.attrs.precision > 0) {
          const value = this.toDisplay.split(',')

          let integer = ''
          let decimals = ''

          if ((value[0] || value[0] === '') && !value[1]) {
            integer = '0'
            decimals = value[0].padStart(this.attrs.precision, '0')
          }
          else {
            integer = value[0]
            decimals = value[1].padStart(this.attrs.precision, '0')
          }

          this.toDisplay = `${integer},${decimals}`
        }
      },
      cleanData (comma) {
        return this.data
          .toString()
          .split('')
          .filter((i) => !isNaN(Number(i)) || (i === ',' && comma))
          .map((i) => i === ',' ? '.' : i)
          .join('')
      },
    },
    watch: {
      data () {
        const val = this.toDisplay.split('.').join('').split(',').join('.')

        this.$emit('input', Number(val))
      },
      value () {
        if (!this.value) return

        this.data = this.value.toString()
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