<template lang="pug">
  el-card.image-data-skeleton
    q-skeleton.image.margin-bottom-12(
      type="rect"
      :animation="animation"
      :width="imageWidth"
      :height="imageHeight"
      :style="{ backgroundColor: color, }"
    )
    q-skeleton.icon(
      v-for="i in amountText" :key="i"
      type="text"
      :animation="animation"
      :width="textWidth"
      :height="textHeight"
      :style="{ backgroundColor: color, }"
    )
</template>

<script>
import SkeletonMixin from './mixin'

export default {
  name: 'ImageDataSkeleton',
  mixins: [ SkeletonMixin, ],
  props: {
    amountText: { type: Number, default: 3, },
    textWidth: { type: String, default: '100%', },
    textHeight: { type: String, default: '30px', },
    imageWidth: { type: String, default: '100%', },
    imageHeight: { type: String, default: '250px', },
  },
}
</script>

<style lang="scss">
</style>