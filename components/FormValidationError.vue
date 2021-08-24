<template lang="pug">
div
  span(v-if="show && field.required === false").
    Campo obrigatório
  span(v-if="show && field.maxLength === false").
    Campo deve ter menos de {{ field.$params.maxLength.max }} caracteres
  span(v-if="show && field.minLength === false").
    Campo deve ao menos {{ field.$params.minLength.min }} caracteres
  span(v-if="show && field.email === false").
    Este não é um e-mail válido
  span(v-if="show && field.sameAs === false")
    | Não corresponde com o campo&nbsp;
    b {{ service.model()[field.$params.sameAs.eq].label }}
</template>

<script>
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