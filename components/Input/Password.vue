<template lang="pug">
  .ur-password-input
    div.input
      el-input(
        ref="password"
        :type="show ? 'text' : 'password'"
        v-model="data"
        :placeholder="attrs.placeholder"
        :disabled="attrs.disabled"
        @blur="onBlur"
      )
        template(slot="prepend" v-if="attrs.prepend") {{attrs.prepend}}
        template(slot="append" v-if="attrs.append") {{attrs.append}}
      q-icon(:name="show ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="toogleShow")
    .row.strength.q-gutter-xs
      .col( v-for="i in params.strengthRequired" :key="i" :class="{ valid: params.strength >= i}")
        |&nbsp;
</template>

<script>
export default {
  name: 'ur-password',
  mixins: [
    require('@desco/urano/mixins/watch/model').default,
  ],
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

  div.input {
    position: relative;

    i {
      position: absolute;
      bottom: 12px;
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