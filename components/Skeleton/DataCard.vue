<template lang="pug">
  el-card.data-card-skeleton(:class="{'no-card': !card, }")
    .row.margin-bottom-10
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
    q-skeleton.text(
      v-if="showText"
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
  name: 'DataCardSkeleton',
  mixins: [ SkeletonMixin, ],
  props: {
    card: { type: Boolean, default: true, },
    showIcon: { type: Boolean, default: true, },
    showText: { type: Boolean, default: true, },
    showTitle: { type: Boolean, default: true, },
    textWidth: { type: String, default: '100%', },
    textHeight: { type: String, default: '30px', },
    iconWidth: { type: String, default: '25px', },
    iconHeight: { type: String, default: '25px', },
    titleWidth: { type: String, default: '80%', },
    titleHeight: { type: String, default: '25px', },
  },
}
</script>

<style lang="scss">
  .data-card-skeleton {
    &.no-card {
      box-shadow: none;
      border: 0;
      margin: 0;

      .el-card__body {
        padding: 0;
      }
    }
  }
</style>