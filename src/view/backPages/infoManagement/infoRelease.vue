<template>
    <div class="infoRelease">
        <Card>
            <tables
                    ref="tables"
                    editable
                    searchable
                    :border="false"
                    size="small"
                    search-place="top"
                    :height="450"
                    v-model="stores.data"
                    :totalCount="stores.query.totalCount"
                    :columns="stores.columns"
                    @on-delete="handleDelete"
                    @on-edit="handleEdit"
                    @on-refresh="loadDeptList"
                    :row-class-name="rowClsRender"
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
                                                    v-model="stores.query.isInfo"
                                                    @on-change="loadDeptList"
                                                    placeholder="类型分类"
                                                    style="width:80px;"
                                            >
                                                <Option
                                                        v-for="item in stores.sources.isInfoSources"
                                                        :value="item.value"
                                                        :key="item.value"
                                                >{{item.text}}
                                                </Option>
                                            </Select>
                                            <Select
                                                    slot="prepend"
                                                    v-model="stores.query.status"
                                                    @on-change="loadDeptList"
                                                    placeholder="角色状态"
                                                    style="width:60px;margin-left: 10px"
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
                            <Col span="12" v-can="'btnOperation-superAdmin'" class="dnc-toolbar-btns">
                                <ButtonGroup class="mr3">
                                    <Tooltip content="删除" placement="bottom">
                                        <Button
                                                class="txt-danger"
                                                icon="md-trash"
                                                title="删除"
                                                @click="handleBatchCommand('delete')"
                                        ></Button>
                                    </Tooltip>
                                    <Tooltip content="禁用" placement="bottom">
                                        <Button
                                                class="txt-danger"
                                                icon="md-hand"
                                                title="禁用"
                                                @click="handleBatchCommand('forbidden')"
                                        ></Button>
                                    </Tooltip>
                                    <Tooltip content="启用" placement="bottom">
                                        <Button
                                                class="txt-success"
                                                icon="md-checkmark"
                                                title="启用"
                                                @click="handleBatchCommand('normal')"
                                        ></Button>
                                    </Tooltip>
                                    <Tooltip content="刷新" placement="bottom">
                                        <Button icon="md-refresh" title="刷新" @click="loadDeptList"></Button>
                                    </Tooltip>
                                    <Tooltip content="新增" placement="bottom">
                                        <Button icon="md-create" title="新增" @click="cardAddBox.show = true"></Button>
                                    </Tooltip>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </section>
                </div>
            </tables>
        </Card>
        <Modal
                v-model="cardAddBox.show"
                title="新建信息"
                id="modal_box"
                width="90%"
        >
            <Form :model="cardAddBox" :label-width="80" :rules="ruleValidate" ref="formValidate">
                <FormItem label="用户类型" prop="type" class="noSelect">
                    <RadioGroup v-model="cardAddBox.type" type="button">
                        <Radio label="0">政府政策</Radio>
                        <Radio label="1">新闻动态</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="标题" prop="name">
                    <Input class="inputItem" v-model="cardAddBox.name" size="large" clearable placeholder="标题"/>
                </FormItem>
                <FormItem label="内容" prop="content">
                    <editor-bar v-model="cardAddBox.content" :isClear="isClear" ></editor-bar>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cardAddBox.show = false">取消</Button>
                <Button type="primary" size="large" @click="handleAdd">确定</Button>
            </div>
        </Modal>
        <Modal
                v-model="detailsBox.show"
                title="信息详情"
                width="700"
                class-name="infoReleaseModal"
        >
            <h1>{{detailsBox.title}}</h1>
            <p v-html="detailsBox.context"></p>
            <div slot="footer">
                <Button type="primary" size="large" @click="detailsBox.show = false">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    /*
     @author xcf
     @date 2020/8/18 17:35 下午
     */
    import Tables from "_c/tables";
    import EditorBar from '_c/wangEnduit'
    import {
        ZXWRZ_GetInfoOrPolicyList,
        ZXWRZ_GetInfoOrPolicyDetails,
        ZXWRZ_SetInfoOrPolicyType,
        ZXWRZ_SaveInfoOrPolicy,
        ZXWRZ_RemoveInfoOrPolicy
    } from '@/api/back/infoRelease';
    export default {
        name: 'infoRelease',
        components: {
            Tables,
            EditorBar
        },
        props: {
            name: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                isClear: false,
                detail:"",
                //选择块
                commands: {
                    delete: {name: "delete", title: "删除"},
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
                        isInfo: -1,
                        status: -1,
                    },
                    //下拉框
                    sources: {
                        isInfoSources: [
                            {value: -1, text: "全部"},
                            {value: 0, text: "政府政策"},
                            {value: 1, text: "新闻动态"},
                        ],
                        statusSources: [
                            {value: -1, text: "全部"},
                            {value: 0, text: "禁用"},
                            {value: 1, text: "正常"}
                        ],
                    },
                    //字段数据
                    columns: [
                        {type: "selection", width: 50, key: "handle"},
                        {title: "信息类型", ellipsis: true, tooltip: true, key: "type"},
                        {title: "标题", ellipsis: true, tooltip: true, key: "name"},
                        {title: "创建时间", ellipsis: true, tooltip: true, key: "createTime"},
                        {
                            title: '操作',
                            key: "status",
                            align: 'center',
                            ellipsis: true,
                            tooltip: true,
                            render: (h, params) => {
                                if(this.$store.state.user.IdentityZn === '政府用户'){
                                    return h('div', [
                                        h('Icon', {
                                            props: {
                                                type: "ios-browsers",
                                                size: '20',
                                                color: '#4f9bff'
                                            },
                                            style: {
                                                cursor: 'pointer',
                                                marginLeft: '10px',
                                            },
                                            on: {
                                                click: e => {
                                                    this.detailsBox.show = true;
                                                    ZXWRZ_GetInfoOrPolicyDetails({id:params.row.id}).then(res=>{
                                                        if(res.code === 200){
                                                            this.detailsBox.title = res.data[0].name;
                                                            this.detailsBox.context = res.data[0].context;
                                                        }
                                                    })
                                                }
                                            }
                                        }),
                                    ])
                                }else if(this.$store.state.user.IdentityZn === '超级管理员'){
                                    return h('div', [
                                        h('i-switch', {
                                            props: {
                                                value: Boolean(params.row.status),
                                                trueColor: "#13ce66",
                                                falseColor: "#ff4949",
                                                size: "small",
                                            },
                                            on: {
                                                input: e => {
                                                    this.stores.data.map(value => {
                                                        if (value.id === params.row.id) {
                                                            this.selectedRowsId = [];
                                                            this.selectedRowsId.push(params.row.id);
                                                            if (value.status) {
                                                                this.handleEdit(0);
                                                            } else {
                                                                this.handleEdit(1);
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                        }),
                                        h('Icon', {
                                            props: {
                                                type: "md-close-circle",
                                                size: '20',
                                                color: '#ff4f46',
                                            },
                                            style: {
                                                cursor: 'pointer',
                                                marginLeft: '10px',
                                            },
                                            on: {
                                                click: e => {
                                                    this.selectedRowsId = [];
                                                    this.selectedRowsId.push(params.row.id);
                                                    this.handleDelete(params.row.id)
                                                }
                                            }
                                        }),
                                        h('Icon', {
                                            props: {
                                                type: "ios-browsers",
                                                size: '20',
                                                color: '#4f9bff'
                                            },
                                            style: {
                                                cursor: 'pointer',
                                                marginLeft: '10px',
                                            },
                                            on: {
                                                click: e => {
                                                    this.detailsBox.show = true;
                                                    ZXWRZ_GetInfoOrPolicyDetails({id:params.row.id}).then(res=>{
                                                        if(res.code === 200){
                                                            this.detailsBox.title = res.data[0].name;
                                                            this.detailsBox.context = res.data[0].context;
                                                        }
                                                    })
                                                }
                                            }
                                        }),
                                    ])
                                }
                            }
                        }
                    ],
                    //表格数据
                    data: [
                        {
                            type: '',
                            name: '',
                            createTime: '',
                            status: 1
                        }
                    ],

                    selections: [],
                },
                //弹框 添加 表单
                cardAddBox: {
                    show: false,
                    type: '',
                    name: '',
                    content: '',
                    status: 1
                },
                ruleValidate: {
                    type: [
                        {required: true, message: '必须选择一个信息类型', trigger: 'change'},
                    ],
                    name: [
                        {required: true, message: '标题不能为空', trigger: 'blur'},
                        {type: 'string', min: 5, max: 20, message: '用户名最少五个字符，最多三十个字符', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '内容不能为空', trigger: 'blur'},
                    ],
                },
                selectedRowsId: [],
                //文本框编辑配置
                editorOption: {
                    initialFrameHeight: 350,
                    initialFrameWidth: 1038
                },
                //详情弹框
                detailsBox:{
                    show:false,
                    title:'',
                    context:''
                },
                editorConfig: {
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 300,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 上传文件接口, 报错属于正常，若需要验证可使用(也是盗大神的)http://35.201.165.105:8000/controller.php
                    // 调试完毕打包上线则切换回/static/UEditor/php/controller.php即可，不用做其他处理
                    serverUrl: '/UEditor/',
                }
            }
        },
        methods: {
            //查询表格
            async loadDeptList() {
                await ZXWRZ_GetInfoOrPolicyList({
                    pageIndex: this.stores.query.currentPage,
                    pageSize: this.stores.query.pageSize,
                    key: this.stores.query.kw === -1 ? '' : this.stores.query.kw,
                    type: this.stores.query.isInfo === -1 ? '' : this.stores.query.isInfo,
                    status: this.stores.query.status === -1 ? '' : this.stores.query.status
                }).then((res) => {
                    if (res.code === 200) {
                        let oData = res.data.dt;
                        this.stores.query.totalCount = res.data.count;
                        oData.map((val) => {
                            switch (val.type) {
                                case 0:
                                    val.type = '政府政策';
                                    break;
                                case 1:
                                    val.type = '新闻动态';
                                    break;
                            }
                        });
                        this.stores.data = oData;
                    }
                })
            },
            //表格 - 修改
            async handleEdit(command) {
                await ZXWRZ_SetInfoOrPolicyType({
                    status: command,
                    ids: this.selectedRowsId.join(",")
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
                    this.selectedRowsId = [];
                })
            },
            //表格 - 删除
            handleDelete(ids) {
                ZXWRZ_RemoveInfoOrPolicy({ids: ids}).then((res) => {
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
                    this.selectedRowsId = [];
                })
            },
            //表格 - 添加
            handleAdd() {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        ZXWRZ_SaveInfoOrPolicy({
                            "name": this.cardAddBox.name,
                            "type": this.cardAddBox.type,
                            "context":this.cardAddBox.content,
                        }).then((res) => {
                            if (res.code === 200) {
                                this.$Message.success('添加成功！');
                                this.loadDeptList();
                                this.cardAddBox.show = false;
                                this.cardAddBox.name = '',
                                this.cardAddBox.type = '',
                                this.cardAddBox.content = ''
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
                    onOk: () => {
                        if (command === 'delete') {
                            this.handleDelete(this.selectedRowsId.join(","));
                        } else {
                            this.handleEdit(this.commands[command].type);
                        }
                    }
                });
            },
            //表格数据 - 删除隐藏不展示 - 根据数据中字段判断
            rowClsRender(row, index) {
                if (row.isInfo) {
                    return "table-row-disabled";
                }
                return "";
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
            ready(editorInstance) {
                // 这里可以拿到ueditor的实例，比如editorInstance.getContent()就可以拿到编辑器的html内容
                this.evtHub.$emit('editor.data', editorInstance);
            }
        },
        created() {
        },
        mounted() {
            this.loadDeptList();
        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    .infoReleaseModal{
        .ivu-modal-body {
            height: 450px;
            overflow: auto;
            .formItem {
                margin-bottom: 20px;
                .inputTitle {
                    display: inline-block;
                    vertical-align: center;
                    width: 16.5%;
                    text-align: right;
                }

                .inputItem {
                    display: inline-block;
                    vertical-align: center;
                    width: 83.5%;
                }
            }
        }
    }
    #modal_box{
        .ivu-modal-body{
            .ivu-form-item-required{
                .ivu-form-item-content{
                    .ql-container{
                        height: 200px;
                        .ql-editor{

                        }
                    }
                }
            }
        }
    }
</style>
