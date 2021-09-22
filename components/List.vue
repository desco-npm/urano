<template lang="pug">
  .div.list
    .row(:class="getGutterClass()")
      .col.item(
        v-if="!data"
        v-for="i in skeletonLen" :key="i"
        :class="getResponsiveClass()"
      )
        slot(name="skeleton")
      .col.item(
        v-if="data"
        v-for="(item, k) in data" :key="k"
        :class="getResponsiveClass()"
      )
        router-link.v-full(v-if="item.to" :to="getTo(item)")
          slot(v-bind="item")
        slot(v-if="!item.to" v-bind="item")
</template>

<script>
import IconDataSkeleton from './Skeleton/IconData'

export default {
  name: 'List',
  components: { IconDataSkeleton, },
  props: {
    data: [] | null,
    to: {},
    skeletonLen: { type: Number, default: 10, },
    gutter: { type: Object, default: () => ({ lg: true, }), },
    responsive: { type: Object, default: () => ({ 5: true, }), }
  },
  methods: {
    fetch () {
      this.$emit('fetch')
    },
    getTo (item) {
      const params = {}

      this.to.params.map(i => params[i] = item[i])

      return { ...this.to, params, }
    },
    getGutterClass () {
      const gutter = {}

      Object.entries(this.gutter).forEach(data => {
        gutter[`q-gutter-${data[0]}`] = data[1]
      })

      return gutter
    },
    getResponsiveClass () {
      const responsive = {}

      Object.entries(this.responsive).forEach(data => {
        responsive[`col-${data[0]}`] = data[1]
      })

      return responsive
    },
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
  div.list {
    .el-card__body {
      padding: 30px 10px;
    }
  }
</style>