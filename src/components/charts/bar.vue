<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartBar',
  props: {
    value: Object,
    text: String,
    type:String,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    this.$nextTick(() => {
      let tableData = Object.values(this.value.dataTable);
      let seriesData = Object.values(this.value.dataTime);
      switch(this.type){
        case 'quarter':
          tableData = Object.values(this.value.dataTableJD);
          seriesData = Object.values(this.value.dataTimeJD);
          break;
        case 'year':
          tableData = Object.values(this.value.dataTableND);
          seriesData = Object.values(this.value.dataTimeND);
          break;
      }

      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        grid: {
          top: '20%',
          left: '4%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: seriesData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: tableData,
          type: 'bar',
          barWidth:'20',
          itemStyle: {
            normal: {
              label: {
                show: true,		//开启显示
                position: 'top',	//在上方显示
                textStyle: {	    //数值样式
                  color: '#999',
                  fontSize: 12
                }
              }
            }
          },
        }]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
