<template lang="pug">
  el-row.data-card
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
export default {
  name: 'DataCard',
}
</script>

<style scoped lang="scss">
  .label {
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: -3px;
  }
</style>
