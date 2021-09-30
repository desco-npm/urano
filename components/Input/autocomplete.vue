<template lang="pug">
  .ur-autocomplete
    el-autocomplete.inline-input(
      v-model="data"
      :fetch-suggestions="onQuerySearch"
      :placeholder="attrs.placeholder"
      :clearable="attrs.clearable"
      :value-key="attrs.valueKey"
      @select="onSelect"
      @blur="onBlur"
    )
</template>

<script>
export default {
  name: 'ur-autocomplete',
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
      const attrs = this.params;

      if (attrs.clearable === undefined) {
        attrs.clearable = true
      }

      return attrs
    },
  },
  methods: {
    onBlur () {
      this.$emit('blur')
    },
    onQuerySearch (query, cb) {
      this.$emit('fetch-suggestions', query, cb)
    },
    onSelect (item) {
      this.$emit('select', item)
    }
  },
};
</script>