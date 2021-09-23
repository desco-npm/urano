<template lang="pug">
  el-card.icon-data-skeleton
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
  name: 'IconDataSkeleton',
  mixins: [ SkeletonMixin, ],
  props: {
    showIcon: { type: Boolean, default: true, },
    showLabel: { type: Boolean, default: true, },
    showTitle: { type: Boolean, default: true, },
    labelWidth: { type: String, default: '60px', },
    labelHeight: { type: String, default: '30px', },
    iconWidth: { type: String, default: '50px', },
    iconHeight: { type: String, default: '50px', },
    titleWidth: { type: String, default: '80%', },
    titleHeight: { type: String, default: '40px', },
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