<template lang="pug">
  div
    el-select.ur-select(
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
      :value-key="attrs.valueProp || 'value'"
      :loading="attrs.loading"
      :loading-text="attrs.loadingText"
      @blur="onBlur"
      @change="onChange"
    )
      el-option(
        v-if="!attrs.groups"
        v-for="item in attrs.options"
        :key="item[attrs.valueProp || 'value']"
        :label="item[attrs.labelProp || service.fieldName || 'Nome']"
        :value="item"
        :disabled="item.disabled"
      )
        slot(name="select" v-bind:item="item")
      el-option-group(
        v-if="attrs.groups"
        v-for="(options, group) in attrs.groups"
        :key="group"
        :label="group"
      )
        el-option(
          v-for="item in options"
          :key="item[attrs.valueProp || 'value']"
          :label="item[attrs.labelProp || service.fieldName || 'Nome']"
          :value="item"
          :disabled="item.disabled"
        )
          slot(name="select" v-bind:item="item")
</template>

<script>
  export default {
    name: 'ur-input',
    mixins: [
      require('./inputMixin').default,
    ],
    props: {
      params: { type: Object, default: () => ({}) },
    },
    computed: {
      attrs() {
        return this.params;
      },
    },
    methods: {
      fetch () {
        this.data = this.value

        if (this.attrs.defaultFirstOption && !this.data) {
          this.data = this.attrs.options[0]

          this.onChange()
          this.$emit('first', this.data)
        }
      },
      onBlur () {
        this.$emit('blur')
      },
      onChange () {
        this.$emit('change', this.data)
      },
    },
    mounted () {
      this.fetch()
    },
    watch: {
      'attrs.options': {
        deep: true,
        handler () {
          this.fetch()
        },
      },
    },
  }
</script>