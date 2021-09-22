<template lang="pug">
  el-card.icon-data-card.shadow-up-3
    div.header
      q-icon(:name="icon" v-if="icon")
      el-tag(v-if="label" :type="label.type") {{label.value}}
    span.title(v-if="title") {{title}}
</template>

<script>
import IconDataSkeleton from '../Skeleton/IconData'

export default {
  name: 'CardList',
  components: { IconDataSkeleton, },
  props: {
    icon: String,
    title: String,
    label: Object,
  },
}
</script>

<style scoped lang="scss">
  .icon-data-card {
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
  div.icon-data-card {
    .el-card__body {
      padding: 30px 10px;
    }
  }
</style>