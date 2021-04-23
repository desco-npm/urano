<template lang="pug">
div
  span(v-if="show && field.$dirty && field.required === false").
    Campo obrigatório
  span(v-if="show && field.$dirty && field.maxLength === false").
    Campo deve ter menos de {{ field.$params.maxLength.max }} caracteres
  span(v-if="show && field.$dirty && field.minLength === false").
    Campo deve ao menos {{ field.$params.minLength.min }} caracteres
  span(v-if="show && field.$dirty && field.email === false").
    Este não é um e-mail válido
  span(v-if="show && field.$dirty && field.sameAs === false")
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
    show: { type: Boolean, default: true },
  },
  computed: {
    field() {
      return this.v[this.name] || {};
    },
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