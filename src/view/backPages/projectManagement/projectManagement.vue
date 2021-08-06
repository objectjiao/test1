<template>
    <div class="projectManagement">
        <Card>
            <tables
                    ref="tables"
                    editable
                    searchable
                    :border="false"
                    size="small"
                    search-place="top"
                    v-model="stores.data"
                    :height="450"
                    :totalCount="stores.query.totalCount"
                    :columns="stores.columns"
                    @on-edit="handleEdit"
                    @on-refresh="loadDeptList"
                    @on-page-change="handlePageChanged"
                    @on-page-size-change="handlePageSizeChanged"
                    @on-selection-change="handleSelectUser"
            >
                <div slot="search">
                    <section class="dnc-toolbar-wrap">
                        <Row :gutter="16">
                            <Col span="12">
                                <Form inline @submit.native.prevent>
                                    <FormItem>
                                        <Input
                                                type="text"
                                                search
                                                :clearable="true"
                                                v-model="stores.query.kw"
                                                placeholder="输入关键字搜索..."
                                                @on-search="loadDeptList()"
                                        >
                                            <Select
                                                    slot="prepend"
                                                    v-model="stores.query.status"
                                                    @on-change="loadDeptList"
                                                    placeholder="角色状态"
                                                    style="width:80px"
                                            >
                                                <Option
                                                        v-for="item in stores.sources.statusSources"
                                                        :value="item.value"
                                                        :key="item.value"
                                                >{{item.text}}
                                                </Option>
                                            </Select>
                                        </Input>
                                    </FormItem>
                                </Form>
                            </Col>
                            <Col span="12" class="dnc-toolbar-btns">
                                <ButtonGroup class="mr3">
                                    <Tooltip content="刷新" placement="bottom">
                                        <Button icon="md-refresh" title="刷新" @click="loadDeptList"></Button>
                                    </Tooltip>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </section>
                </div>
            </tables>
        </Card>
        <Modal
                :closable="false"
                :className="'projectManagement'"
                class-name="'projectManagement'"
                v-model="cardConfirmBox.show"
                title="审核融资"
                :mask-closable="false"
                class="noSelect"
        >
            <Form :model="cardConfirmBox" :label-width="80" :rules="ruleValidateConfirm" ref="formValidateConfirm">
                <FormItem label="批准额度" prop="pzed" v-if="cardConfirmBox.status === 1">
                    <Input class="inputItem" v-model="cardConfirmBox.pzed" size="large" clearable placeholder="批准额度">
                        <Button slot="append">万元</Button>
                    </Input>
                </FormItem>
                <FormItem label="批准利率" prop="pzlv" v-if="cardConfirmBox.status === 1">
                    <Input class="inputItem" v-model="cardConfirmBox.pzlv" size="large" clearable placeholder="批准利率">
                        <Button slot="append">%</Button>
                    </Input>
                </FormItem>
                <FormItem label="批准期限" prop="pzqx" v-if="cardConfirmBox.status === 1">
                    <Input class="inputItem" v-model="cardConfirmBox.pzqx" size="large" placeholder="批准期限">
                        <Select v-model="cardConfirmBox.pzqX_Unit" slot="append" style="width: 70px">
                            <Option value="日">日</Option>
                            <Option value="月">月</Option>
                            <Option value="年">年</Option>
                        </Select>
                    </Input>
                </FormItem>
                <FormItem label="拒绝原因" prop="refuseReason" v-if="cardConfirmBox.status === 2">
                    <Input type="textarea" class="inputItem" v-model="cardConfirmBox.refuseReason" size="large"
                           clearable
                           placeholder="拒绝原因"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cardInformationBox.show = false,clearCardPushBox()">取消</Button>
                <Button type="primary" size="large" @click="handleEdit()">确定提交</Button>
            </div>
        </Modal>
        <Modal
                v-model="cardInformationBox.show"
                :mask-closable="false"
                title="审核融资"
                class="noSelect"
        >
            <div class="information">
                <span class="information_title" style="margin-top: 0">融资信息</span>
                <div class="information_content" :class="{information_content_last:index2===5}"
                     v-for="(item,index,index2) in cardInformationBox.projectInformation">
                    <div class="information_key">{{item.label}}</div>
                    <div class="information_value">
                        {{item.value}}
                        <div class="report" v-if="item.label === '企业名称'"
                             @click="pushEnterpriseCreditReport(cardInformationBox.projectInformation.tyxydm.value)">
                            <Icon type="ios-browsers" size="20" color="#4f9bff"/>
                            <span>查看企业信用报告</span>
                        </div>
                    </div>
                </div>
                <span class="information_title" style="margin-top: 20px">产品信息</span>
                <div class="information_content">
                    <div class="information_key">金融机构分支</div>
                    <div class="information_value">{{cardInformationBox.productInformation.bank}}</div>
                </div>
                <div class="information_content">
                    <div class="information_key">贷款额度</div>
                    <div class="information_value">{{cardInformationBox.productInformation.quota}}
                        <span v-if="cardInformationBox.productInformation.quota !== ''">万元</span>
                    </div>
                </div>
                <div class="information_content">
                    <div class="information_key">利率范围</div>
                    <div class="information_value">
                        {{cardInformationBox.productInformation.interestRate_min}}%-{{cardInformationBox.productInformation.interestRate_max}}%
                    </div>
                </div>
                <div class="information_content">
                    <div class="information_key">担保方式</div>
                    <div class="information_value">{{cardInformationBox.productInformation.dbfs}}</div>
                </div>
                <div class="information_content">
                    <div class="information_key">贷款期限</div>
                    <div class="information_value">
                        {{cardInformationBox.productInformation.dkqx}}{{cardInformationBox.productInformation.dkqX_Unit}}
                    </div>
                </div>
                <div class="information_content">
                    <div class="information_key">产品特点</div>
                    <div class="information_value">{{cardInformationBox.productInformation.characteristic}}</div>
                </div>
                <div class="information_content">
                    <div class="information_key">适用客户</div>
                    <div class="information_value">{{cardInformationBox.productInformation.sykh}}</div>
                </div>
                <div class="information_content">
                    <div class="information_key">申请条件</div>
                    <div class="information_value">{{cardInformationBox.productInformation.sqtj}}</div>
                </div>
                <div class="information_content">
                    <div class="information_key">申请材料</div>
                    <div class="information_value">{{cardInformationBox.productInformation.sqcl}}</div>
                </div>
                <div class="information_content information_content_last">
                    <div class="information_key">产品介绍</div>
                    <div class="information_value">{{cardInformationBox.productInformation.introduce}}</div>
                </div>
                <span class="information_title" style="margin-top: 20px" v-if="cardConfirmBox.status===1">审批信息</span>
                <div class="information_content" v-if="cardConfirmBox.status===1">
                    <div class="information_key">批准额度</div>
                    <div class="information_value">{{cardInformationBox.productInformation.pzed}}万元</div>
                </div>
                <div class="information_content" v-if="cardConfirmBox.status===1">
                    <div class="information_key">批准利率</div>
                    <div class="information_value">{{cardInformationBox.productInformation.pzlv}}%</div>
                </div>
                <div class="information_content information_content_last" v-if="cardConfirmBox.status===1">
                    <div class="information_key">批准期限</div>
                    <div class="information_value">
                        {{cardInformationBox.productInformation.pzqx}}{{cardInformationBox.productInformation.pzqX_Unit}}
                    </div>
                </div>
                <span class="information_title" style="margin-top: 20px" v-if="cardConfirmBox.status===2">驳回原因</span>
                <div class="information_content information_content_last" v-if="cardConfirmBox.status===2">
                    <div class="information_key">驳回原因</div>
                    <div class="information_value">{{cardInformationBox.productInformation.refuseReason}}</div>
                </div>
            </div>
            <div slot="footer" v-can="'cardPushButton'" v-if="cardConfirmBox.status === 0">
                <Button type="error" size="large" @click="cardConfirmBox.show = true,cardConfirmBox.status = 2">驳回申请
                </Button>
                <Button type="primary" size="large" @click="cardConfirmBox.show = true,cardConfirmBox.status = 1">申请通过
                </Button>
            </div>
            <div slot="footer" v-can="'cardPushButton'" v-if="cardConfirmBox.status !== 0">
                <Button type="error" size="large" @click="cardInformationBox.show = false">确定</Button>
            </div>
            <div slot="footer" v-can="'cardPushButtonAdmin'">
                <Button type="error" size="large" @click="cardInformationBox.show = false">确定</Button>
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
        ZXWRZ_GetApplyQYList,
        ZXWRZ_SetApprovalApplyType,
        ZXWRZ_GetfinanProInfo
    } from '@/api/back/projectManagement';

    export default {
        name: 'projectManagement',
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
                            {value: 0, text: "待处理"},
                            {value: 1, text: "通过"},
                            {value: 2, text: "未通过"},
                        ],
                    },
                    //字段数据
                    columns: [
                        {title: "订单编号", ellipsis: true, tooltip: true, key: "applyID"},
                        {title: "金融机构", ellipsis: true, tooltip: true, key: "bank"},
                        {
                            title: "企业名称", ellipsis: true, tooltip: true, key: "qymc", render: (h, params) => {
                                return h('Tooltip', {
                                    props: {
                                        content: '点击查看企业信用报告',
                                        placement: "left"
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
                            }
                        },
                        {title: "法人名称", ellipsis: true, tooltip: true, key: "name"},
                        {title: "产品名称", ellipsis: true, tooltip: true, key: "productName",render:(h,params)=>{
                            return h('span',{},(function () {
                                if(params.row.productName === null){
                                    return '暂无推送'
                                }else {
                                   return  params.row.productName
                                }
                            })())
                            }},
                        {title: "申请时间", ellipsis: true, tooltip: true, key: "createTime"},
                        {
                            title: '操作',
                            key: "status",
                            align: 'center',
                            ellipsis: true,
                            tooltip: true,
                            render: (h, params) => {
                                let a = [];
                                // if(this.$store.state.user.IdentityZn === '超级管理员'){
                                //
                                // }
                                let operation = () => {
                                    this.cardInformationBox.show = true;
                                    this.stores.data.map(val => {
                                        if (val.applyID === params.row.applyID) {
                                            this.getfinanProInfo(val.applyID);
                                            this.cardConfirmBox.status = val.status;
                                            this.cardConfirmBox.applyID = val.applyID;
                                            this.cardInformationBox.projectInformation.bank.value = val.bank;
                                            this.cardInformationBox.projectInformation.qymc.value = val.qymc;
                                            this.cardInformationBox.projectInformation.tyxydm.value = val.tyxydm;
                                            this.cardInformationBox.projectInformation.name.value = val.name;
                                            this.cardInformationBox.projectInformation.productName.value = val.productName;
                                            this.cardInformationBox.projectInformation.createTime.value = val.createTime;
                                        }
                                    })
                                }
                                if (params.row.status === 0) {
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
                                                operation()
                                            }
                                        }
                                    }, '未审核'))
                                } else if (params.row.status === 1) {
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
                                                operation()
                                            }
                                        }
                                    }, '审核通过'))
                                } else if (params.row.status === 2) {
                                    a.push(h('Button', {
                                        props: {
                                            type: 'error',
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
                                    }, '审核不通过'))
                                }
                                return h('div', a)
                            }
                        }
                    ],
                    //表格数据
                    data: [
                        {
                            bank: '',
                            qymc: '',
                            name: '',
                            tyxydm: '',
                            productName: '',
                            createTime: '',
                        }
                    ],
                },
                //审核的验证
                ruleValidateConfirm: {
                    pzed: [
                        {required: true, message: '批准额度不能为空', trigger: 'blur'},
                    ],
                    pzlv: [
                        {required: true, message: '批准利率不能为空', trigger: 'blur'},
                    ],
                    pzqx: [
                        {required: true, message: '批准期限不能为空', trigger: 'blur'},
                    ],
                    refuseReason: [
                        {required: true, message: '拒绝原因不能为空', trigger: 'blur'},
                    ],
                },
                //审核信息弹框
                cardInformationBox: {
                    show: false,
                    projectInformation: {
                        bank: {
                            value: '',
                            label: '金融机构',
                        },
                        qymc: {
                            value: '',
                            label: '企业名称',
                        },
                        tyxydm: {
                            value: '',
                            label: '统一社会信用代码',
                        },
                        name: {
                            value: '',
                            label: '法人名称',
                        },
                        productName: {
                            value: '',
                            label: '产品名称',
                        },
                        createTime: {
                            value: '',
                            label: '创建时间',
                        },

                    },
                    productInformation: {}
                },
                //添加 表单
                cardConfirmBox: {
                    show: false,
                    status: 0,
                    pzed: '',
                    pzlv: '',
                    pzqx: '',
                    pzqX_Unit: '年',
                    refuseReason: '',
                }
            }
        },
        methods: {
            //查询表格
            async loadDeptList() {
                await ZXWRZ_GetApplyQYList({
                    type: this.stores.query.status === -1 ? '' : this.stores.query.status,
                    pageIndex: this.stores.query.currentPage,
                    pageSize: this.stores.query.pageSize,
                }).then((res) => {
                    if (res.code === 200) {
                        this.stores.data = res.data.dt;
                        this.stores.query.totalCount = res.data.count;

                    }
                })
            },
            //表格 - 修改状态
            handleEdit() {
                this.$refs.formValidateConfirm.validate((valid) => {
                    if (valid) {
                        let data = {};
                        if (this.cardConfirmBox.status === 1) {
                            data = {
                                "applyID": this.cardConfirmBox.applyID,
                                "status": this.cardConfirmBox.status,
                                "pzed": this.cardConfirmBox.pzed,
                                "pzlv": this.cardConfirmBox.pzlv,
                                "pzqx": this.cardConfirmBox.pzqx,
                                "pzqX_Unit": this.cardConfirmBox.pzqX_Unit,
                                "refuseReason": this.cardConfirmBox.refuseReason,
                            }
                        } else if (this.cardConfirmBox.status === 2) {
                            data = {
                                "applyID": this.cardConfirmBox.applyID,
                                "status": this.cardConfirmBox.status,
                                "refuseReason": this.cardConfirmBox.refuseReason,
                            }
                        }
                        ZXWRZ_SetApprovalApplyType(data).then((res) => {
                            if (res.code === 200) {
                                this.$Message.success({
                                    content: res.message,
                                    duration: 2.5,
                                    closable: true
                                });
                                this.cardInformationBox.show = false;
                                this.clearCardPushBox();
                                this.loadDeptList();
                            } else {
                                this.$Message.warning({
                                    content: res.message,
                                    duration: 5,
                                    closable: true
                                });
                            }
                            this.selectedRowsId = [];
                        })
                    }
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
            // 获取选中的数据
            handleSelectUser(selection) {
                this.selectedRowsId = [];
                selection.map((val) => {
                    this.selectedRowsId.push(val.id);
                })
            },
            // 获取产品详情
            async getfinanProInfo(id) {
                await ZXWRZ_GetfinanProInfo({applyID: id}).then((res) => {
                    if (res.code === 200) {
                        this.cardInformationBox.productInformation = res.data[0];
                    }
                })
            },
            // 跳转企业信用报告
            pushEnterpriseCreditReport(tyxydm) {
                let routeData = this.$router.resolve({path: '/reportPages', query: {parameter: tyxydm}});
                window.open(routeData.href, '_blank');
            },
            // 清空列表
            clearCardPushBox() {
                this.cardConfirmBox = {
                    show: false,
                    status: 0,
                    pzed: '',
                    pzlv: '',
                    pzqx: '',
                    pzqX_Unit: '年',
                    refuseReason: '',
                }
            }
        },
        created() {
        },
        mounted() {
            this.loadDeptList();
            // if (this.$store.state.user.IdentityZn === '超级管理员') {
            //     // this.stores.columns = this.stores.columns.pop();
            // }


        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    .projectManagement {

    }

    .ivu-modal-content {
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

                        .report {
                            float: right;
                            cursor: pointer;
                        }

                        .report:hover {
                            color: #4f9bff;
                        }
                    }

                }

                .information_content_last {
                    border-bottom: #ddd 1px solid;
                }

                .information_header {
                    text-align: center;
                    border: #ddd 1px solid;
                    width: 100%;
                    font-size: 14px;
                    line-height: 40px;
                    color: #666;

                    div:first-child {
                        border-right: #ddd 1px solid;
                    }

                    div {
                        display: inline-block;
                        vertical-align: top;
                        width: 50%;
                    }
                }

                .information_border {
                    width: 100%;
                    border-bottom: #ddd 1px solid;
                    color: #222;
                    overflow: hidden;
                    font-size: 12px;
                    text-align: center;
                    line-height: 30px;

                    div:first-child {
                        border-left: #ddd 1px solid;
                    }

                    div {
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
</style>
