<template lang="pug">
  .ur-password-input
    span
      el-input(
        ref="password"
        :type="show ? 'text' : 'password'"
        v-model="data"
        :placeholder="attrs.placeholder"
        @blur="onBlur"
      )
      q-icon(:name="show ? 'fas fa-eye' : 'fas fa-slash'" @click="toogleShow")
</template>

<script>
import ModelWatchMixin from "@desco/urano/mixins/watch/model"

export default {
  name: "UranoPasswordInput",
  mixins: [ ModelWatchMixin, ],
  props: {
    value: String,
    name: String,
    params: { type: Object, default: () => ({}) },
  },
  computed: {
    attrs() {
      return this.params;
    },
  },
  data () {
    return {
      show: false,
    }
  },
  methods: {
    toogleShow () {
      this.show = !this.show
    },
    onBlur () {
      this.$emit('blur')
    }
  },
};
</script>

<style lang="scss" scoped>
  span {
    position: relative;
  }

  svg {
    position: absolute;
    top: 0;
    right: 12px;
    cursor: pointer;
  }
</style>