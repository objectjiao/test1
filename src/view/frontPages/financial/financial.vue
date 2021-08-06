<template>
    <div class="financial">
        <qNav :isNoShow="true"></qNav>
        <div class="financialSearch">
            <div class="com_center">
                <div class="financialSearch_div">
                    <span>产品</span>
                    <Input v-model="search"/>
                    <div class="com_i_btn" @click="getList">搜索</div>
                </div>
                <ul class="financialSearch_filter">
                    <li>
                        <span>银行</span>
                        <div class="li_all">
                            <div class="div_span" :class="{addSpan:item.show}"
                                 v-for="item in filter.check.bank" @click="getRadio(4,item.key)">
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
                    <li>
                        <span>排序方式</span>
                        <div class="li_all">
                            <div class="div_span" :class="{addSpan:item.key===filter.active.sort}"
                                 v-for="item in filter.radio.sort" @click="getRadio(3,item.key)">
                                <span>{{item.value}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="financialProduct">
            <div class="com_center">
                <div class="financialProduct_list noSelect">
                    <div>
                        <div class="div01 ">银行名称</div>
                        <div class="div02 floatLeft">贷款形式</div>
                        <div class="div03 floatLeft">贷款额度</div>
                        <div class="div04 floatLeft">参考利率</div>
                        <div class="div05 floatLeft">担保方式</div>
                        <div class="div06 floatLeft">贷款期限</div>
                        <div class="div07"></div>
                    </div>
                    <ul>
                        <li v-for="item in financialList">
                            <div class="div01 leftDiv">
                                <img :src="require('../bankImg/'+getBankImg(item.bank_ZH))">
                            </div>
                            <div class="div02 rightDiv"><span>{{item.productName}}</span></div>
                            <div class="div03 rightDiv"><span>{{item.quota+'万'}}</span></div>
                            <div class="div04 rightDiv">
                                <span>{{item.interestRate_min + '%'}}{{item.interestRate_max!==item.interestRate_min?('~'+item.interestRate_max+'%'):''}}</span>
                            </div>
                            <div class="div05 rightDiv"><span>{{item.dbfs}}</span></div>
                            <div class="div06 rightDiv"><span>{{item.dkqx}}{{item.dkqX_Unit}}</span></div>
                            <div class="div07 rightDiv"><span><div class="com_i_btn"
                                                                   @click="getPath(item.id,item.bank_ZH)">详情</div></span>
                            </div>
                            <p>{{item.introduce}}</p>
                        </li>
                    </ul>
                </div>
                <Page :total="financial.total" :page-size="financial.pageSize" :current="financial.pageIndex"
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
     @date 2020/8/21 10:37 上午
     */
    import qNav from '../components/qNav'
    import qBom from '../components/qBom'

    import {GetBankList, GetFinanProductsList_QD, ApplyProductByQY_QD} from '@/api/front/financial'

    export default {
        name: 'financial',
        components: {
            qNav,
            qBom
        },
        data() {
            return {
                search: '',
                //筛选
                filter: {
                    //当前
                    active: {
                        quota: '',
                        vouch: '',
                        loan: '',
                        sort: 2,
                    },
                    radio: {
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
                        //排序
                        sort: [
                            {key: 0, value: '按利率'},
                            {key: 1, value: '按热门商品'},
                            {key: 2, value: '上线时间排序'},
                        ],
                    },
                    check: {
                        //银行
                        bank: []
                    }

                },
                financialList: [],
                financial: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 100
                },
                pageSizeOpts: [10, 15, 30],

            }
        },
        methods: {
            getPath(id, name) {
                let routeUrl = this.$router.resolve({
                    path: "/financialDetail",
                    query: {id: id}
                });
                window.open(routeUrl.href, '_blank');
            },
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
                    if (key === this.filter.active.sort) {
                        return;
                    }
                    this.filter.active.sort = key;
                } else if (type === 4) {
                    this.filter.check.bank.map(item => {
                        if (item.key === key) {
                            item.show = !item.show;
                        }
                    });
                }
                this.getList();
            },
            //获取所有银行
            getAllBank() {
                GetBankList().then(res => {
                    if (res.code === 200) {
                        this.filter.check.bank = res.data.map(item => {
                            return {
                                key: item.zh, value: item.zh, show: false
                            }
                        });
                    }
                })
            },
            //获取列表
            getList() {
                let bankNames = [];
                this.filter.check.bank.map(item => {
                    if (item.show) {
                        bankNames.push(item.value)
                    }
                });
                let bankNamesStr = bankNames.join(',');
                let data = {
                    orderBy: this.filter.active.sort,
                    pageIndex: this.financial.pageIndex,
                    pageSize: this.financial.pageSize,
                };
                if (this.search) {
                    data['productKey'] = this.search;
                }
                if (bankNamesStr) {
                    data['bankNames'] = bankNamesStr;
                }
                if (this.filter.active.quota) {
                    data['dked'] = this.filter.active.quota;
                }
                if (this.filter.active.vouch) {
                    data['dbfs'] = this.filter.active.vouch;
                }
                if (this.filter.active.loan) {
                    data['dkqx'] = this.filter.active.loan;
                }

                GetFinanProductsList_QD(data).then(res => {
                    if (res.code === 200) {
                        this.financialList = res.data.dt;
                        this.financial.total = res.data.count;
                    }
                })
            },
            pagePageFil(page) {
                this.financial.pageIndex = page;
                this.getList();
            },
            pageSizeFil(pageSize) {
                this.financial.pageSize = pageSize;
                this.getList();
            },
            //银行图片
            getBankImg(name) {
                let url = this.getBankUrl(name);
                return url;
            },

        },
        mounted() {
            this.getAllBank();
            this.getList();
        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    @import '../css/comFront.less';

    .financial {
        width: 100%;
        min-width: 1200px;

        .financialSearch {
            width: 100%;
            padding: 40px 0;

            .financialSearch_div {
                width: 100%;
                height: 40px;
                line-height: 40px;
                margin-bottom: 20px;

                > span {
                    height: 100%;
                    width: 120px;
                    text-align: left;
                    color: #333;
                    font-size: 16px;
                    float: left;
                    display: inline-block;
                    margin-right: 10px;
                    letter-spacing: 1px;
                }

                .ivu-input {
                    height: 35px;
                    font-size: 15px;
                    border: 1px solid #ddd;
                    background-color: transparent;
                }

                .ivu-input-wrapper {
                    width: 300px;
                    height: 35px;
                    float: left;
                    margin-right: 20px;
                    position: relative;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .ivu-input:focus {
                    border-color: #1b4673;
                    outline: 0;
                    box-shadow: 0 0 0 2px rgba(27, 70, 115, 0.23);
                }
            }

            .financialSearch_filter {
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

        .financialProduct {
            width: 100%;
            padding-bottom: 40px;

            .financialProduct_list {
                width: 100%;
                border-radius: 3px 3px 0 0;
                border: solid 2px #bfbfbf;
                box-shadow: 1px 5px 23px 2px rgba(166, 166, 166, 0.28);
                margin-bottom: 30px;

                > div {
                    width: 100%;
                    height: 60px;
                    background-color: #c39f6f;
                    box-shadow: 1px 5px 24px 2px rgba(166, 166, 166, 0.3);
                    white-space: nowrap;
                    padding: 0 15px;

                    > div {
                        line-height: 60px;
                        font-size: 18px;
                        color: #fff;
                        float: left;
                        letter-spacing: 2px;
                        display: inline-block;
                        padding: 0 5px;
                        text-align: center;
                    }
                }

                > ul {
                    > li:last-child {
                        border-bottom: 0;
                    }

                    > li {
                        height: 90px;
                        padding: 10px 15px;
                        border-bottom: 1px solid #bfbfbf;

                        .leftDiv {
                            text-align: center;
                            float: left;
                            height: 100%;

                            img {
                                display: inline-block;
                                max-height: 70%;
                                max-width: 80%;
                                position: relative;
                                top: 50%;
                                transform: translateY(-50%);
                            }
                        }

                        > .rightDiv {
                            font-size: 14px;
                            color: #666666;
                            float: left;
                            letter-spacing: 1px;
                            display: inline-block;
                            text-align: left;
                            padding: 0 5px;
                            height: calc(~'100% - 30px');

                            span {
                                position: relative;
                                top: 50%;
                                transform: translateY(-50%);
                                display: block;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                            }
                        }

                        p {
                            line-height: 30px;
                            height: 30px;
                            font-size: 14px;
                            color: #666666;
                            padding: 0 5px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }
                }

                .floatLeft {
                    text-align: left;
                }

                .div01 {
                    width: 20%;
                }

                .div02 {
                    width: 13%;
                }

                .div03 {
                    width: 16%;
                }

                .div04 {

                    width: 16%;
                }

                .div05 {
                    width: 13%;
                }

                .div06 {
                    width: 13%;
                }

                .div07 {
                    width: 9%;
                }
            }
        }
    }
</style>

















