<template lang="pug">
  .ur-button
    el-form.ur-button(v-if="alignLabelForm !== 'none'" label-position="left")
      el-form-item(label="" :label-width="alignLabelForm === 'auto' ? labelWidth : alignLabelForm")
        ur-button-btn(
          :disabled="disabled"
          :circle="circle"
          :icon="icon"
          :size="size"
          @click="click"
        )
          slot
    ur-button-btn(
      v-else
      :disabled="disabled"
      :circle="circle"
      :icon="icon"
      :size="size"
      @click="click"
    )
      slot
</template>

<script>
  import { labelWidth, } from '@components/input'

  export default {
    name: 'ur-button',
    components: {
      'ur-button-btn': require('./button').default,
    },
    props: {
      alignLabelForm: { type: String, default: 'none', required: false, },
      disabled: { type: Boolean, default: false, required: false, },
      circle: { type: Boolean, default: false, required: false, },
      icon: { type: Array, required: false, },
      size: { type: String, required: false, },
    },
    data () {
      return {
        labelWidth,
      }
    },
    methods: {
      click () {
        this.$emit('click')
      },
    },
  }
</script>

<style scoped lang="scss">
  svg {
    left: 4px;
    position: relative;
    font-size: 14px;
  }
</style>