<template lang="pug">
.ur-input
  el-input(
    v-if="element === 'string'",
    v-model="data",
    :placeholder="attrs.placeholder"
  )
  el-input(
    v-if="element === 'password'",
    type="password",
    v-model="data",
    :placeholder="attrs.placeholder"
  )
  el-input(
    v-if="element === 'email'",
    type="email",
    v-model="data",
    :placeholder="attrs.placeholder"
  )
  form-validation-error(:v="v", :name="name", :service="service")
</template>

<script>
import ModelWatchMixin from "@desco/urano/mixins/watch/model";
import FormValidationError from "@desco/urano/components/FormValidationError";

export default {
  name: "UranoInput",
  mixins: [ModelWatchMixin],
  components: { FormValidationError },
  props: {
    value: String | Number | Object | Array | Boolean,
    service: Object,
    name: String,
    params: { type: Object, default: () => ({}) },
    v: Object,
  },
  computed: {
    field() {
      return this.service.model()[this.name];
    },
    attrs() {
      return this.params;
    },
    element() {
      if (this.field.element) return this.field.element.toLowerCase();

      if (!this.field.type) return "string";

      switch (this.field.type.toLowerCase()) {
        case "string":
          return "string";
        case "text":
          return "text";
        case "password":
          return "password";
        case "email":
          return "email";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>