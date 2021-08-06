<template>
    <div class="userManagement">
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
                                                v-can="'userTypeFiltering-superAdmin'"
                                        >
                                            <Select
                                                    slot="prepend"
                                                    v-model="stores.query.isUser"
                                                    @on-change="loadDeptList"
                                                    placeholder="用户分类"
                                                    style="width:120px;"
                                            >
                                                <Option
                                                        v-for="item in stores.sources.isUserSources"
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
                                        <Input
                                                type="text"
                                                search
                                                :clearable="true"
                                                v-model="stores.query.kw"
                                                placeholder="输入关键字搜索..."
                                                @on-search="loadDeptList()"
                                                v-can="'userTypeFiltering-agencyAll'"
                                        >
                                            <Select
                                                    slot="prepend"
                                                    v-model="stores.query.status"
                                                    @on-change="loadDeptList"
                                                    placeholder="角色状态"
                                                    style="width:60px"
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
                                        <Button icon="md-create" title="新增"
                                                @click="cardAddBox.show = true,gerBankRegionList()"></Button>
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
                v-model="cardAddBox.show"
                title="新建用户"
                :mask-closable="false"

        >
            <Form :model="cardAddBox" :label-width="80" :rules="ruleValidate" ref="formValidate">
                <FormItem v-can="'cardAddBoxType-superAdmin'" label="用户类型" prop="type" class="noSelect">
                    <RadioGroup v-model="cardAddBox.type" type="button" @on-change="clearCardPushBox()">
                        <Radio label="1">金融机构</Radio>
                        <Radio label="4">政府部门</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem v-can="'cardAddBoxType-agencyAll'" label="用户类型" prop="type" class="noSelect">
                    <RadioGroup v-model="cardAddBox.type" type="button">
                        <Radio label="2">金融机构(分支)</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="金融机构" class="noSelect" v-show="cardAddBox.type == 1 || cardAddBox.type == 2">
                    <Select v-model="cardAddBox.banListSelect.bankName" size="large" @on-change="setBankSelectChange()">
                        <Option v-for="item in cardAddBox.BankList" :value="item.bankName" :key="item.bankEnumID">
                            {{item.bankName}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="行政区划" v-if="this.$store.state.user.IdentityZn === '金融管理员'" class="noSelect"
                          v-show="cardAddBox.type == 1 || cardAddBox.type == 2">
                    <Select v-model="cardAddBox.regionSelect.name" size="large" @on-change="setRegionSelectChange()">
                        <Option v-for="item in cardAddBox.regionList" :value="item.name" :key="item.id">
                            {{item.name}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="联系方式" prop="tel" v-if="this.$store.state.user.IdentityZn === '金融管理员'">
                    <Row>
                        <Col span="17">
                            <Input class="inputItem" v-model="cardAddBox.tel" size="large" clearable
                                   placeholder="联系方式"/>
                        </Col>
                        <Col span="4" offset="1">
                            <Button @click="vCodeByTelClick()" ref="timerBtn" :disabled="cardAddBox.disabled">{{cardAddBox.timer}}</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="验证码" v-if="this.$store.state.user.IdentityZn === '金融管理员'">
                    <Input class="inputItem" v-model="cardAddBox.vCode" size="large" clearable placeholder="验证码"/>
                </FormItem>
                <FormItem label="账号" prop="userName">
                    <Input class="inputItem" v-model="cardAddBox.userName" size="large" clearable placeholder="账号"/>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input class="inputItem" v-model="cardAddBox.password" @on-blur="blurPassWordToo" size="large"
                           type="password" password placeholder="密码"/>
                </FormItem>
                <FormItem label="再次密码" prop="passwordToo">
                    <Input class="inputItem" v-model="cardAddBox.passwordToo" size="large" @on-blur="blurPassWordToo"
                           type="password" password placeholder="密码"/>
                </FormItem>
                <FormItem label="名称" prop="name">
                    <Input class="inputItem" v-model="cardAddBox.name" size="large" clearable placeholder="名称"/>
                </FormItem>
                <FormItem label="联系方式" prop="tel"
                          v-if="this.$store.state.user.IdentityZn === '超级管理员' || this.$store.state.user.IdentityZn === '政府用户'">
                    <Input class="inputItem" v-model="cardAddBox.tel" size="large" clearable placeholder="联系方式"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="clearCardPushBox(),cardAddBox.show = false">取消</Button>
                <Button type="primary" size="large" @click="handleAdd('add')">确定</Button>
            </div>
        </Modal>
        <Modal
                :closable="false"
                v-model="cardReviseBox.show"
                title="修改用户"
                :className="'modalDrage_cf'"
        >
            <Form :model="cardReviseBox" :label-width="80" :rules="ruleValidateRevise" ref="formValidateRevise">
                <FormItem label="金融机构">
                    <Input class="inputItem" size="large" :value="cardReviseBox.banListSelect.bankName" disabled
                           clearable/>
                </FormItem>
                <FormItem label="账号" prop="userName">
                    <Input class="inputItem" v-model="cardReviseBox.userName" size="large" clearable placeholder="账号"/>
                </FormItem>
                <FormItem label="名称" prop="name">
                    <Input class="inputItem" v-model="cardReviseBox.name" size="large" clearable placeholder="名称"/>
                </FormItem>
                <FormItem label="联系方式" prop="tel">
                    <Input class="inputItem" v-model="cardReviseBox.tel" size="large" clearable placeholder="联系方式"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="clearCardSelectBox()">取消</Button>
                <Button type="primary" size="large" @click="handleAdd('revise')">确定</Button>
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
        ZXWRZ_GetUserManager,
        ZXWRZ_SetUserStatus,
        ZXWRZ_SaveCreateUser,
        ZXWRZ_SetDeleteUser,
        ZXWRZ_GetBankList,
        ZXWRZ_GetRegionList
    } from '@/api/back/userManagement';

    import {
        ZXWRZ_SendVCodeByTel
    } from '@/api/login/login'

    export default {
        name: 'userManagement',
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
                        isUser: -1,
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
                        isUserSources: [
                            {value: -1, text: "全部用户"},
                            {value: 1, text: "金融机构"},
                            {value: 2, text: "金融机构(分支)"},
                            {value: 3, text: "企业用户"},
                            {value: 4, text: "政府用户"},
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
                        {title: "用户类型", ellipsis: true, tooltip: true, key: "type"},
                        {title: "用户名", ellipsis: true, tooltip: true, key: "userName"},
                        {title: "金融机构", ellipsis: true, tooltip: true, key: "bankName"},
                        {title: "账号名称", ellipsis: true, tooltip: true, key: "name"},
                        {title: "联系方式", ellipsis: true, tooltip: true, key: "tel"},
                        {title: "创建时间", ellipsis: true, tooltip: true, key: "createTime"},
                        {
                            title: '操作',
                            key: "status",
                            align: 'center',
                            ellipsis: true,
                            tooltip: true,
                            render: (h, params) => {
                                let eleList = [h('i-switch', {
                                    props: {
                                        value: Boolean(params.row.status),
                                        trueColor: "#13ce66",
                                        falseColor: "#ff4949",
                                        size: "small"
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
                                })];
                                let btnIconDelete = h('Icon', {
                                    props: {
                                        type: "md-close-circle",
                                        size: '20',
                                        color: '#ff4f46'
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
                                });
                                let btnIconSelect = h('Icon', {
                                    props: {
                                        type: "ios-keypad",
                                        size: '20',
                                        color: '#1498ff'
                                    },
                                    style: {
                                        cursor: 'pointer',
                                        marginLeft: '10px',
                                    },
                                    on: {
                                        click: e => {
                                            this.cardReviseBox.show = true;
                                            this.stores.data.map(val => {
                                                if (val.id === params.row.id) {
                                                    this.cardReviseBox.id = val.id;
                                                    this.cardReviseBox.userName = val.userName;
                                                    this.cardReviseBox.name = val.name;
                                                    this.cardReviseBox.tel = val.tel;
                                                    this.cardReviseBox.type = val.type;
                                                    this.cardReviseBox.status = val.status;
                                                    this.cardReviseBox.banListSelect.bankEnumID = val.bankEnumID;
                                                    this.cardReviseBox.banListSelect.bankName = val.bankName;
                                                    this.cardReviseBox.banListSelect.bankName_ZH = val.bankName_ZH;
                                                }
                                            })
                                        }
                                    }
                                });
                                if (this.$store.state.user.IdentityZn === '超级管理员' || this.$store.state.user.IdentityZn === '政府用户') {
                                    eleList.push(btnIconDelete);
                                } else {
                                    eleList.push(btnIconDelete);
                                    eleList.push(btnIconSelect);
                                }
                                return h('div', eleList)
                            }
                        }
                    ],
                    //表格数据
                    data: [
                        {
                            type: '',
                            userName: '',
                            name: '',
                            tel: '',
                            createTime: '',
                            status: 1,
                            bankName_ZH: '',
                            bankEnumID: '',
                            bankName: ''
                        }
                    ],
                },
                //新添加弹框 添加 表单
                cardAddBox: {
                    show: false,
                    type: '',
                    userName: '',
                    password: '',
                    passwordToo: '',
                    name: '',
                    tel: '',
                    status: 1,
                    banListSelect: {},
                    timer:'发送验证码',
                    disabled:false,
                    vCode: "",
                    BankList: [{
                        'bankName_ZH': '',
                        'bankEnumID': '',
                        'bankName': ''
                    }],
                    regionSelect: {},
                    regionList: [],
                    cityData: {}
                },
                //添加的验证
                ruleValidate: {
                    type: [
                        {required: true, message: '必须选择一个创建账号类型', trigger: 'change'},
                    ],
                    userName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                        {type: 'string', min: 5, max: 20, message: '用户名最少五个字符，最多二十个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {type: 'string', min: 5, max: 20, message: '密码最少五个字符，最多二十个字符', trigger: 'blur'}
                    ],
                    passwordToo: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {type: 'string', min: 5, max: 20, message: '密码最少五个字符，最多二十个字符', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '账号昵称不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, max: 10, message: '账号昵称最少两个字符，最多十个字符', trigger: 'blur'}
                    ],
                    tel: [
                        {required: true, message: '联系方式不能为空', trigger: 'blur'},
                    ],
                },
                //修改的验证
                ruleValidateRevise: {
                    type: [
                        {required: true, message: '必须选择一个创建账号类型', trigger: 'change'},
                    ],
                    userName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                        {type: 'string', min: 5, max: 20, message: '用户名最少五个字符，最多二十个字符', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '账号昵称不能为空', trigger: 'blur'},
                    ],
                    tel: [
                        {required: true, message: '联系方式不能为空', trigger: 'blur'},
                    ],
                },
                selectedRowsId: [],
                //修改添加弹框 添加 表单
                cardReviseBox: {
                    show: false,
                    id: '',
                    userName: '',
                    name: '',
                    tel: '',
                    type: '',
                    status: '',
                    banListSelect: {
                        'bankName_ZH': '',
                        'bankEnumID': '',
                        'bankName': '',
                        'region': '',
                    }
                }
            }
        },
        methods: {
            //查询表格
            async loadDeptList() {
                await ZXWRZ_GetUserManager({
                    pageIndex: this.stores.query.currentPage,
                    pageSize: this.stores.query.pageSize,
                    key: this.stores.query.kw === -1 ? '' : this.stores.query.kw,
                    type: this.stores.query.isUser === -1 ? '' : this.stores.query.isUser,
                    status: this.stores.query.status === -1 ? '' : this.stores.query.status
                }).then((res) => {
                    if (res.code === 200) {
                        let oData = res.data.dt;
                        this.stores.query.totalCount = res.data.count;
                        oData.map((val) => {
                            switch (val.type) {
                                case 1:
                                    val.type = '金融机构';
                                    break;
                                case 2:
                                    val.type = '金融机构(分支)';
                                    break;
                                case 3:
                                    val.type = '企业用户';
                                    break;
                                case 4:
                                    val.type = '政府用户';
                                    break;
                            }
                        });
                        this.stores.data = oData;
                    } else {
                    }
                })
            },
            //表格 - 修改状态
            async handleEdit(command) {
                await ZXWRZ_SetUserStatus({
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
                ZXWRZ_SetDeleteUser({ids: ids}).then((res) => {
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
            //表格 - 添加或修改内容
            handleAdd(type) {
                this.$refs[type === 'add' ? 'formValidate' : 'formValidateRevise'].validate((valid) => {
                    let data = {};
                    if (type === 'add') {
                        if (this.cardAddBox.banListSelect.bankName === undefined) {
                            if (this.cardAddBox.type == 1 || this.cardAddBox.type == 2) {
                                this.$Message.error('必须选择一个金融机构');
                                return
                            }
                        }
                        if (this.$store.state.user.IdentityZn === '金融管理员') {
                            if (this.cardAddBox.regionSelect.name === undefined) {
                                if (this.cardAddBox.type == 1 || this.cardAddBox.type == 2) {
                                    this.$Message.error('必须选择一个行政区划');
                                    return
                                }
                            }
                            if (this.cardAddBox.vCode === "") {
                                if (this.cardAddBox.type == 1 || this.cardAddBox.type == 2) {
                                    this.$Message.error('请输入验证码');
                                    return
                                }
                            }
                        }
                        data = {
                            "userName": this.cardAddBox.userName,
                            "password": this.cardAddBox.password,
                            "name": this.cardAddBox.name,
                            "tel": this.cardAddBox.tel,
                            "type": this.cardAddBox.type,
                            "status": 1,
                            "bankName": this.cardAddBox.banListSelect.bankName,
                            "bankEnumID": this.cardAddBox.banListSelect.bankEnumID,
                            "bankName_ZH": this.cardAddBox.banListSelect.bankName_ZH,
                            "cityCode": this.cardAddBox.cityData.code,
                            "cityName": this.cardAddBox.cityData.name,
                            "areaCode": this.cardAddBox.regionSelect.code,
                            "areaName": this.cardAddBox.regionSelect.name,
                            "vCode": this.cardAddBox.vCode
                        }
                    } else if (type === 'revise') {
                        data = {
                            "id": this.cardReviseBox.id,
                            "userName": this.cardReviseBox.userName,
                            "bankName": this.cardReviseBox.banListSelect.bankName,
                            "bankEnumID": this.cardReviseBox.banListSelect.bankEnumID,
                            "bankName_ZH": this.cardReviseBox.banListSelect.bankName_ZH,
                            "name": this.cardReviseBox.name,
                            "tel": this.cardReviseBox.tel,
                            "type": (() => {
                                switch (this.cardReviseBox.type) {
                                    case '金融机构':
                                        return 1;
                                    case '金融机构(分支)':
                                        return 2;
                                    case '企业用户':
                                        return 3;
                                    case '政府用户':
                                        return 4;
                                }
                            })(),
                            "status": this.cardReviseBox.status,
                        }
                    }
                    if (valid) {
                        ZXWRZ_SaveCreateUser(data).then((res) => {
                            if (res.code === 200) {
                                this.$Message.success('添加成功！');
                                this.loadDeptList();
                                this.cardAddBox.show = false;
                                this.cardAddBox.type = '',
                                    this.cardAddBox.userName = '',
                                    this.cardAddBox.password = '',
                                    this.cardAddBox.passwordToo = '',
                                    this.cardAddBox.name = '',
                                    this.cardAddBox.tel = '',
                                    this.cardAddBox.banListSelect = {},
                                    this.cardReviseBox.show = false;
                            }
                        })
                    } else {
                        this.$Message.error('请按规则填入信息!');
                    }
                })
            },
            //获取银行列表 及区域列表
            gerBankRegionList() {
                ZXWRZ_GetBankList().then((res) => {
                    if (res.code === 200) {
                        this.cardAddBox.BankList = res.data;
                    }
                })
                if (this.$store.state.user.IdentityZn === '金融管理员') {
                    ZXWRZ_GetRegionList().then((res) => {
                        if (res.code === 200) {
                            this.cardAddBox.regionList = res.data[0].aggregate;
                            this.cardAddBox.cityData = {
                                code: res.data[0].code,
                                name: res.data[0].name,
                                id: res.data[0].id,
                            }
                        }
                    })
                }
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
                if (row.isUser) {
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
            //发送短信验证码
            vCodeByTelClick() {
                if (!(/^1[3456789]\d{9}$/.test(this.cardAddBox.tel))) {
                    this.$Message.error('请输入正确手机号!');
                } else {
                    var time = 60;
                    var flag = true;   //设置点击标记，防止60内再次点击生效
                    this.cardAddBox.disabled = true;
                    if(flag){
                        var timer = setInterval(()=>{
                            if(time == 60 && flag){
                                flag = false;
                                ZXWRZ_SendVCodeByTel({
                                    Tel: this.cardAddBox.tel
                                }).then(res => {
                                        if (res.code === 200) {
                                            this.$Message(res.message);
                                            flag = true;
                                            time = 60;
                                            clearInterval(timer);
                                        }
                                    }
                                )

                            }else if(time == 0){
                                this.cardAddBox.disabled = false;
                                this.cardAddBox.timer = '发送验证码',
                                    clearInterval(timer);
                                time = 60;
                                flag = true;
                            }else {
                                this.cardAddBox.timer = time +"s重新发送";
                                time--;
                            }
                        },1000);
                    }
                }
            },
            // 确认密码
            blurPassWordToo() {
                if (this.cardAddBox.passwordToo.length === 0) {
                    return false
                }
                if (this.cardAddBox.password !== this.cardAddBox.passwordToo) {
                    this.$Message.error({
                        content: '两次密码输入不一致',
                        duration: 2.5,
                        closable: true
                    })
                    return false
                } else {
                    return true
                }
            },
            // 填充经融机构的数据
            setBankSelectChange() {
                this.cardAddBox.BankList.map(value => {
                    if (this.cardAddBox.banListSelect.bankName === value.bankName) {
                        this.cardAddBox.banListSelect.bankEnumID = value.bankEnumID;
                        this.cardAddBox.banListSelect.bankName_ZH = value.bankName_ZH;
                    }
                })
            },
            // 填充行政区划的数据
            setRegionSelectChange() {
                this.cardAddBox.regionList.map(value => {
                    if (this.cardAddBox.regionSelect.name === value.name) {
                        this.cardAddBox.regionSelect.id = value.id;
                        this.cardAddBox.regionSelect.code = value.code;
                    }
                })
            },
            // 新建用户的清空列表
            clearCardPushBox() {
                this.cardAddBox.userName = '';
                this.cardAddBox.password = '';
                this.cardAddBox.passwordToo = '';
                this.cardAddBox.name = '';
                this.cardAddBox.tel = '';
                this.cardAddBox.banListSelect = {};
                this.cardAddBox.regionSelect = {}
            },
            //更改用户的清空列表
            clearCardSelectBox() {
                this.cardReviseBox.show = false;
                this.cardReviseBox.userName = '';
                this.cardReviseBox.name = '';
            }
        },
        created() {
            // // 使用 Mock
            // var Mock = require('mockjs')
            // var data = Mock.mock({
            //     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            //     'data|10': [{
            //         // 属性 id 是一个自增数，起始值为 1，每次增 1
            //         'userType|1-3': 1,
            //         'userName|1':/[a-z][A-Z][0-9][0-9][0-9][0-9]/,
            //         'AccName|+1':'@cname()' ,
            //         'cellPhoneNumber':/[1][3578][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/,
            //         'createTiem|1': '@date()',
            //         'state|0-1': 0,
            //     }]
            // })
        },
        mounted() {
            this.loadDeptList();
        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    .userManagement {

    }

    .modalDrage_cf {
        .ivu-modal-body {
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
</style>
