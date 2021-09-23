<template lang="pug">
  el-card.four-lines-bordered-color-skeleton
    .row.margin-bottom-20
      .col.col-2(v-if="showIcon")
        q-skeleton.icon(
          type="rect"
          :animation="animation"
          :width="iconWidth"
          :height="iconHeight"
          :style="{ backgroundColor: color, }"
        )
      .col(v-if="showTitle" :class="{ 'col-10': showIcon, 'col-12': !showIcon, }")
        q-skeleton.title(
          type="rect"
          :animation="animation"
          :width="titleWidth"
          :height="titleHeight"
          :style="{ backgroundColor: color, }"
        )
    q-skeleton.line2(
      v-if="showLine2"
      type="text"
      :animation="animation"
      :width="line2Width"
      :height="line2Height"
      :style="{ backgroundColor: color, }"
    )
    q-skeleton.title(
      v-if="showLine3"
      type="text"
      :animation="animation"
      :width="line3Width"
      :height="line3Height"
      :style="{ backgroundColor: color, }"
    )
    q-skeleton.title(
      v-if="showLine4"
      type="text"
      :animation="animation"
      :width="line4Width"
      :height="line4Height"
      :style="{ backgroundColor: color, }"
    )
</template>

<script>
import SkeletonMixin from './mixin'

export default {
  name: 'FourLinesBorderedColorSkeleton',
  mixins: [ SkeletonMixin, ],
  props: {
    showIcon: { type: Boolean, default: true, },
    showTitle: { type: Boolean, default: true, },
    showLine2: { type: Boolean, default: true, },
    showLine3: { type: Boolean, default: true, },
    showLine4: { type: Boolean, default: true, },
    iconWidth: { type: String, default: '30px', },
    iconHeight: { type: String, default: '30px', },
    titleWidth: { type: String, default: '100%', },
    titleHeight: { type: String, default: '30px', },
    line2Width: { type: String, default: '100%', },
    line3Height: { type: String, default: '30px', },
    line4Height: { type: String, default: '30px', },
  },
}
</script>

<style lang="scss">
</style>