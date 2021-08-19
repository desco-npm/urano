<template lang="pug">
  el-form-item.ur-input(:label="attrs.label" :label-width="attrs.labelWidth")
    el-input(
      v-if="element === 'string'"
      v-model="data"
      :placeholder="attrs.placeholder"
    )
    Password(
      v-if="element === 'password'"
      v-model="data"
      :params="attrs"
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
      :rows="attrs.rows"
    )
    el-date-picker(
      v-if="element === 'date'"
      type="date"
      v-model="data"
      :placeholder="attrs.placeholder"
      :format="attrs.format || 'dd/MM/yyyy'"
    )
    q-editor(
      v-if="element === 'texteditor'"
      v-model="data"
      :min-height="attrs.minHeight || '15rem'"
      :placeholder="attrs.placeholder"
    )
    ImageUpload(
      v-if="element === 'imageupload'"
      v-model="data"
    )
    el-select(
      v-if="element === 'select'"
      v-model="data"
      :placeholder="attrs.placeholder"
      :disabled="attrs.disabled"
      :clearable ="attrs.clearable"
      :multiple="attrs.multiple"
      :collapse-tags="attrs.collapseTags"
      :filterable="attrs.filterable"
      :filter-method="attrs.filterMethod"
      :remote="attrs.remote"
      :remote-method="attrs.remoteMethod"
      :allow-create="attrs.allowCreate"
      :default-first-option="attrs.defaultFirstOption"
      :value-key="attrs.valueProp || 'value'"
      :loading="attrs.loading"
      :loading-text="attrs.loadingText"
    )
      el-option(
        v-for="item in attrs.options"
        :key="item[attrs.valueProp || 'value']"
        :label="item[attrs.labelProp || 'label']"
        :value="item"
        :disabled="item.disabled"
      )
    el-switch(
      v-if="element === 'switch'"
      v-model="data"
      :active-text="attrs.activeText"
      :inactive-text="attrs.inactiveText"
      :disabled="attrs.disabled"
    )
    form-validation-error(:v="v" :name="name" :dirty="dirty" :service="service")
</template>

<script>
import ModelWatchMixin from "../../mixins/watch/model"
import FormValidationError from "../../components/FormValidationError"

import ImageUpload from '../../components/Input/ImageUpload'
import Password from '../../components/Input/Password'

export default {
  name: "UranoInput",
  mixins: [ ModelWatchMixin, ],
  components: { FormValidationError, ImageUpload, Password, },
  props: {
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
      const attrs = {
        ...this.service.model()[this.name],
        ...this.params,
      };

      if(this.element === 'select') {
        attrs.remoteMethod = attrs.remoteMethod || (() => {})
        attrs.filterMethod = attrs.filterMethod || (() => {})
      }

      return attrs
    },
    element() {
      if (this.field.element) return this.field.element.toLowerCase();

      if (!this.field.type) return "string";

      switch (this.field.type.toLowerCase()) {
        case "string":
          return "string"
        case "text":
          return "text"
        case "password":
          return "password"
        case "email":
          return "email"
        case "date":
          return "date"
        case "texteditor":
          return "texteditor"
        case "imageupload":
          return "imageupload"
        case "select": 
          return "select"
        case "boolean": 
        case "toogle": 
        case "switch": 
          return "switch"
      }
    },
  },
  data () {
    return {
      dirty: false
    }
  },
  mounted () {
    if(typeof this.attrs.default !== 'undefined') {
      this.data = this.attrs.default
    }

    switch (this.element) {
      case 'select': {
        this.dirty = null

        this.attrs.remoteMethod()
      }
        break
      case 'switch': {
        this.data = Boolean(this.data)
      }
        break
    }
  },
  watch: {
    data: {
      deep: true,
      handler () {
        this.dirty = this.dirty === null ? false : true
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner,
  .el-select {
    width: 100%;
  }
</style>