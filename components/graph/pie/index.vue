<template lang="pug">
  IEcharts.iecharts(:option="config" resizable ref="IEcharts" style="height: 200px;")
</template>

<script>
import ScreenMixin from '../../../mixins/screen'

export default {
  name: 'PieGraphComponent',
  mixins: [ ScreenMixin, ],
  props: {
    data: Array,
    title: String,
    titlePos: { type: String, default: 'center', },
    titlePosCompact: { type: String, default: 'left', },
    option: { type: Object, default: () => ({}), },
    labelFormatter: { type: String, default: '{b} ({c})', },
    legend: { type: Boolean, default: false, },
    legendCompact: { type: Boolean, default: true, },
    label: { type: Boolean, default: true, },
    labelCompact: { type: Boolean, default: false, },
    compact: { type: Array, default: () => [ 'xs', 'sm', ] },
    seriesPos: { type: Array, default: () => [ '50%', '60%',] },
    seriesPosCompact: { type: Array, default: () => [ '200rem', '57%',] },
  },
  data: () => ({
    config: {
      title: {
        text: '',
        left: '',
      },
      legend: {
        show: false,
        left: 'left',
        top: '20%',
        orient: 'vertical',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '',
          type: 'pie',
          center: [],
          radius: [ '40%', '70%',],
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '',
          },
          data: [],
        },
      ],
    },
  }),
  methods: {
    fetch () {
      this.fetchConfig()
    },
    fetchData () {
      this.config.series[0].data = this.data

      this.update()
    },
    fetchTitle () {
      this.config.title.text = this.title
      this.config.series[0].name = this.title
    },
    fetchTitlePos () {
      this.config.title.left = this.isCompact() ? this.titlePosCompact : this.titlePos
    },
    fetchLabelFormatter () {
      this.config.series[0].label.formatter = this.labelFormatter
    },
    fetchLegend () {
      console.log('pol', this.isCompact())
      this.config.legend.show = this.isCompact() ? this.legendCompact : this.legend
    },
    fetchLabel () {
      this.config.series[0].label.show = this.isCompact() ? this.labelCompact : this.label
    },
    fetchSeriesPos () {
      this.config.series[0].center = this.isCompact() ? this.seriesPosCompact : this.seriesPos
    },
    fetchSize () {
      this.fetchLegend()
      this.fetchLabel()
      this.fetchSeriesPos()
      this.fetchTitlePos()
    },
    fetchConfig () {
      this.config = { ...this.config, ...this.option, }

      this.fetchData()
      this.fetchTitle()
      this.fetchLabelFormatter()
      this.fetchLegend()
      this.fetchSize()
    },
    update () {
      this.$refs.IEcharts.update()
    },
    isCompact () {
      return this.compact.indexOf(this.screen.size) !== -1
    }
  },
  mounted () {
    this.fetch()
  },
  watch: {
    data: {
      deep: true,
      handler () {
        this.fetchData()
      },
    },
    title () {
      this.fetchTitle()
    },
    option: {
      deep: true,
      handler () {
        this.fetchConfig()
      },
    },
    labelFormatter () {
      this.fetchLabelFormatter()
    },
    legend () {
      this.fetchLegend()
    },
    label () {
      this.fetchLabel()
    },
    screen: {
      deep: true,
      handler () {
        this.fetchSize()
      },
    },
  },
}
</script>