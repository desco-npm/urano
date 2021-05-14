<template lang="pug">
  div
    input(ref="input" type="file" @change="select")
    div.img(v-if="data")
      img(:src="data")
    el-button.full.bg-primary.text-white(@click.native="open")
      span(v-if="!data") Selecionar imagem
      span(v-if="data") Trocar imagem
</template>

<script>
  import ModelWatchMixin from "@desco/urano/mixins/watch/model"
  import fileBase64 from '@desco/urano/functions/fileBase64'

  export default {
    name: 'ImageUpload',
    mixins: [ModelWatchMixin],
    props: {
      value: String,
    },
    data () {
      return {
        data: '',
      }
    },
    methods: {
      open () {
        this.$refs.input.click()
      },
      async select (e) {
        this.data = (await fileBase64(e))[0]
      },
    },
  }
</script>

<style scoped lang="scss">
  input {
    display: none;
  }

  .img {
    text-align: center;

    img {
      max-width: 100%;
      max-height: 200px;
    }
  }
</style>