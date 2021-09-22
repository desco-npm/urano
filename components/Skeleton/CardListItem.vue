<template lang="pug">
  el-card.card-list-item-skeleton
    q-skeleton.tag(
      v-if="showLabel"
      type="QBadge"
      :animation="animation"
      :width="labelWidth"
      :height="labelHeight"
      :style="{ backgroundColor: color, }"
    )
    q-skeleton.icon(
      v-if="showIcon"
      type="rect"
      :animation="animation"
      :width="iconWidth"
      :height="iconHeight"
      :style="{ backgroundColor: color, }"
    )
    q-skeleton.title(
      v-if="showTitle"
      type="text"
      :animation="animation"
      :width="titleWidth"
      :height="titleHeight"
      :style="{ backgroundColor: color, }"
    )
</template>

<script>
import SkeletonMixin from './mixin'

export default {
  name: 'CardListItemSkeleton',
  mixins: [ SkeletonMixin, ],
  props: {
    showIcon: { type: Boolean, default: true, },
    showLabel: { type: Boolean, default: true, },
    showTitle: { type: Boolean, default: true, },
    labelWidth: { type: Number, default: '60px', },
    labelHeight: { type: Number, default: '30px', },
    iconWidth: { type: Number, default: '50px', },
    iconHeight: { type: Number, default: '50px', },
    titleWidth: { type: Number, default: '80%', },
    titleHeight: { type: Number, default: '40px', },
  },
}
</script>

<style lang="scss">
  .tag {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>