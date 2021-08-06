<template>
    <div class="demand">
        <qNav :isNoShow="true"></qNav>
        <div class="demandSearch">
            <div class="com_center">
                <ul class="demandSearch_filter">
                    <li>
                        <span>产品分类</span>
                        <div class="li_all">
                            <div class="div_span" :class="{addSpan:item.key===filter.active.type}"
                                 v-for="item in filter.radio.type" @click="getRadio(3,item.key)">
                                <span>{{item.value}}</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span>贷款额度</span>
                        <div class="li_all">
                            <div class="div_span" :class="{addSpan:item.key===filter.active.quota}"
                                 v-for="item in filter.radio.quota" @click="getRadio(0,item.key)">
                                <span>{{item.value}}</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span>担保方式</span>
                        <div class="li_all">
                            <div class="div_span" :class="{addSpan:item.key===filter.active.vouch}"
                                 v-for="item in filter.radio.vouch" @click="getRadio(1,item.key)">
                                <span>{{item.value}}</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span>贷款期限</span>
                        <div class="li_all">
                            <div class="div_span" :class="{addSpan:item.key===filter.active.loan}"
                                 v-for="item in filter.radio.loan" @click="getRadio(2,item.key)">
                                <span>{{item.value}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="com_model case">
            <div class="com_center">
                <div class="com_tilDiv">
                    <p class="com_til">{{filter.active.type===0?'需求列表':'成功案例'}}</p>
                    <p class="com_eng">Success stories</p>
                    <p class="com_line"><span></span></p>
                </div>
                <div class="com_body noSelect">
                    <ul>
                        <li v-for="item in demandList">
                            <p class="loanBox">
                                <span class="value">{{item.dkfs}}贷款</span>
                            </p>
                            <span class="moneySpan">{{item.quota}}万</span>
                            <p class="companyBox">
                                <span class="key">{{item.productName}}</span>
                                <span class="value">{{item.qymc}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <Page :total="demand.total" :page-size="demand.pageSize" :current="demand.pageIndex"
                      show-elevator show-sizer show-total class="com_page" :page-size-opts="pageSizeOpts"
                      @on-change="pagePageFil" @on-page-size-change="pageSizeFil"/>
            </div>
        </div>
        <qBom></qBom>
    </div>
</template>

<script>
    /**
     @author xiaoye
     @date 2020/8/21 10:38 上午
     */
    import qNav from '../components/qNav'
    import qBom from '../components/qBom'

    import {GetDemandsList_QD} from '@/api/front/demand'

    export default {
        name: 'demand',
        components: {
            qNav,
            qBom
        },
        props: {
            name: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                //筛选
                filter: {
                    //当前
                    active: {
                        type: 0,
                        quota: '',
                        vouch: '',
                        loan: '',
                    },
                    radio: {
                        //方式
                        type: [
                            {key: 0, value: '需求列表'},
                            {key: 1, value: '成功案例'},
                        ],
                        //  贷款额度
                        quota: [
                            {key: '', value: '全部'},
                            {key: '50', value: '50万以下'},
                            {key: '100', value: '100万及以下'},
                            {key: '200', value: '200万及以下'},
                            {key: '500', value: '500万及以下'},
                            {key: '1000', value: '1000万及以下'},
                            {key: '1000+', value: '1000万及以上'},
                        ],
                        //担保方式
                        vouch: [
                            {key: '', value: '全部'},
                            {key: '担保', value: '担保'},
                            {key: '信用', value: '信用'},
                            {key: '抵押', value: '抵押'},
                            {key: '保证', value: '保证'},
                            {key: '贴现', value: '贴现'},
                            {key: '质押', value: '质押'},
                            {key: '综合', value: '综合'},
                        ],
                        //贷款期限
                        loan: [
                            {key: '', value: '全部'},
                            {key: '1年以下', value: '1年以下'},
                            {key: '1-3年', value: '1-3年'},
                            {key: '3-5年', value: '3-5年'},
                            {key: '5年以上', value: '5年以上'},
                        ],
                    },

                },
                demandList: [],
                demand: {
                    pageIndex: 1,
                    pageSize: 8,
                    total: 100
                },pageSizeOpts: [8, 16, 24],
            }
        },
        methods: {

            getRadio(type, key) {
                if (type === 0) {
                    if (key === this.filter.active.quota) {
                        return;
                    }
                    this.filter.active.quota = key;
                } else if (type === 1) {
                    if (key === this.filter.active.vouch) {
                        return;
                    }
                    this.filter.active.vouch = key;
                } else if (type === 2) {
                    if (key === this.filter.active.loan) {
                        return;
                    }
                    this.filter.active.loan = key;
                } else if (type === 3) {
                    if (key === this.filter.active.type) {
                        return;
                    }
                    this.filter.active.type = key;
                }
                this.getList();
            },
            //获取列表
            getList() {
                let data = {
                    type: this.filter.active.type,
                    dked: this.filter.active.quota,
                    dbfs: this.filter.active.vouch,
                    dkqx: this.filter.active.loan,
                    pageIndex: this.demand.pageIndex,
                    pageSize: this.demand.pageSize,
                };
                GetDemandsList_QD(data).then(res => {
                    if (res.code === 200) {
                        this.demandList = res.data.dt;
                        this.demand.total = res.data.count;
                    }
                })
            },
            pagePageFil(page) {
                this.demand.pageIndex = page;
                this.getList();
            },
            pageSizeFil(pageSize) {
                this.demand.pageSize = pageSize;
                this.getList();
            },
        },
        mounted() {
            this.getList();
        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    @import '../css/comFront.less';

    .demand {
        width: 100%;
        min-width: 1200px;

        .demandSearch {
            width: 100%;
            padding-top: 40px;

            .demandSearch_filter {
                width: 100%;
                display: inline-block;

                > li {
                    display: inline-block;
                    width: 100%;

                    > span {
                        height: 100%;
                        width: 120px;
                        text-align: left;
                        color: #333;
                        font-size: 16px;
                        float: left;
                        display: inline-block;
                        margin-right: 10px;
                        line-height: 40px;
                        letter-spacing: 1px;
                    }

                    > .li_all {
                        width: calc(~'100% - 130px');
                        display: inline-block;

                        > .div_span {
                            text-align: left;
                            float: left;
                            display: inline-block;
                            margin-right: 20px;
                            margin-bottom: 10px;
                            height: 40px;

                            > span {
                                color: #666666;
                                font-size: 16px;
                                display: inline-block;
                                position: relative;
                                top: 50%;
                                transform: translateY(-50%);
                                cursor: pointer;
                            }

                            span:hover {
                                color: #0b0073;
                            }
                        }

                        .addSpan {
                            span {
                                font-weight: bold;
                                color: #1b4673;
                            }
                        }
                    }
                }
            }

        }

        .case {
            padding-bottom: 40px;

            .com_body {
                ul {
                    width: calc(~'100% + 40px');
                    text-align: center;

                    li {
                        background: url("./img/back1.jpg");
                        background-size: 100% 100%;
                        max-width: 230px;
                        width: calc(~'25% - 40px');
                        height: 190px;
                        border-radius: 6px;
                        padding: 15px 20px;
                        position: relative;
                        color: #fff;
                        margin-right: 40px;
                        margin-bottom: 40px;
                        display: inline-block;
                        text-align: left;

                        > p, > span {
                            width: calc(~'100% - 40px');
                        }

                        .loanBox {
                            position: absolute;
                            top: 15px;

                            .key {
                                font-size: 12px;
                                width: 100%;
                                display: inline-block;
                                margin-bottom: 5px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }

                            .value {
                                font-size: 16px;
                                width: 100%;
                                display: inline-block;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }

                        .moneySpan {
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            font-size: 22px;
                            font-weight: bold;
                            display: inline-block;
                        }

                        .companyBox {
                            position: absolute;
                            bottom: 10px;

                            .key {
                                font-size: 14px;
                                width: 100%;
                                display: inline-block;
                                margin-bottom: 5px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }

                            .value {
                                font-size: 12px;
                                width: 100%;
                                display: inline-block;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
            }

            .com_page {
                margin-top: 10px;
            }
        }
    }
</style>