<template>
    <div class="productManagement">
        <Card>
            <tables
                    ref="tables"
                    editable
                    searchable
                    :border="false"
                    size="small"
                    :height="450"
                    search-place="top"
                    v-model="stores.data"
                    :totalCount="stores.query.totalCount"
                    :columns="stores.columns"
                    @on-refresh="getFinanProductsList"
                    :row-class-name="rowClsRender"
                    @on-page-change="handlePageChanged"
                    @on-page-size-change="handlePageSizeChanged"
                    @on-selection-change="handleSelectProject"
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
                                                @on-search="getFinanProductsList"
                                        >
                                            <Select
                                                    slot="prepend"
                                                    v-model="stores.query.status"
                                                    @on-change="getFinanProductsList"
                                                    placeholder="角色状态"
                                                    style="width:60px;"
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
                                    <Tooltip content="删除" placement="bottom" v-can="'deleteproduct'">
                                        <Button
                                                class="txt-danger"
                                                icon="md-trash"
                                                title="删除"
                                                @click="handleBatchCommand('delete')"
                                        ></Button>
                                    </Tooltip>
                                    <Tooltip content="禁用" placement="bottom" v-can="'limitproduct'">
                                        <Button
                                                class="txt-danger"
                                                icon="md-hand"
                                                title="禁用"
                                                @click="handleBatchCommand('forbidden')"
                                        ></Button>
                                    </Tooltip>
                                    <Tooltip content="启用" placement="bottom" v-can="'getproduct'">
                                        <Button
                                                class="txt-success"
                                                icon="md-checkmark"
                                                title="启用"
                                                @click="handleBatchCommand('normal')"
                                        ></Button>
                                    </Tooltip>
                                    <Tooltip content="刷新" placement="bottom">
                                        <Button icon="md-refresh" title="刷新" @click="getFinanProductsList"></Button>
                                    </Tooltip>
                                    <Tooltip content="新增" placement="bottom" v-can="'newproduct'">
                                        <Button icon="md-create" title="新增" @click="createdProject(0,'')"></Button>
                                    </Tooltip>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </section>
                </div>
            </tables>
        </Card>
        <Modal
               v-model="modal1"
               :title="productTitle"
               class-name="newProductitem"
        >
            <Form :model="formItemValue" :label-width="80" :rules="ruleValidate" ref="formValidate" :disabled="formItemBool">
                <FormItem label="产品名称" prop="productName">
                    <Input v-model="formItemValue.productName" placeholder="请输入产品名称" ></Input>
                </FormItem>
                <!--  带过来的数据-->
                <FormItem label="银行机构" prop="bank">
                    <Input v-model="formItemValue.bank" disabled></Input>
                </FormItem>
                <FormItem label="贷款额度" prop="quota">
                    <Row>
                        <Col span="22">
                            <InputNumber  :min="0" v-model="formItemValue.quota" placeholder="请输入贷款额度" style="width: 100%;">
                            </InputNumber>
                        </Col>
                        <Col span="2" style="text-align: center;"><span >万元</span></Col>
                    </Row>
                </FormItem>
                <FormItem label="贷款利率">
                    <Row>
                        <Col span="11">
                            <Row>
                                <Col span="22">
                                    <FormItem prop="interestRate_min">
                                        <InputNumber :min="0" v-model="formItemValue.interestRate_min" placeholder="最小利率" style="width: 100%;" >
                                        </InputNumber>
                                    </FormItem>
                                </Col>
                                <Col span="2" style="text-align: center;"><span >%</span></Col>
                            </Row>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <Row>
                                <Col span="22">
                                    <FormItem prop="interestRate_max">
                                        <InputNumber :min="0" v-model="formItemValue.interestRate_max" placeholder="最大利率" style="width: 100%;">
                                        </InputNumber>
                                    </FormItem>
                                </Col>
                                <Col span="2" style="text-align: center;"><span >%</span></Col>
                            </Row>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="担保方式" prop="dbfs" >
                    <CheckboxGroup v-model="formItemValue.dbfs">
                        <Checkbox label="信用" ></Checkbox>
                        <Checkbox label="抵押" ></Checkbox>
                        <Checkbox label="保证" ></Checkbox>
                        <Checkbox label="贴现" ></Checkbox>
                        <Checkbox label="质押" ></Checkbox>
                        <Checkbox label="综合" ></Checkbox>
                        <Checkbox label="担保" ></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="贷款期限">
                    <Row>
                        <Col span="11">
                            <Row>
                                <FormItem prop="dkqx">
                                    <InputNumber :min="0" v-model="formItemValue.dkqx"  style="width: 100%;" >
                                    </InputNumber>
                                </FormItem>
                            </Row>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <FormItem prop="dkqX_Unit">
                                <Select v-model="formItemValue.dkqX_Unit" placeholder="请选择贷款期限单位">
                                    <Option value="年">
                                        年
                                    </Option>
                                    <Option value="月">
                                        月
                                    </Option>
                                    <Option value="日">
                                        日
                                    </Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="产品介绍" prop="introduce">
                    <Input v-model="formItemValue.introduce" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请描述产品介绍..."></Input>
                </FormItem>
                <FormItem label="产品特点" prop="characteristic">
                    <Input v-model="formItemValue.characteristic" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请描述产品特点..."></Input>
                </FormItem>
                <FormItem label="适用客户" prop="sykh">
                    <Input v-model="formItemValue.sykh" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请描述适用客户范围..."></Input>
                </FormItem>
                <FormItem label="申请条件" prop="sqtj">
                    <Input v-model="formItemValue.sqtj" type="textarea" :autosize="{minRows: 1,maxRows: 8}"
                           placeholder="请描述申请需要的条件..."></Input>
                </FormItem>
                <FormItem label="申请材料" prop="sqcl">
                    <Input v-model="formItemValue.sqcl" type="textarea" :autosize="{minRows: 1,maxRows: 8}"
                           placeholder="请描述申请需要的材料..."></Input>
                </FormItem>
            </Form>
            <div slot="footer" v-show="$store.state.user.Identity!==0 && $store.state.user.Identity!==4">
                <Button type="text" size="large" @click="modal1 = false">取消</Button>
                <Button type="primary" size="large" @click="sureNewProject">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    /**
     @author xiaoye
     @date 2020/8/18 9:35 上午
     */
    import Tables from "_c/tables";
    import {
        ZXWRZ_GetFinanProductsList,
        ZXWRZ_RemoveFinanProByIDs,
        ZXWRZ_SaveFinanProduct,
        ZXWRZ_GetfinanProInfo,
        ZXWRZ_ChangeStatus,
    } from '@/api/back/productList';

    export default {
        name: 'productManagement',
        components: {
            Tables,
        },
        props: {
            name: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                //选择块
                commands: {
                    delete: {name: "delete", title: "删除", type: 2},
                    forbidden: {name: "forbidden", title: "禁用", type: 0},
                    normal: {name: "normal", title: "启用", type: 1}
                },
                //表格默认值
                stores: {
                    //基本数据
                    query: {
                        totalCount: 0,
                        pageSize: 15,
                        currentPage: 1,
                        kw: "",
                        isDeleted: 0,
                        status: -1,
                        sort: [
                            {
                                direct: "DESC",
                                field: "createdOn"
                            }
                        ]
                    },
                    //下拉框
                    sources: {
                        isDeletedSources: [
                            {value: -1, text: "全部"},
                            {value: 0, text: "正常"},
                            {value: 1, text: "已删"}
                        ],
                        bankSources: [
                            {value: -1, text: "全部"},
                            {value: 0, text: "总行"}
                        ],
                        statusSources: [
                            {value: -1, text: "全部"},
                            {value: 0, text: "禁用"},
                            {value: 1, text: "正常"}
                        ],
                        //终申用户列表
                        createdByUserList: [],
                        provinceList: [],
                        mayorList: [],
                        districtList: [],
                    },
                    //列表字段数据
                    columns: [
                        {type: "selection", width: 50, key: "handle"},
                        {title: "产品名称", ellipsis: true, tooltip: true, key: "productName"},
                        {title: "银行机构", ellipsis: true, tooltip: true, key: "bank"},
                        {title: "贷款额度", ellipsis: true, tooltip: true, key: "amount"},
                        {title: "贷款利率", ellipsis: true, tooltip: true, key: "interestRate"},
                        {title: "担保方式", ellipsis: true, tooltip: true, key: "dbfstring"},
                        {title: "贷款期限", ellipsis: true, tooltip: true, key: "Timelimit"},
                        {title: "添加人", ellipsis: true, tooltip: true, key: "name"},
                        {
                            title: "操作",
                            ellipsis: true,
                            tooltip: true,
                            key: "id",
                            align: 'center',
                            render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.createdProject(1, params.row.id);
                                            }
                                        }
                                    }, '获取详情'),
                                ]);
                            }
                        }
                    ],
                    //表格数据
                    data: [],
                },
                // 表格选中数据
                selectedRowsId: [],
                //控制表单是否显示
                modal1: false,

                productTitle: '新增金融产品',
                //权限控制
                formItemBool:true,
                //表单默认值
                formItemValue: {
                    id: '',
                    productName: '',
                    bank: '',
                    bank_ZH: '',
                    interestRate_min: 0,
                    interestRate_max: 0,
                    quota: 0,
                    dkqX_Unit: '',
                    dkqx: 0,
                    introduce: '',
                    characteristic: '',
                    sykh: '',
                    sqtj: '',
                    sqcl: '',
                    status: 1,
                    dbfs:[],

                },
                //表单验证
                ruleValidate: {
                    productName: [
                        {required: true, message: '产品名称不能为空', trigger: 'blur'}
                    ],
                    bank: [
                        {required: true, message: '银行机构不能为空', trigger: 'change'}
                    ],
                    bank_ZH: [
                        {required: true, message: '银行机构主行不能为空', trigger: 'blur'}
                    ],
                    quota: [
                        {required: true, message: '贷款额度不能为空', type: 'number', trigger: 'blur'},
                    ],
                    interestRate_min: [
                        {required: true, message: '贷款利率最小值不能为空', type: 'number', min: 0, trigger: 'blur'}
                    ],
                    interestRate_max: [
                        {
                            required: true,
                            min: 0,
                            type: 'number',
                            message: '贷款利率最大值不能为空',
                            trigger: 'blur'
                        },
                    ],
                    dbfs: [
                        { required: true, type: 'array', min: 1, message: '担保方式不能为空', trigger: 'change' },
                    ],
                    dkqX_Unit: [{
                        required: true,
                        type: 'string',
                        message: '贷款期限单位不能为空',
                        trigger: 'blur'
                    }],
                    introduce: [
                        {required: true, type: 'string', message: '产品介绍不能为空', trigger: 'blur'}
                    ],
                    characteristic: [
                        {required: true, type: 'string', message: '产品特点不能为空', trigger: 'blur'}
                    ],
                    sykh: [
                        {
                            required: true,
                            type: 'string',
                            message: '适用客户不能为空',
                            trigger: 'blur'
                        },
                    ],
                    sqtj: [
                        {
                            required: true,
                            type: 'string',
                            message: '申请条件不能为空',
                            trigger: 'blur'
                        },
                    ],
                    sqcl: [
                        {
                            required: true,
                            type: 'string',
                            message: '申请材料不能为空',
                            trigger: 'blur'
                        },
                    ],

                }
            }
        },
        methods: {
            //获取金融产品列表
            async getFinanProductsList() {
                await ZXWRZ_GetFinanProductsList({
                    key: this.stores.query.kw === -1 ? '' : this.stores.query.kw,
                    status: this.stores.query.status === -1 ? '' : this.stores.query.status,
                    pageIndex: this.stores.query.currentPage,
                    pageSize: this.stores.query.pageSize,
                }).then(res => {
                    if (res.code === 200) {
                        this.stores.data = res.data.dt;
                        this.stores.query.totalCount = res.data.count;
                        this.formItemValue.bank =this.$store.state.user.bank;
                        res.data.dt.map((item, index) => {
                            this.stores.data[index].amount = item.quota  + '万元' ;
                            this.stores.data[index].Timelimit = item.dkqx  + item.dkqX_Unit;
                            this.stores.data[index].interestRate = item.interestRate_min + '%~' + item.interestRate_max + '%';
                            this.stores.data[index].dbfstring = item.dbfs.join("/");
                        })
                    }
                })
            },
            //获取详情 0新增1详情
            createdProject(type, id) {
                if (type === 1) {
                    this.getFinanDtail(id);
                }else{
                    this.productTitle = '新增金融产品';
                    this.formItemValue = {
                        id: '',
                        productName: '',
                        bank: '',
                        interestRate_min: 0,
                        interestRate_max: 0,
                        quota: 0,
                        dkqX_Unit: '',
                        dkqx: 0,
                        introduce: '',
                        characteristic: '',
                        sykh: '',
                        sqtj: '',
                        sqcl: '',
                        status: 1,
                        dbfs:[],
                    };
                    this.formItemValue.bank =this.$store.state.user.bank;
                }
                this.modal1 = true;
            },
            getFinanDtail(id) {
                ZXWRZ_GetfinanProInfo({
                    id: id
                }).then(res => {
                    if (res.code === 200) {
                        this.formItemValue = res.data[0];
                        this.productTitle = res.data[0].productName;
                    }
                })
            },
            // 获取多选选中的数据
            handleSelectProject(selection) {
                this.selectedRowsId = [];
                selection.map((val) => {
                    this.selectedRowsId.push(val.id);
                })
            },
            //点击弹框确定
            sureNewProject() {
                if(this.productTitle==='新增金融产品'){
                    this.formItemValue.id='';
                }
                let dbfstr='';
                dbfstr = this.formItemValue.dbfs.join("/");
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        ZXWRZ_SaveFinanProduct({
                            id: this.formItemValue.id,
                            productName: this.formItemValue.productName,
                            bankEnumID:  this.formItemValue.bankEnumID,
                            bank:this.formItemValue.bank,
                            bank_ZH: this.formItemValue.bank_ZH,
                            interestRate_min:this.formItemValue.interestRate_min,
                            interestRate_max: this.formItemValue.interestRate_max,
                            quota: this.formItemValue.quota,
                            dbfs: dbfstr,
                            dkqX_Unit: this.formItemValue.dkqX_Unit,
                            dkqx: this.formItemValue.dkqx,
                            introduce: this.formItemValue.introduce,
                            characteristic: this.formItemValue.characteristic,
                            sykh: this.formItemValue.sykh,
                            sqtj: this.formItemValue.sqtj,
                            sqcl: this.formItemValue.sqcl,
                            status: this.formItemValue.status,
                        }).then(res => {
                            if (res.code === 200) {
                                this.$Message.success({
                                    content: res.message,
                                    duration: 2.5,
                                    closable: true
                                });
                                this.getFinanProductsList();
                                this.$nextTick();
                                this.modal1 = false;
                            } else {
                                this.$Message.warning({
                                    content: res.message,
                                    duration: 5,
                                    closable: true
                                });
                            }
                        })
                    } else {
                        this.$Message.error('请按规则填入信息!');
                    }
                })
            },
            //点击四个操作块
            handleBatchCommand(command) {
                if (!this.selectedRowsId || this.selectedRowsId.length <= 0) {
                    this.$Message.warning({
                        content: "请选择至少一条数据",
                        duration: 2,
                        closable: true
                    });
                    return;
                }
                this.$Modal.confirm({
                    title: "操作提示",
                    content:
                        "<p>确定要执行当前 [" +
                        this.commands[command].title +
                        "] 操作吗?</p>",
                    // loading: true,
                    onOk: () => {
                        if (command === 'delete') {
                            this.doBatchCommand();
                        } else {
                            let status = 0;
                            if (command === 'forbidden') {
                                status = 0;
                            } else {
                                status = 1;
                            }
                            this.ChangeStatus(status);
                        }
                    },

                });
            },
            //批量删除金融产品
            doBatchCommand() {
                ZXWRZ_RemoveFinanProByIDs({
                    ids: this.selectedRowsId.join(",")
                }).then(res => {
                    if (res.code === 200) {
                        this.$Message.success({
                            content: res.message,
                            duration: 2.5,
                            closable: true
                        });
                        this.getFinanProductsList();
                    } else {
                        this.$Message.warning({
                            content: res.message,
                            duration: 5,
                            closable: true
                        });
                    }
                    this.selectedRowsId = [];
                    // this.$Modal.remove();
                });
            },
            //修改金融产品状态 1启用 0禁用
            ChangeStatus(status) {
                ZXWRZ_ChangeStatus({
                    ids: this.selectedRowsId.join(","),
                    status: status
                }).then(res => {
                    if (res.code === 200) {
                        this.$Message.success({
                            content: res.message,
                            duration: 2.5,
                            closable: true
                        });
                        this.getFinanProductsList();
                    } else {
                        this.$Message.warning({
                            content: res.message,
                            duration: 5,
                            closable: true
                        });
                    }
                    this.selectedRowsId = [];
                    // this.$Modal.remove();
                });
            },
            //表格数据 - 删除隐藏不展示 - 根据数据中字段判断
            rowClsRender(row, index) {
                if (row.isDeleted) {
                    return "table-row-disabled";
                }
                return "";
            },
            //切换页
            handlePageChanged(page) {
                this.stores.query.currentPage = page;
                this.getFinanProductsList();
            },
            //切换一页展示多少数据
            handlePageSizeChanged(pageSize) {
                this.stores.query.pageSize = pageSize;
                this.getFinanProductsList();
            },
        },
        mounted() {
            this.getFinanProductsList();
            if(this.$store.state.user.Identity===0 || this.$store.state.user.Identity===4){
                this.formItemBool = true;
            }else{
                this.formItemBool = false;
            }
            if( this.$store.state.user.Identity===1 || this.$store.state.user.Identity===2){
                this.stores.columns.splice(this.stores.columns.length-1,0,{
                        title: '状态',
                        key: "status",
                        align: 'center',
                        ellipsis: true,
                        tooltip: true,
                        render: (h, params) => {
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        value: params.row.status==='1',
                                        trueColor: "#13ce66",
                                        falseColor: "#ff4949",
                                        size: "small"
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            this.selectedRowsId = [];
                                            this.selectedRowsId.push(params.row.id);
                                            let statustr = 0;
                                            if (value) {
                                                statustr = 1;
                                            } else {
                                                statustr = 0;
                                            }
                                            this.ChangeStatus(statustr);
                                        }
                                    }
                                }),

                            ])
                        }
                    },
                    )
            }
        },
    }
</script>

<style lang="less">
    .newProductitem {
        .ivu-modal{
            width: 700px!important;
            .ivu-modal-body{
                height: 420px;
                overflow-y: scroll!important;
            }
        }
        .ivu-input[disabled], fieldset[disabled] .ivu-input{
            color:#515a6e ;
             background-color: #fff;
        }
        .ivu-input-number-disabled .ivu-input-number-input{
            background-color: #fff;
            opacity: 1;
        }
        .ivu-input-number-input[disabled]{
            color:#515a6e ;
        }
        .ivu-select-disabled .ivu-select-selection{
            color:#515a6e ;
            background-color: #fff;
        }
        .ivu-checkbox-disabled.ivu-checkbox-checked .ivu-checkbox-inner{
            border-color: #2d8cf0;
            background-color: #2d8cf0;
        }
        .ivu-checkbox-disabled .ivu-checkbox-inner{
            border-color: rgb(220, 222, 226);
            background-color: #fff;
        }
        .ivu-checkbox-disabled + span{
            color:#515a6e ;
        }
        .ivu-checkbox-disabled.ivu-checkbox-checked .ivu-checkbox-inner:after{
            border-color: #fff;
        }

        .icon_bank {
            width: 16px !important;
            height: 16px !important;
            display: inline-block;
            vertical-align: middle;
            > svg {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
