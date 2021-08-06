<template>
    <div class="demandManagement">
        <Card>
            <tables
                    ref="tables"
                    editable
                    searchable
                    :border="false"
                    size="small"
                    search-place="top"
                    :height="500"
                    v-model="stores.data"
                    :totalCount="stores.query.totalCount"
                    :columns="stores.columns"
                    @on-edit="handleEdit"
                    @on-refresh="loadDeptList"
                    @on-page-change="handlePageChanged"
                    @on-page-size-change="handlePageSizeChanged"
            >
                <div slot="search">
                </div>
            </tables>
        </Card>
        <Modal
                v-model="cardPushBox.show"
                title="需求融资推送"
                :mask-closable="false"
                :closable="false"
                class="noSelect"
                class-name="demandManagementModal"
        >
            <div class="information">
                <div>
                    <span class="information_title">需求信息</span>
                    <div class="information_content">
                        <div class="information_key">企业名称</div>
                        <div class="information_value">
                            {{cardPushBox.qymc}}
                            <div class="report" @click="pushEnterpriseCreditReport(cardPushBox.tyxydm)" >
                                <Icon type="ios-browsers" size="20" color="#4f9bff" />
                                <span>查看企业信用报告</span>
                            </div>
                        </div>
                    </div>
                    <div class="information_content">
                        <div class="information_key">统一社会信用代码</div>
                        <div class="information_value">{{cardPushBox.tyxydm}}</div>
                    </div>
                    <div class="information_content">
                        <div class="information_key">贷款方式</div>
                        <div class="information_value">{{cardPushBox.dkfs}}</div>
                    </div>
                    <div class="information_content">
                        <div class="information_key">贷款期限</div>
                        <div class="information_value">{{cardPushBox.dkqx}}&nbsp{{cardPushBox.dkqX_Unit}}</div>
                    </div>
                    <div class="information_content">
                        <div class="information_key">贷款限额</div>
                        <div class="information_value">{{cardPushBox.quota}}
                            <span v-if="cardPushBox.quota !== ''">万元</span>
                        </div>
                    </div>
                    <div class="information_content information_content_last">
                        <div class="information_key">创建时间</div>
                        <div class="information_value">{{cardPushBox.createTime}}</div>
                    </div>
                    <div v-if="cardPushBox.sfysq === 1">
                        <span class="information_title" style="margin-top: 20px">推送过的产品</span>
                        <div class="information_header">
                            <div>推送过金融机构</div>
                            <div>推送的产品</div>
                        </div>
                        <div class="information_border" v-for="item in cardPushBox.proList" :key="cardPushBox.productID">
                            <div>{{item.bankName}}</div>
                            <div>{{item.productName}}</div>
                        </div>
                    </div>
                </div>
                <div class="lableBoxselect" v-can="'cardPushBox'" v-if="cardPushBox.sfysq === 0">
                    <span class="information_title"  style="margin-top: 20px" >产品推送</span>
                    <div class="lableBox">
                        <Select class="Boxselect" v-model="cardPushBox.productSelect" size="large"  >
                            <Option v-for="item in cardPushBox.productList" :value="item.id" :key="item.id">
                                {{item.productName}}
                            </Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div slot="footer"  v-can="'cardPushButton'" >
                <Button type="text" size="large" v-if="cardPushBox.sfysq === 0" @click="clearCardPushBox()">取消</Button>
                <Button type="primary" size="large" v-if="cardPushBox.sfysq === 0" @click="handleEdit()">确定提交</Button>
            </div>
            <div slot="footer"  v-if="cardPushBox.sfysq === 1">
                <Button type="primary" size="large" v-can="'cardPushButton'" @click="clearCardPushBox()">确认</Button>
            </div>
            <div slot="footer" v-can="'cardPushButtonAdmin'">
                <Button type="primary" size="large" @click="clearCardPushBox()">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    /**
     @author xcf
     @date 2020/8/18 17:35 下午
     */
    import Tables from "_c/tables";
    import {
        ZXWRZ_GetDemandsList,
        ZXWRZ_GetFinanProductsList,
        ZXWRZ_JRJG_ApplyDemand_QD,
    } from '@/api/back/projectManagement';

    export default {
        name: 'demandManagement',
        components: {
            Tables
        },
        props: {
            name: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                //表格默认值
                stores: {
                    //基本数据
                    query: {
                        totalCount: 0,
                        pageSize: 15,
                        currentPage: 1,
                        kw: "",
                        status: -1,
                    },
                    //下拉框
                    sources: {
                        statusSources: [
                            {value: -1, text: "全部"},
                            {value: 0, text: "已完成"},
                            {value: 1, text: "待处理"},
                        ],
                    },
                    //字段数据
                    columns: [
                        {title: "订单编号", ellipsis: true, tooltip: true, key: "id"},
                        {title: "企业名称", ellipsis: true, tooltip: true, key: "qymc",render: (h, params) => {
                                return h('Tooltip',{
                                    props: {
                                        content:'点击查看企业信用报告',
                                        placement:"right"
                                    },
                                }, [
                                    h('span', {
                                        props: {},
                                        style: {
                                            cursor: 'pointer',
                                        },
                                        on: {
                                            click: e => {
                                                this.pushEnterpriseCreditReport(params.row.tyxydm)
                                            }
                                        }
                                    }, params.row.qymc)])
                            }},
                        {title: "法人名称", ellipsis: true, tooltip: true, key: "frmc"},
                        {title: "统一社会信用代码", ellipsis: true, tooltip: true, key: "tyxydm"},
                        {title: "贷款方式", ellipsis: true, tooltip: true, key: "dkfs"},
                        {
                            title: "贷款期限", ellipsis: true, tooltip: true, key: "dkqx",
                            render: (h, params) => {
                                return h('span', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                    },
                                    style: {
                                        cursor: 'pointer',
                                        marginLeft: '10px',
                                    },
                                    on: {
                                        click: e => {
                                            operation()
                                        }
                                    }
                                }, params.row.dkqx + params.row.dkqX_Unit)
                            }
                        },
                        {
                            title: "贷款限额", ellipsis: true, tooltip: true, key: "quota",
                            render: (h, params) => {
                                return h('span', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                    },
                                    style: {
                                        cursor: 'pointer',
                                        marginLeft: '10px',
                                    },
                                    on: {
                                        click: e => {
                                            operation()
                                        }
                                    }
                                }, params.row.quota + '万元')
                            }
                        },
                        {title: "申请时间", ellipsis: true, tooltip: true, key: "createTime"},
                        {
                            title: '操作',
                            key: "flowStatus",
                            align: 'center',
                            ellipsis: true,
                            tooltip: true,
                            render: (h, params) => {
                                let a = [];
                                if (params.row.sfysq === 0) {
                                    a.push(h('Button', {
                                        props: {
                                            type: 'warning',
                                            size: 'small',
                                        },
                                        style: {
                                            cursor: 'pointer',
                                            marginLeft: '10px',
                                        },
                                        on: {
                                            click: e => {
                                                this.clearCardPushBox()
                                                if(this.$store.state.user.IdentityZn !== '超级管理员' || this.$store.state.user.IdentityZn !== '超级管理员'){
                                                    this.getfinanProInfo();
                                                }
                                                this.cardPushBox.show = true;
                                                this.cardPushBox.id = params.row.id;
                                                this.cardPushBox.sfysq = params.row.sfysq;
                                                this.cardPushBox.qymc = params.row.qymc;
                                                this.cardPushBox.tyxydm = params.row.tyxydm;
                                                this.cardPushBox.dkfs = params.row.dkfs;
                                                this.cardPushBox.dkqx = params.row.dkqx;
                                                this.cardPushBox.dkqX_Unit = params.row.dkqX_Unit;
                                                this.cardPushBox.quota = params.row.quota;
                                                this.cardPushBox.createTime = params.row.createTime;
                                                this.cardPushBox.proList = params.row.proList;
                                            }
                                        }
                                    }, '未推送'))
                                }else if(params.row.sfysq === 1){
                                    a.push(h('Button', {
                                        props: {
                                            type: 'success',
                                            size: 'small',
                                        },
                                        style: {
                                            cursor: 'pointer',
                                            marginLeft: '10px',
                                        },
                                        on: {
                                            click: e => {
                                                this.clearCardPushBox();
                                                if(this.$store.state.user.IdentityZn !== '超级管理员'){
                                                    this.getfinanProInfo();
                                                }
                                                this.cardPushBox.show = true;
                                                this.cardPushBox.id = params.row.id;
                                                this.cardPushBox.sfysq = params.row.sfysq;
                                                this.cardPushBox.qymc = params.row.qymc;
                                                this.cardPushBox.tyxydm = params.row.tyxydm;
                                                this.cardPushBox.dkfs = params.row.dkfs;
                                                this.cardPushBox.dkqx = params.row.dkqx;
                                                this.cardPushBox.quota = params.row.quota;
                                                this.cardPushBox.createTime = params.row.createTime;
                                                this.cardPushBox.proList = params.row.proList;
                                            }
                                        }
                                    }, '已推送'))
                                }
                                return h('div', a)
                            }
                        }
                    ],
                    //表格数据
                    data: [
                        {
                            id:'',
                            dkqX_Unit:'',
                            frmc:'',
                            qymc: '',
                            tyxydm: '',
                            sfysq:'',
                            dkfs: '',
                            dkqx: '',
                            quota: '',
                            createTime: '',
                            proList:[],
                        }
                    ],
                },
                //展示 表单
                cardPushBox: {
                    show: false,
                    id:'',
                    frmc:'',
                    qymc: '',
                    sfysq:'',
                    tyxydm: '',
                    dkfs: '',
                    dkqx: '',
                    quota: '',
                    dkqX_Unit:'',
                    createTime: '',
                    proList:[],
                    productSelect:'',
                    productList:[]
                }
            }
        },
        methods: {
            //查询表格
            async loadDeptList() {
                await ZXWRZ_GetDemandsList({
                    pageIndex: this.stores.query.currentPage,
                    pageSize: this.stores.query.pageSize,
                }).then((res) => {
                    if (res.code === 200) {
                        this.stores.data = res.data.listDemand;
                        this.stores.query.totalCount = res.data.count;
                    }
                })
            },
            // 获取产品列表
            async getfinanProInfo() {
                await ZXWRZ_GetFinanProductsList({
                    pageIndex: 1,
                    pageSize: 10000,
                }).then((res) => {
                    if (res.code === 200) {
                        this.cardPushBox.productList = res.data.dt;
                    }
                })
            },
            //表格 - 推产品
            handleEdit() {
                if(this.cardPushBox.productSelect === ''){
                    this.$Message.error('必须选择一个产品提交！');
                    return
                }
                ZXWRZ_JRJG_ApplyDemand_QD({
                    "demandID" :this.cardPushBox.id,
                    "ProductID": this.cardPushBox.productSelect,
                }).then((res) => {
                    if (res.code === 200) {
                        this.$Message.success({
                            content: res.message,
                            duration: 2.5,
                            closable: true
                        });
                        this.loadDeptList();
                    } else {
                        this.$Message.warning({
                            content: res.message,
                            duration: 5,
                            closable: true
                        });
                    }
                    this.clearCardPushBox();
                })
            },
            //切换页
            handlePageChanged(page) {
                this.selectedRowsId = [];
                this.stores.query.currentPage = page;
                this.loadDeptList();
            },
            //切换一页展示多少数据
            handlePageSizeChanged(pageSize) {
                this.selectedRowsId = [];
                this.stores.query.pageSize = pageSize;
                this.loadDeptList();
            },

            // 跳转企业信用报告
            pushEnterpriseCreditReport(tyxydm){
                let routeData = this.$router.resolve({ path: '/reportPages', query: {  parameter: tyxydm } });
                window.open(routeData.href, '_blank');
            },
            // 清空列表
            clearCardPushBox(){
                this.cardPushBox = {
                    id:'',
                    frmc:'',
                    qymc: '',
                    tyxydm: '',
                    dkfs: '',
                    sfysq:'',
                    dkqx: '',
                    quota: '',
                    createTime: '',
                    productSelect:'',
                    productList:[],
                    proList:[]
                }
            }
        },
        created() {
            this.loadDeptList();
        },
        mounted() {
        },
    }
</script>

<style  lang="less">
    .demandManagement {

    }

    .demandManagementModal{
        .ivu-modal-content{
            width: 700px;
            .ivu-modal-body {
                height: 420px;
                overflow: auto;
                .information {
                    .information_title {
                        font-size: 16px;
                        display: inline-block;
                        font-weight: bold;
                        text-align: left;
                        width: 100%;
                        margin-bottom: 14px;
                    }
                    .information_content {
                        font-size: 14px;
                        line-height: 30px;
                        border-left: #ddd 1px solid;
                        border-right: #ddd 1px solid;
                        .information_key {
                            display: inline-block;
                            vertical-align: top;
                            width: 23%;
                            text-align: center;
                            border-top: #ddd 1px solid;
                            height: 100%;
                            font-size: 12px;
                            color: #666;
                        }

                        .information_value {
                            display: inline-block;
                            vertical-align: top;
                            width: 77%;
                            border-top: #ddd 1px solid;
                            border-left: #ddd 1px solid;
                            padding: 0 13px;
                            color: #222;
                            overflow: hidden;
                            font-size: 12px;
                            .report{
                                float: right;
                                cursor: pointer;
                            }
                            .report:hover{
                                color: #4f9bff;
                            }
                        }

                    }
                    .information_content_last{
                        border-bottom: #ddd 1px solid;
                    }
                    .ivu-form{
                        .ivu-select-dropdown{
                            width: 100%;
                            max-width: 500px;
                        }
                    }
                    .information_header{
                        text-align: center;
                        border: #ddd 1px solid;
                        width: 100%;
                        font-size: 14px;
                        line-height: 40px;
                        color: #666;
                        div:first-child{
                            border-right: #ddd 1px solid;
                        }
                        div{
                            display: inline-block;
                            vertical-align: top;
                            width: 50%;
                        }
                    }
                    .information_border{
                        width: 100%;
                        border-bottom: #ddd 1px solid;
                        color: #222;
                        overflow: hidden;
                        font-size: 12px;
                        text-align: center;
                        line-height: 30px;
                        div:first-child{
                            border-left: #ddd 1px solid;
                        }
                        div{
                            display: inline-block;
                            vertical-align: top;
                            width: 50%;
                            padding: 0 12px;
                            border-right: #ddd 1px solid;
                        }
                    }
                }
            }
        }
    }
</style>
