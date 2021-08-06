<template>
  <div ref="dom"></div>
</template>

<script>
  import echarts from 'echarts'
    import {on, off} from '@/libs/tools'
    export default {
        name: 'serviceRequests',
        data() {
            return {
                dom: null,
            }
        },
        props: {
            value: Object,
            type:String,
            text: String,
            subtext: String
        },
        methods: {
            resize() {
                this.dom.resize()
            },
        },

        mounted() {
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
            const option = {
                title: {
                    text: this.text,
                    subtext: this.subtext,
                    x: 'center',
                    textStyle:{
                        color:'rgb(81 107 145)',
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    top: '20%',
                    left: '4%',
                    right: '4%',
                    bottom: '4%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: seriesData
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '案例数量',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color: '#2d8cf0'
                            }
                        },
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
                        data: tableData
                    }
                ],
            }
            this.$nextTick(() => {
                this.dom = echarts.init(this.$refs.dom);
                this.dom.setOption(option);
                on(window, 'resize', this.resize)
            })
        },
        beforeDestroy() {
          off(window, 'resize', this.resize)
        },
        destroyed(){
        }
    }
</script>
<style lang="less">
    .exampleBtn{
        position: absolute;
        right: 0;
        left: 0;
    }
</style>
