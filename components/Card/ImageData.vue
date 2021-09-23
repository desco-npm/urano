<template lang="pug">
  el-card.image-card(:class="{'no-card': !card, }")
    el-image(:src="image")
    el-divider
    q-badge.prepend-badge(v-if="prepend" :label="prependData.value" :class="prependData.class")
    span.title {{title}}
    q-badge.append-badge(v-if="append" :label="appendData.value" :class="appendData.class")
</template>

<script>
import Mixin from './mixin'

export default {
  name: 'CardList',
  mixins: [ Mixin, ],
  components: { },
  props: {
    title: String,
    image: String,
    append: Object,
    prepend: Object,
  },
  computed: {
    appendData () {
      return this.append || {}
    },
    prependData () {
      return this.prepend || {}
    },
  },
}
</script>



<style scoped lang="scss">
  .append-badge {
    margin-left: .5rem;
  }

  .prepend-badge {
    margin-right: .5rem;
  }

  .title {
    font-weight: bold;
    margin-bottom: .25rem;
    text-decoration: none;
  }
</style>
