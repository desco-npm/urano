<template lang="pug">
  el-card.four_lines_bordered_color(:style="cardStyle()")
    el-row
      el-col.line1(:span="24" v-if="$scopedSlots.line1")
        slot(name="line1")
      el-col.line2(:span="24" v-if="$scopedSlots.line2")
        slot(name="line2")
      el-col.line3(:span="24" v-if="$scopedSlots.line3")
        slot(name="line3")
      el-col.line4(:span="24" v-if="$scopedSlots.line4")
        slot(name="line4")
</template>

<script>
export default {
  name: 'FourLinesBorderedColor',
  props: {
    borderColor: { type: String, default: 'black', },
    borderWidth: { type: String, default: '6px', },
    borderStyle: { type: String, default: 'solid', },
  },
  methods: {
    cardStyle () {
      const style = { borderLeftColor: this.borderColor, borderLeftStyle: this.borderLeftStyle, borderLeftWidth: this.borderWidth, }

      return style
    }
  }
}
</script>

<style scoped lang="scss">

  .line1 {
    font-size: 1.5rem;
  }

  .line2 {
    font-weight: bold;
  }

  .line3 {
    margin: 6px 0;
  }

  .line4 {
    background-color: #DDD;
    padding: 12px;
    margin-top: 6px;
  }

</style>

<style lang="scss">
  .four_lines_bordered_color {
    .el-card__body {
      padding: 10px;
    }
  }
</style>