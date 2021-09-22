<template lang="pug">
  .div.card-list
    .row.q-gutter-lg
      .col.col-5.item(
        v-if="!data"
        v-for="i in skeletonLen" :key="i"
        :class="{ [className]: true, }"
      )
        CardListItemSkeleton(
          :animation="skeletonAnimation"
          :color="skeletonColor"
          :showLabel="skeletonShowLabel"
          :labelWidth="skeletonLabelWidth"
          :labelHeight="skeletonLabelHeight"
          :showIcon="skeletonShowIcon"
          :iconWidth="skeletonIconWidth"
          :iconHeight="skeletonIconHeight"
          :titleWidth="skeletonTitleWidth"
          :titleHeight="skeletonTitleHeight"
        )
      .col.col-5.item(
        v-if="data"
        v-for="(item, k) in data" :key="k"
        :class="{ [className]: true, }"
      )
        router-link.shadow-up-3(:to="getTo(item)" :class="{'v-full': equalHeights, }")
          el-card.grid-margin(:class="{'v-full': equalHeights, }")
            div.header
              q-icon(:name="item[iconProp]" v-if="showIcon")
              el-tag(v-if="item.label" :type="item.label.type") {{item.label.value}}
            span.title {{item[titleProp]}}
</template>

<script>
import CardListItemSkeleton from '../Skeleton/CardListItem'

export default {
  name: 'CardList',
  components: { CardListItemSkeleton, },
  props: {
    className: String,
    data: [] | null,
    to: {},
    titleProp: { type: String, default: 'title', },
    iconProp: { type: String, default: 'icon', },
    equalHeights: { type: Boolean, default: true, },
    skeletonLen: { type: Number, default: 10, },
    skeletonAnimation: String,
    skeletonColor: String,
    skeletonLabelIcon: Boolean,
    skeletonLabelWidth: Number,
    skeletonLabelHeight: Number,
    skeletonShowIcon: Boolean,
    skeletonIconWidth: Number,
    skeletonIconHeight: Number,
    skeletonTitleWidth: Number,
    skeletonTitleHeight: Number,
    showIcon: { type: Boolean, default: true, },
  },
  methods: {
    fetch () {
      this.$emit('fetch')
    },
    getTo (item) {
      const params = {}

      this.to.params.map(i => params[i] = item[i])

      return { ...this.to, params, }
    }
  },
}
</script>

<style scoped lang="scss">
  .item {
    display: flex;
    flex-direction: column;
    position: relative;
    text-decoration: none;

    a {
      text-decoration: none;
    }

    .title {
      font-weight: bold;
    }

    .el-tag {
      position: absolute;
      top: 0;
      right: 0;
    }

    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: .5rem;

      svg,
      i {
        font-size: 2rem;
      }
    }
  }
</style>

<style lang="scss">
  div.card-list {
    .el-card__body {
      padding: 30px 10px;
    }
  }
</style>