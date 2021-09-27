<template lang="pug">
div
  span(v-if="show && field.required === false")
    span(v-if="getCustomMessage('required')") {{getCustomMessage('required')}}
    span(v-else) Campo obrigatório

  span(v-if="show && field.maxLength === false")
    span(v-if="getCustomMessage('maxLength')") {{getCustomMessage('maxLength')}}
    span(v-else) Campo deve ter menos de {{ field.$params.maxLength.max }} caracteres

  span(v-if="show && field.minLength === false")
    span(v-if="getCustomMessage('minLength')") {{getCustomMessage('minLength')}}
    span(v-else) Campo deve ao menos {{ field.$params.minLength.min }} caracteres

  span(v-if="show && field.email === false")
    span(v-if="getCustomMessage('email')") {{getCustomMessage('email')}}
    span(v-else) Este não é um e-mail válido

  span(v-if="show && field.sameAs === false")
    span(v-if="getCustomMessage('sameAs')") {{getCustomMessage('sameAs')}}
    span(v-else) 
    | Não corresponde com o campo&nbsp;
    b {{ service.model()[field.$params.sameAs.eq].label }}

  span(v-if="show && field.passwordStrength === false")
    span(v-if="getCustomMessage('passwordStrength')") {{getCustomMessage('passwordStrength')}}
    span(v-else) 
    | A senha atual é muito fraca!
    |({{field.$params.passwordStrength.strong || 0}}/{{field.$params.passwordStrength.required}})

</template>

<script>
import isArray from '@desco/urano/functions/isArray'

export default {
  name: "FormValidationError",
  props: {
    v: Object,
    name: String,
    service: Object,
    dirty: Boolean,
    touched: Boolean,
  },
  computed: {
    field() {
      return this.v[this.name] || {};
    },
    show () {
      return this.dirty || this.touched
    },
  },
  methods: {
    getCustomMessage (rule) {
      rule = this.service.model()[this.name][rule]

      return isArray(rule) ? rule[1] : null
    }
  },
  watch: {
    field: {
      deep: true,
      handler() {
        this.v[this.name].$touch();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  color: $negative;
  display: block;
}
</style>