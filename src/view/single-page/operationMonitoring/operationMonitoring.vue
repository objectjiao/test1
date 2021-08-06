<template>
    <div>
        <Row :gutter="20">
            <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`"
                   style="height: 120px;padding-bottom: 10px;">
                <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
                    <count-to :end="infor.count" count-class="count-style"/>
                    <p class="title-style">{{ infor.title }}</p>
                </infor-card>
            </i-col>
        </Row>
        <vInput v-model="data1">
          <template v-slot="slotapp">
              {{slotapp.slotData.data}}
          </template>
        </vInput>
        <Row :gutter="20" style="margin-top: 5px;">
            <i-col :md="24" :lg="8" style="margin-bottom: 10px;">
                <Card shadow>
                    <chart-pie style="height: 250px;" :value="pieData" text="依据金融产品类型"></chart-pie>
                </Card>
            </i-col>
            <i-col :md="24" :lg="16" style="margin-bottom: 10px;">
                <Card shadow>
                    <companySelBtn :chartsName="'CGAL'"  @change-sel-btn="companyChangeSelBtn"></companySelBtn>
                    <example :value="lineData" :type="company.companyCGAL" style="height: 250px;" text="成功案例数" v-if="chartsShow.CGAL"/>
                </Card>
            </i-col>
        </Row>
        <Row :gutter="20" style="margin-top: 5px;">
            <i-col :md="24" :lg="12" style="margin-bottom: 10px;">
                <Card shadow>
                    <companySelBtn :chartsName="'RZFB'" @change-sel-btn="companyChangeSelBtn"></companySelBtn>
                    <chart-bar style="height: 250px;" :type="company.companyRZFB" :value="barDataXm" text="融资发布数" v-if="chartsShow.RZFB"/>
                </Card>
            </i-col>
            <i-col :md="24" :lg="12" style="margin-bottom: 10px;">
                <Card shadow>
                    <companySelBtn :chartsName="'JRCP'" @change-sel-btn="companyChangeSelBtn"></companySelBtn>
                    <chart-bar style="height: 250px;" :value="barDataJr" :type="company.companyJRCP" text="金融产品发布数" v-if="chartsShow.JRCP"/>
                </Card>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import InforCard from '_c/info-card'
    import vInput from './input'
    import CountTo from '_c/count-to'
    import {ChartPie, ChartBar} from '_c/charts'
    import Example from './example.vue'
    import companySelBtn from './companySelBtn.vue'
    import {ZXWRZ_GetStatisticalData} from '@/api/login/login'

    export default {
        name: 'operationMonitoring',
        components: {
            InforCard,
            CountTo,
            ChartPie,
            ChartBar,
            Example,
            companySelBtn,
            vInput
        },
        data() {
            return {
                data1:'12312',
                inforCardData: [
                    {title: '认证企业', name: 'qyrz', icon: 'md-person-add', count: 803, color: '#2d8cf0'},
                    {title: '金融机构', name: 'jrjg', icon: 'md-locate', count: 232, color: '#19be6b'},
                    {title: '金融产品', name: 'jrcp', icon: 'md-help-circle', count: 142, color: '#ff9900'},
                    {title: '融资需求', name: 'xmxq', icon: 'md-share', count: 657, color: '#ed3f14'},
                    {title: '成功案例', name: 'cgal', icon: 'md-chatbubbles', count: 12, color: '#E46CBB'},
                    {title: '融资总额(万元)', name: 'cjze', icon: 'md-map', count: 14, color: '#9A66E4'}
                ],
                chartsShow: {
                    CGAL:false,
                    RZFB:false,
                    JRCP:false,
                },
                pieData: [
                    {value: 335, name: '信用', title: 'xy'},
                    {value: 310, name: '抵押', title: 'dy'},
                    {value: 234, name: '保证', title: 'bz'},
                    {value: 135, name: '贴现', title: 'tx'},
                    {value: 1548, name: '质押', title: 'zy'},
                    {value: 12312, name: '综合', title: 'zh'},
                ],
                lineData: {},
                barDataXm: {},
                barDataJr: {},
                //选择 周 季 年
                company:{
                    companyCGAL:'week',
                    companyRZFB:'week',
                    companyJRCP:'week',
                },
                //筛选后传过去的数据
                lineDataScreen: {},
                barDataXmScreen: {},
                barDataJrScreen: {},
            }
        },
        computed:{

        },
        created() {
            this.getStatisticalData();
        },
        mounted() {
            setInterval(()=>{
                if(this.$route.path == '/operationMonitoring/operationMonitoring'){
                    this.getStatisticalData();
                }
            },15000)
        },
        methods:{
            getStatisticalData(){
                ZXWRZ_GetStatisticalData().then((res) => {
                    if (res.code === 200) {
                        this.inforCardData.map((val) => {
                            val.count = parseInt(res.data.tb[val.name] || 0)
                        });
                        this.pieData.map((val) => {
                            val.value = parseInt(res.data.bt[val.title] || 0)
                        });
                        this.lineData = res.data.zx;
                        this.barDataXm = res.data.ztxm;
                        this.barDataJr = res.data.ztjr;
                        this.chartsShow.CGAL = true;
                        this.chartsShow.RZFB = true;
                        this.chartsShow.JRCP = true;
                    }
                })
            },
            companyChangeSelBtn(type,name){
                if(name === 'CGAL'){
                    this.company.companyCGAL = type;
                    this.chartsShow.CGAL= false;
                    this.$nextTick(()=>{
                        this.chartsShow.CGAL = true;
                    })
                }else if(name === 'RZFB'){
                    this.company.companyRZFB = type;
                    this.chartsShow.RZFB= false;
                    this.$nextTick(()=>{
                        this.chartsShow.RZFB = true;
                    })
                }else if(name === 'JRCP'){
                    this.company.companyJRCP = type;
                    this.chartsShow.JRCP= false;
                    this.$nextTick(()=>{
                        this.chartsShow.JRCP = true;
                    })
                }
            }
        },

    }
</script>

<style lang="less">
    .count-style {
        font-size: 30px;
    }

    .title-style{
        font-size: 18px;
    }
</style>
