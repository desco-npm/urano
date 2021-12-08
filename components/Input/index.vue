<template lang="pug">
  el-form.ur-input(:label-position="attrs.labelPos")
    el-form-item(
      :label="attrs.label"
      :label-width="attrs.labelPos === 'none' ? '0px' : attrs.labelWidth"
    )
      el-input(
        v-if="element === 'string'"
        v-model="data"
        :placeholder="attrs.placeholder"
        :maxlength="maxLength"
        :show-word-limit="attrs.showWordLimit"
        @blur="setTouched"
      )
      ur-password(
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
        :maxlength="maxLength"
        :show-word-limit="attrs.showWordLimit"
        @blur="setTouched"
      )
      el-input(
        v-if="element === 'text'"
        type="textarea"
        v-model="data"
        :placeholder="attrs.placeholder"
        :rows="attrs.rows"
        :maxlength="maxLength"
        :show-word-limit="attrs.showWordLimit"
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
      ur-editor(
        v-if="element === 'texteditor'"
        v-model="data"
        :params="attrs"
        @blur="setTouched"
      )
      ur-image-upload(
        v-if="element === 'imageupload'"
        v-model="data"
        :params="attrs"
        @open="setTouched"
        @take="takePhoto"
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
          slot(name="select" v-bind:item="item")
      el-switch(
        v-if="element === 'switch'"
        v-model="data"
        :active-text="attrs.activeText"
        :inactive-text="attrs.inactiveText"
        :disabled="attrs.disabled"
        @change="setTouched"
      )
      ur-icon-picker(
        v-if="element === 'iconpicker'"
        v-model="data"
        :params="attrs"
        @blur="setTouched"
      )
      ur-autocomplete(
        v-if="element === 'autocomplete'"
        v-model="data"
        :params="attrs"
        @blur="setTouched"
        @select="onSelect"
        @fetch-suggestions="onQuerySearch"
      )
      ur-number(
        v-if="element === 'number'"
        v-model="data"
        :params="attrs"
        :maxlength="maxLength"
        @blur="setTouched"
      )
      desco-input-tags(
        v-if="element === 'tag'"
        v-model="data"
        :new-tag-txt="attrs.placeholder || 'Novo'"
        :separator-character="attrs.separatorCharacter || ';'"
        :max="attrs.max"
        :add-on-blur="attrs.addOnBlur"
        :allow-repeat="attrs.allowRepeat"
        :transitions="attrs.transitions"
      )
      slot(
        v-bind="{ name, element, data, attrs, maxLength, service, validation, }"
        @blur="setTouched"
      )
      ur-form-validation-error(
        v-if="validation"
        :v="validation"
        :name="name"
        :dirty="dirty"
        :touched="touched"
        :service="service"
        :show-errors="attrs.showErrors"
      )
</template>

<script>
export default {
  name: 'ur-input',
  mixins: [
    require('./inputMixin').default,
  ],
  components: {
    'ur-image-upload': require('./image-upload').default,
    'ur-password': require('./password').default,
    'ur-icon-picker': require('./icon-picker').default,
    'ur-editor': require('./editor').default,
    'ur-autocomplete': require('./autocomplete').default,
    'ur-number': require('./number').default,
    'ur-form-validation-error': require('../form-validation-error').default,
    'desco-input-tags': require('@desco/vue-input-tags').default,

  },
  data () {
    return {
      dirty: false,
      touched: false,
    }
  },
  computed: {
    maxLength () {
      if (!this.validation) return undefined

      return((this.validation[this.name].$params || {}).maxLength || {}).max
    }
  },
  methods: {
    onQuerySearch (query, cb) {
      this.$emit('fetch-suggestions', query, cb)
    },
    onSelect (item) {
      this.$emit('select', item)
    },
    takePhoto () {
      this.setTouched()

      this.$emit('take')
    },
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

<style lang="scss">
  .ur-input {
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner,
    .el-select,
    .el-autocomplete.inline-input {
      width: 100%;
    }

    .el-form-item__label {
      font-weight: bold;
    }

    &.el-form--label-none {
      .el-form-item__label {
        display: none;
      }
    }
  }
</style>