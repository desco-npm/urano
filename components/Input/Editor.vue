<template lang="pug">
  q-editor(
    v-model="data"
    ref="editor"
    :min-height="params.minHeight || '15rem'"
    :placeholder="params.placeholder"
  )
</template>

<script>
  import ModelWatchMixin from "@desco/urano/mixins/watch/model"

  export default {
    name: 'Editor',
    mixins: [ ModelWatchMixin, ],
    props: {
      value: String,
      params: { type: Object, default: () => ({}) },
    },
    data () {
      return {
        data: '',
      }
    },
    mounted () {
      this.$nextTick(() => {
        const contenteditable = this.$refs['editor'].$el.querySelector('[contenteditable]')

        contenteditable.addEventListener ('blur', () => {
          this.$emit('blur')
        })
      })
    }
  }
</script>