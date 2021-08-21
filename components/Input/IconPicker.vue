<template lang="pug">
  div.ur-select-icon-input
    q-icon#selected-icon(:name="data")
    el-select(
      v-model="data"
      popper-class="ur-select-icon-input-popper"
      :placeholder="attrs.placeholder"
      :disabled="attrs.disabled"
      :clearable ="attrs.clearable"
      :collapse-tags="attrs.collapseTags"
      :filterable="attrs.filterable"
      :loading="attrs.loading"
      :loading-text="attrs.loadingText"
    )
      el-option(
        v-for="icon in icons"
        :key="icon"
        :label="icon"
        :value="icon"
      )
        q-icon(:name="icon")
</template>

<script>
import ModelWatchMixin from "@desco/urano/mixins/watch/model"

export default {
  name: "UranoSelectIconInput",
  mixins: [ ModelWatchMixin, ],
  props: {
    value: String,
    name: String,
    params: { type: Object, default: () => ({}) },
  },
  computed: {
    attrs() {
      return this.params;
    },
  },
  data () {
    return {
      icons:  [
        'fas fa-bars',
        'fas fa-grip-horizontal',
        'fas fa-tasks', 
        'fas fa-newspaper',
        'fas fa-home', 
        'fas fa-ellipsis-v', 
        'fas fa-briefcase', 
        'fas fa-map-marked-alt', 
        'fas fa-users', 
        'fas fa-user', 
        'fas fa-info-circle', 
        'fas fa-map-pin', 
        'fas fa-ban', 
        'fas fa-calendar-alt', 
        'fab fa-facebook-f', 
        'fab fa-google', 
        'fas fa-thumbs-up', 
        'fas fa-thumbs-down', 
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
  .ur-select-icon-input {
    position: relative;

    .el-select {
      width: 100%;
      z-index: 1;
    }

    #selected-icon {
      position: absolute;
      bottom: 5px;
      left: 10px;
      width: 30px;
      height: 30px;
      z-index: 2;
      font-size: 1.5rem;
    }
  }
</style>

<style lang="scss">
  .ur-select-icon-input {
    input[type=text] {
      padding-left: 50px;
    }
  }

  .ur-select-icon-input-popper {
    .el-scrollbar__view.el-select-dropdown__list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      i {
        width: 35px;
        // margin-left: -10px;
        font-size: 1.75rem;
      }
    }
  }
</style>