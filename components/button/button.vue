<template lang="pug">
  el-button(:disabled="disabled" :circle="circle" @click="click" :size="size")
    slot
    font-awesome-icon(v-if="icon" :icon="icon")
</template>

<script>
  export default {
    name: 'ur-button-btn',
    props: {
      disabled: { type: Boolean, default: false, },
      circle: { type: Boolean, default: false, },
      icon: { type: Array, required: false, },
      size: { type: String, required: false, },
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