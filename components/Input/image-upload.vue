<template lang="pug">
  div
    input(ref="input" type="file" @change="select")
    el-dropdown.full(trigger="click" :hide-on-click="true")
      el-button.full.bg-primary.text-white(split-button :icon="attrs.icon || 'el-icon-picture'" @click="click")
        | Selecionar imagem
        i.el-icon-arrow-down.el-icon--right(v-if="gallery && camera")
      el-dropdown-menu(slot="dropdown" v-if="gallery && camera")
        el-dropdown-item(@click.native="takePhoto") A partir da câmera
        el-dropdown-item(@click.native="open") A partir da galeria
    div.img.full(v-if="data")
      img(:src="data")
</template>

<script>
  import fileBase64 from '@desco/urano/functions/fileBase64'

  export default {
    name: 'ur-image-upload',
    mixins: [
      require('@desco/urano/mixins/watch/model').default,
    ],
    props: {
      value: String,
      params: { type: Object, default: () => ({}) },
    },
    computed: {
      attrs () {
        const attrs = this.params

        return attrs
      },
      camera () {
        return [ undefined, true, ].indexOf(this.params.camera) > -1
      },
      gallery () {
        return [ undefined, true, ].indexOf(this.params.gallery) > -1
      },
    },
    data () {
      return {
        data: '',
      }
    },
    methods: {
      open () {
        this.$refs.input.click()
        this.$emit('open')
      },
      async select (e) {
        this.data = (await fileBase64(e))[0]
      },
      async takePhoto (e) {
        this.$emit('take')
      },
      click () {
        if (this.gallery && !this.camera) {
          this.open()
        }
        else if (this.gallery && !this.camera) {
          this.takePhoto()
        }
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
    margin-top: 12px;

    img {
      max-width: 100%;
      max-height: 350px;
    }
  }
</style>