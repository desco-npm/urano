<template lang="pug">
  el-form-item.ur-input(:label="attrs.label" :label-width="attrs.labelWidth")
    el-input(
      v-if="element === 'string'"
      v-model="data"
      :placeholder="attrs.placeholder"
      @blur="setTouched"
    )
    Password(
      v-if="element === 'password'"
      v-model="data"
      :params="attrs"
      @blur="setTouched"
    )
    el-input(
      v-if="element === 'email'"
      type="email"
      v-model="data"
      :placeholder="attrs.placeholder"
      @blur="setTouched"
    )
    el-input(
      v-if="element === 'text'"
      type="textarea"
      v-model="data"
      :placeholder="attrs.placeholder"
      :rows="attrs.rows"
      @blur="setTouched"
    )
    el-date-picker(
      v-if="element === 'date'"
      type="date"
      v-model="data"
      :placeholder="attrs.placeholder"
      :format="attrs.format || 'dd/MM/yyyy'"
      @blur="setTouched"
    )
    Editor(
      v-if="element === 'texteditor'"
      v-model="data"
      :params="attrs"
      @blur="setTouched"
    )
    ImageUpload(
      v-if="element === 'imageupload'"
      v-model="data"
      @open="setTouched"
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
      @blur="setTouched"
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
      @change="setTouched"
    )
    IconPicker(
      v-if="element === 'iconpicker'"
      v-model="data"
      :params="attrs"
      @blur="setTouched"
    )
    form-validation-error(:v="validation" :name="name" :dirty="dirty" :touched="touched" :service="service")
</template>

<script>
import ModelWatchMixin from "../../mixins/watch/model"

import FormValidationError from "../FormValidationError"

import ImageUpload from './ImageUpload'
import Password from './Password'
import IconPicker from './IconPicker'
import Editor from './Editor'

export default {
  name: "UranoInput",
  mixins: [ ModelWatchMixin, ],
  components: { FormValidationError, ImageUpload, Password, IconPicker, Editor, },
  props: {
    service: Object,
    name: String,
    params: { type: Object, default: () => ({}) },
    validation: Object,
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
      else if (this.element === 'password') {
        const hasValidation = this.validation[this.name]

        if (hasValidation && this.validation[this.name].$params.passwordStrength.required >= 0) {
          attrs.strengthRequired = this.validation[this.name].$params.passwordStrength.required
          attrs.strength = this.validation[this.name].$invalid
            ? this.validation[this.name].$params.passwordStrength.strong
            : attrs.strengthRequired
        }
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
        case "password": {
          return "password"
        }
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
        case "iconpicker": 
          return "iconpicker"
      }
    },
  },
  data () {
    return {
      dirty: false,
      touched: false,
    }
  },
  methods: {
    setTouched () {
      this.touched = true

      this.$emit('touched')
    }
  },
  mounted () {
    if(typeof this.attrs.default !== 'undefined') {
      this.data = this.attrs.default
    }

    this.dirty = null
    this.touched = null

    switch (this.element) {
      case 'select': {
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

        if (this.dirty) {
          this.$emit('dirty')
        }
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