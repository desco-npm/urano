<template lang="pug">
  el-card.data-card(:class="{'no-card': !card, }")
    el-row
      el-col(:span="2")
        slot(name="icon")
      el-col.label(:span="22")
        slot(name="label")
      el-col(:span="2")
        |&nbsp;
      el-col(:span="22")
        slot(name="data")
</template>

<script>
import Mixin from './mixin'

export default {
  name: 'DataCard',
  mixins: [ Mixin, ],
}
</script>

<style scoped lang="scss">
  .label {
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: -3px;
  }
</style>


<style lang="scss">
  .data-card.no-card {
    box-shadow: none !important;
    border: 0;
    margin: 0;

    .el-card__body {
      padding: 0;
    }
  }
</style>