<template lang="pug">
  .ur-password-input
    span.input
      el-input(
        ref="password"
        :type="show ? 'text' : 'password'"
        v-model="data"
        :placeholder="attrs.placeholder"
        @blur="onBlur"
      )
      q-icon(:name="show ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="toogleShow")
    .row.strength.q-gutter-xs
      .col( v-for="i in params.strengthRequired" :key="i" :class="{ valid: params.strength >= i}")
        |&nbsp;
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
  @import "~@/appProfile/theme";

  span.input {
    position: relative;

    i {
      position: absolute;
      top: 0;
      right: 12px;
      cursor: pointer;
    }
  }

  .strength {
    .col {
      background: $info;
      margin-top: 12px;
      max-height: 4px;

      &.valid { 
        background: $positive;
      }
    }
  }

</style>