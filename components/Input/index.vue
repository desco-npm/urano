<template lang="pug">
.ur-input
  el-input(
    v-if="element === 'string'"
    v-model="data"
    :placeholder="attrs.placeholder"
  )
  el-input(
    v-if="element === 'password'"
    type="password"
    v-model="data"
    :placeholder="attrs.placeholder"
  )
  el-input(
    v-if="element === 'email'"
    type="email"
    v-model="data"
    :placeholder="attrs.placeholder"
  )
  el-input(
    v-if="element === 'text'"
    type="textarea"
    v-model="data"
    :placeholder="attrs.placeholder"
  )
  el-date-picker(
    v-if="element === 'date'"
    type="date"
    v-model="data"
    :placeholder="attrs.placeholder"
  )
  q-editor(
    v-if="element === 'texteditor'"
    v-model="data"
    :min-height="attrs.minHeight || '15rem'"
    :placeholder="attrs.placeholder"
  )
  q-file(
    v-if="element === 'upload'"
    filled
    v-model="data"
    :label="attrs.placeholder"
    @input="fileToBase64"
  )
    template(v-slot:prepend)
      q-icon(name="attach_file")
    template(v-slot:file="{ index, file }")
      | ola mundo
  form-validation-error(:v="v" :name="name", :service="service")
</template>

<script>
import ModelWatchMixin from "@desco/urano/mixins/watch/model";
import FormValidationError from "@desco/urano/components/FormValidationError";

import fileBase64 from '@desco/file-base64'

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
        case "date":
          return "date";
        case "texteditor":
          return "texteditor";
        case "upload":
          return "upload";
      }
    },
  },
  methods: {
    fileToBase64 () {
      fileBase64(this.data).then(_base64 => {
        console.log(_base64)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
</style>