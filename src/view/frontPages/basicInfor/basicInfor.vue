<template>
    <div class="basicInfor">
        <qNav :isNoShow="true"></qNav>
        <div class="basicInfor_til">
            <div class="com_center">
                <div>
                    <div class="divImg">
                        <img src="./img/user.jpg">
                    </div>
                    <div class="divName">
                        <p>{{$store.state.user.userName}}{{' - '+$store.state.user.companyName}}</p>
                        <p>{{getYearMouth()}}</p>
                    </div>
                    <!--                    <div class="divNews">-->
                    <!--                        <div></div>-->
                    <!--                        <span></span>-->
                    <!--                    </div>-->
                </div>
            </div>
        </div>
        <div class="basicInfor_body">
            <div class="com_center">
                <div>
                    <div class="basicInfor_bodyBtn">
                        <Row>
                            <Col :span="$store.state.user.Identity===3?6:12">
                                <div class="span_col">
                                    <div class="spanDiv" @click="getType(0)" :class="{addSpanDiv:type===0}">
                                        <img src="./img/icon1.png">
                                        <span>金融服务</span>
                                    </div>
                                </div>
                            </Col>
                            <Col span="6" v-if="$store.state.user.Identity===3">
                                <div class="span_col">
                                    <div class="spanDiv" @click="getType(1)" :class="{addSpanDiv:type===1}">
                                        <img src="./img/icon2.png">
                                        <span>融资需求</span>
                                    </div>
                                </div>
                            </Col>
                            <Col span="6" v-if="$store.state.user.Identity===3">
                                <div class="span_col">
                                    <div class="spanDiv" @click="getType(4)"
                                         :class="{addSpanDiv:type===4}">
                                        <img src="./img/icon3.png">
                                        <span>系统消息</span>
                                    </div>
                                </div>
                            </Col>
                            <Col span="6" v-if="$store.state.user.Identity===3">
                                <div class="span_col">
                                    <div class="spanDiv" @click="getType(2)"
                                         :class="{addSpanDiv:type===2}">
                                        <img src="./img/icon3.png">
                                        <span>产品申请</span>
                                    </div>
                                </div>
                            </Col>
                            <Col span="12" v-if="$store.state.user.Identity===5">
                                <div class="span_col">
                                    <div class="spanDiv" @click="getType(3)" :class="{addSpanDiv:type===3}">
                                        <img src="./img/icon4.png">
                                        <span>企业认证</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div class="basicInfor_financial" v-if="type===0">
                        <div class="financialBox">
                            <p class="pSpan">
                                <span class="tilLine"></span>
                                热门产品
                                <span class="allProduct" @click="getAllPath">
                                    >>更多产品
                                </span>
                            </p>
                            <ul>
                                <li v-for="item in financialList">
                                    <p>{{item.productName}}</p>
                                    <ul>
                                        <li><span
                                                class="key">{{item.interestRate_min}}%~{{item.interestRate_max}}%</span><span
                                                class="value">参考利率</span></li>
                                        <li><span class="key">{{item.dbfs}}</span><span class="value">担保方式</span></li>
                                        <li><span class="key">{{item.quota}}万</span><span class="value">贷款额度</span></li>
                                        <li><span class="key">{{item.dkqx}}{{item.dkqX_Unit}}</span><span class="value">贷款期限</span>
                                        </li>
                                    </ul>
                                    <div>
                                        <span @click="getPath(item.id)">查看详情</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="basicInfor_record" v-if="type===1">
                        <p>
                            <span class="com_i_btn" @click="getDemand(0)">发布需求</span>
                        </p>
                        <div>
                            <div class="ulThDiv">
                                <div class="div01"><span>需求名称</span></div>
                                <div class="div02"><span>申请时间</span></div>
                                <div class="div03"><span>产品名称</span></div>
                                <div class="div04"><span>对接银行</span></div>
                                <div class="div05"><span>对接状态</span></div>
                                <div class="div06"><span>操作</span></div>

                            </div>
                            <div class="ulDiv">
                                <div class="allLi" v-for="item in demandList">
                                    <div class="div01"><span>{{item.xqmc}}</span></div>
                                    <div class="div02"><span>{{item.createTime}}</span></div>
                                    <div class="ulConDiv">
                                        <div v-for="i in item.listProduct">
                                            <span class="div01"></span>
                                            <span class="div02"></span>
                                            <span class="div03 addSpan"
                                                  @click="getPath(i.productID)">{{i.productName}}</span>
                                            <span class="div04">{{i.bankName}}</span>
                                            <span class="div05">
                                                <span class="span01" v-if="i.status===1">申请成功</span>
                                                <span class="span02" v-if="i.status===2">申请驳回</span>
                                                <span class="span03" v-if="i.status===0">待审批</span>
                                            </span>
                                            <span class="div06">
                                                <div class="teo" v-if="i.status===1||i.status===2">
                                                    <div class="com_i_btn color01"
                                                         @click="getDetil(0,i.applyID,i.status)">详情</div>
                                                </div>
                                                <div class="teo" v-if="i.flowStatus===1">
                                                    <Poptip
                                                            confirm
                                                            title="您确定选择当前产品吗？"
                                                            @on-ok="getDemandAgree(item.id,i.productID)">
                                                    <div class="com_i_btn color02">同意</div>
                                                    </Poptip>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Page :total="demand.total" :page-size="demand.pageSize" :current="demand.pageIndex"
                              show-elevator show-sizer show-total class="com_page"
                              :page-size-opts="demand.pageSizeOpts"
                              @on-change="demandpagePageFil" @on-page-size-change="demandpageSizeFil"/>
                    </div>
                    <div class="basicInfor_news" v-if="type===2">
                        <div>
                            <div>
                                <div class="div01"><span>产品名称</span></div>
                                <div class="div02"><span>银行名称</span></div>
                                <div class="div03"><span>产品详情</span></div>
                                <div class="div04"><span>申请时间</span></div>
                                <div class="div05"><span>对接状态</span></div>
                                <div class="div06"><span>操作</span></div>
                            </div>
                            <ul>
                                <li v-for="item in application.list">
                                    <span class="div01 addSpan"
                                          @click="getPath(item.productID)">{{item.productName}}</span>
                                    <span class="div02">{{item.bank}}</span>
                                    <span class="div03">{{item.proDetailName}}</span>
                                    <span class="div04">{{item.createTime}}</span>
                                    <span class="div05">
                                         <span class="span01" v-if="item.status===1">申请成功</span>
                                         <span class="span02" v-if="item.status===2">申请驳回</span>
                                         <span class="span03" v-if="item.status===0">待审批</span>
                                    </span>
                                    <span class="div06">
                                        <div class="teo" v-if="item.status===1||item.status===2">
                                            <div class="com_i_btn"
                                                 @click="getDetil(0,item.applyID,item.status)">详情</div>
                                        </div>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="basicInfor_user" v-if="type===3">
                        <div class="basicInfor_user_Form">
                            <div class="divOne">
                                <div>
                                    <div>
                                        <div></div>
                                        <p>企业认证</p>
                                    </div>
                                </div>
                            </div>
                            <div class="div_form">
                                <Form ref="acceSave" :model="formItem" :label-width="150" :rules="ruleValidate">
                                    <FormItem label="企业名称" prop="compony">
                                        <Input v-model="formItem.compony" placeholder=""></Input>
                                    </FormItem>
                                    <FormItem label="统一社会信用代码" prop="code">
                                        <Input v-model="formItem.code" placeholder=""></Input>
                                    </FormItem>
                                    <FormItem label="法人姓名" prop="name">
                                        <Input v-model="formItem.name" placeholder=""></Input>
                                    </FormItem>
                                    <FormItem label="法人证件号" prop="phone">
                                        <Input v-model="formItem.phone" placeholder=""></Input>
                                    </FormItem>
                                    <FormItem label="短信验证码" prop="verific" class="verificInput">
                                        <Input v-model="formItem.verific" placeholder=""></Input>
                                        <span class="com_i_btn" @click="getVerific" v-if="!verificShow">获取验证码</span>
                                        <span class="com_i_btn" v-else>{{verificNum+'秒'}}</span>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                        <div class="basicInfor_btn">
                            <span class="com_i_btn" @click="getSave">提交</span>
                        </div>
                    </div>
                    <div class="basicInfor_system" v-if="type===4">
                        <div>
                            <div>
                                <div class="div01"><span>消息标题</span></div>
                                <div class="div02"><span>消息内容</span></div>
                                <div class="div03"><span>创建时间</span></div>
                            </div>
                            <ul>
                                <li v-for="item in newsList.list">
                                    <span class="div01 addSpan">{{item.title}}</span>
                                    <span class="div02">{{item.context}}</span>
                                    <span class="div03">{{item.createTime}}</span>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="auth.show" title="社会信用信息查询授权书"
               :mask-closable="false" :mask="true"
               :transfer="false" :closable="false" draggable
               width="600" :className="'auth_boxModal'">
            <div class="modal_body">
                <div class="ql-editor" data-gramm="false" contenteditable="true">
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;一、本企业特在此同意并授权上饶市智能化服务平台（饶企云）的运营机构（以下简称“运营机构”）采集本企业的如下信用信息：</p>
                    <p>1、企业向相关政府部门提供的和相关政府部门在管理工作中产生的信息；</p>
                    <p>2、企业在生产经营过程中，因使用公共服务（包括但不限于电力、供水、废物处理、污水处理、燃气供应、交通、通讯等）而留存在公共事业单位中的信息；</p>
                    <p>3、合法采集企业相关信息的第三方提供的信用信息；</p>
                    <p class="marBom">4、国家法律、行政法规、部门规章、地方性法规未禁止征信机构采集的与授权企业有关的其他信息。&nbsp;</p>
                    <p class="marBom">&nbsp;&nbsp;&nbsp;&nbsp;二、授权企业在此授权运营机构可以从政府部门、公共事业单位、金融机构、行业协会、社会团体、互联网信息平台渠道、征信公司、其他商业机构等相关部门和单位采集上述信息（包括历史信息及更新）。授权企业在此授权上述有关部门和单位向运营机构提供本企业上述信息。</p>
                    <p class="marBom">&nbsp;&nbsp;&nbsp;&nbsp;三、授权企业在此授权上饶市智能化服务平台（饶企云）的注册金融服务提供方可以向运营机构查询使用本企业的上述信息，并授权运营机构将该等信息提供给被授权单位。</p>
                    <p class="marBom">&nbsp;&nbsp;&nbsp;&nbsp;四、授权企业同意国家机关、政府部门、事业单位等部门和单位，因行政管理、公共服务的需要，可以直接查询企业的上述信息。运营机构可以向上述部门和单位提供上述信息。</p>
                    <p class="marBom">&nbsp;&nbsp;&nbsp;&nbsp;五、本授权自授权书签订之日起生效，授权期限为长期。</p>
                    <p class="marBom">&nbsp;&nbsp;&nbsp;&nbsp;六、如需终止本授权，需要填写《企业社会信用信息查询授权终止书》并提供相关资料，经运营机构审核，满足终止授权条件的可以终止。</p>
                    <p class="marBom">&nbsp;&nbsp;&nbsp;&nbsp;七、授权企业在此声明已知悉并理解本授权委托书，以及因提供非公开信息及负面信息可能导致的任何不利后果。</p>
                    <p><br></p></div>
            </div>
            <div slot="footer">
                <Button @click="getColseAuth">取消</Button>
                <Button type="primary" @click="getSaveAuth">确定</Button>
            </div>
        </Modal>
        <Modal v-model="detail.show" :title="detail.status===1?'申请成功':'申请驳回'"
               :mask-closable="false" :mask="true" draggable
               :transfer="false" :closable="false"
               width="600" :className="'detail_boxModal'">
            <div class="modal_body xyStatus">
                <ul>
                    <li>
                        <div>产品名称</div>
                        <div>{{detail.filter.productName}}</div>
                    </li>
                    <li>
                        <div>所属银行</div>
                        <div>{{detail.filter.bank}}</div>
                    </li>
                    <li v-if="detail.status===1">
                        <div>授信金额</div>
                        <div>{{detail.filter.sxje}}</div>
                    </li>
                    <li v-if="detail.status===1">
                        <div>授信期限</div>
                        <div>{{detail.filter.sxqx}}</div>
                    </li>
                    <li v-if="detail.status===1&&detail.filter.bank_Zh!=='上饶银行'">
                        <div>利率</div>
                        <div>{{detail.filter.lv+'%'}}</div>
                    </li>
                    <li v-if="detail.status===1&&detail.filter.bank_Zh!=='上饶银行'">
                        <div>担保方式</div>
                        <div>{{detail.filter.dbfs}}</div>
                    </li>
                    <li v-if="detail.status===2" class="reason">
                        <div>不通过原因</div>
                        <div>{{detail.filter.reason}}</div>
                    </li>
                    <li v-if="detail.status===1" class="reason">
                        <div>添加说明</div>
                        <div>{{detail.filter.sxqx}}</div>
                    </li>
                </ul>
            </div>
            <div slot="footer">
                <Button @click="getDetil(1)">取消</Button>
            </div>
        </Modal>
        <Modal v-model="demand.show" title="发布需求"
               :mask-closable="false" :mask="true"
               :transfer="false" :closable="false" draggable
               width="600" :className="'demand_boxModal'">
            <div class="modal_body">
                <ul>
                    <li class="ul_model">
                        <div class="list">
                            <ul>
                                <li class="label_input">
                                    <div>贷款金额:</div>
                                    <div class="inputJe">
                                        <Input v-model="demand.filter.dkje" placeholder="贷款金额"/>
                                        <span>万元</span>
                                    </div>
                                </li>
                                <li class="label_input">
                                    <div>担保方式:</div>
                                    <div>
                                        <CheckboxGroup v-model="demand.filter.dbfs">
                                            <Checkbox label="担保"></Checkbox>
                                            <Checkbox label="信用"></Checkbox>
                                            <Checkbox label="抵押"></Checkbox>
                                            <Checkbox label="保证"></Checkbox>
                                            <Checkbox label="贴现"></Checkbox>
                                            <Checkbox label="质押"></Checkbox>
                                            <Checkbox label="综合"></Checkbox>
                                        </CheckboxGroup>
                                    </div>
                                </li>
                                <li class="label_input">
                                    <div>贷款期限:</div>
                                    <div>
                                        <Input v-model="demand.filter.dkqx" style="width:290px;margin-right: 20px"
                                               placeholder="贷款期限"/>
                                        <Select v-model="demand.filter.dkqxUnit" style="width:100px">
                                            <Option label="年" value="年"></Option>
                                            <Option label="月" value="月"></Option>
                                            <Option label="日" value="日"></Option>
                                        </Select>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div slot="footer">
                <Button @click="getDemand(1)">取消</Button>
                <Button type="primary" @click="getSaveDemand">确定</Button>
            </div>
        </Modal>
        <qBom></qBom>
    </div>
</template>

<script>
    /**
     @author xiaoye
     @date 2020/8/21 3:26 下午
     */
    import qNav from '../components/qNav'
    import qBom from '../components/qBom'

    import {HotProduct} from '@/api/front/index'
    import {ZXWRZ_SendVCodeByTel} from '@/api/login/login'
    import {
        authUser,
        SaveQYDemand,
        GetDemandsListDouble_QD,
        QY_InverseChoose_Product_QD,
        QY_authUserTel,
        GetApplyProByQY_QD,
        GetApplyQYInfo,
        GetUserNews
    } from '@/api/front/basicInfor'

    import {setToken, getToken} from '@/libs/util'
    import {mapActions} from 'vuex'

    export default {
        name: 'basicInfor',
        components: {
            qNav,
            qBom
        },
        data() {
            return {
                type: 0,
                formItem: {
                    compony: '',
                    code: '',
                    name: '',
                    phone: '',
                    verific: '',
                    agree: false,
                },
                //表单类型
                formType: 0,
                //r企业认证
                ruleValidate: {
                    compony: [
                        {required: true, message: '请输入企业名称', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入统一社会信用代码', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入法人姓名', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入法人证件号', trigger: 'blur'}
                    ],
                    verific: [
                        {required: true, message: '请输入短信验证码', trigger: 'blur'}
                    ],
                },
                //金融理财产品
                financialList: [],
                //授权书
                auth: {
                    show: false,
                },
                //详情
                detail: {
                    show: false,
                    status: 1,
                    filter: {
                        productName: "",
                        bank: "",
                        bank_Zh: "",
                        sxje: "",
                        sxqx: "",
                        lv: "",
                        dbfs: "",
                        reason: "",
                    }
                },
                //发布需求
                demand: {
                    show: false,
                    filter: {
                        dkje: '',
                        dbfs: [],
                        dkqx: '',
                        dkqxUnit: '年'
                    },
                    pageIndex: 1,
                    pageSize: 10,
                    pageSizeOpts: [10, 15, 30],
                    total: 10,
                },
                //申请列表
                application: {
                    list: [],
                    pageIndex: 1,
                    pageSize: 10,
                    pageSizeOpts: [10, 15, 30],
                    total: 10,
                },
                //申请列表
                newsList: {
                    list: [],
                    pageIndex: 1,
                    pageSize: 10,
                    pageSizeOpts: [10, 15, 30],
                    total: 10,
                },
                //验证码是否展示
                verificShow: false,
                //验证码
                verificNum: 60,
                //发布需求
                demandList: [],
                //授权
                authorType: 0,
            }
        },
        methods: {
            ...mapActions([
                'handleUserOut'
            ]),
            getType(type) {
                if (this.type !== type) {
                    this.type = type;
                }
                if (type === 0) {

                } else if (type === 1) {
                    this.getDemandList();
                } else if (type === 2) {
                    this.getDemondAppList();
                } else if (type === 3) {

                }
            },
            getSave() {
                this.$refs["acceSave"].validate(valid => {
                    if (!valid) {
                        this.$Message.error({
                            content: "请完善表单信息",
                            duration: 2,
                            closable: true
                        });
                    } else {
                        this.authorType = 0;
                        this.auth.show = true;
                    }
                });
            },
            //获取金融理财产品
            getFinancialList() {
                HotProduct({
                    pageIndex: 1,
                    pageSize: 6
                }).then(res => {
                    if (res.code === 200) {
                        this.financialList = res.data;
                    }
                })
            },
            //
            getPath(id) {
                let routeUrl = this.$router.resolve({
                    path: "/financialDetail",
                    query: {id: id}
                });
                window.open(routeUrl.href, '_blank');
            },
            //查看更多
            getAllPath() {
                this.$router.push('/financial');
            },
            //关闭授权弹框
            getColseAuth() {
                this.auth.show = false;
            },
            //保存
            getSaveAuth() {

                if (this.authorType === 0) {
                    QY_authUserTel({
                        Tel: this.$store.state.user.userTel,
                        VCode: this.formItem.verific,
                    }).then(res => {
                        if (res.code === 200) {
                            authUser({
                                tyxydm: this.formItem.code,
                                qymc: this.formItem.compony,
                                frmc: this.formItem.name,
                                sfzh: this.formItem.phone,
                                frTel: this.$store.state.user.userTel,
                            }).then(res => {
                                if (res.code === 200) {
                                    this.formType = 1;
                                    this.$Message.success('认证企业成功！请重新登录！');
                                    setToken('');
                                    this.handleUserOut();
                                } else {
                                    this.$Message.error('认证企业失败！');
                                }
                            })
                        } else {
                            this.$Message.error('认证手机号失败！');
                        }
                    });
                } else if (this.authorType === 1) {
                    let str = this.demand.filter.dbfs.join(',');
                    SaveQYDemand({
                        quota: this.demand.filter.dkje,
                        dkfs: str,
                        dkqx: this.demand.filter.dkqx,
                        dkqX_Unit: this.demand.filter.dkqxUnit,
                    }).then(res => {
                        if (res.code === 200) {
                            this.$Message.success('发布需求成功！');
                            this.getDemand(1);
                            this.getDemandList();
                        }
                    })
                }
                this.auth.show = false;

            },
            //获取验证码
            getVerific() {
                this.verificShow = false;
                this.verificNum = 60;

                ZXWRZ_SendVCodeByTel({
                    Tel: this.$store.state.user.userTel,
                }).then(res => {
                    if (res.code === 200) {
                        this.verificShow = true;
                        clearInterval(this.interval);
                        this.interval = setInterval(() => {
                            if (this.verificNum === 0) {
                                this.verificShow = false;
                                this.verificNum = 60;
                                clearInterval(this.interval);
                                return;
                            }
                            this.verificNum--;
                        }, 1000);
                    }
                });
            },
            //发布需求弹框
            getDemand(type) {
                if (type === 0) {
                    this.demand.show = true;
                    this.demand.filter = {
                        dkje: '',
                        dbfs: [],
                        dkqx: '',
                        dkqxUnit: '年'
                    }
                } else if (type === 1) {
                    this.demand.show = false;
                    this.demand.filter = {
                        dkje: '',
                        dbfs: [],
                        dkqx: '',
                        dkqxUnit: '年'
                    }
                }
            },
            //发布需求
            getSaveDemand() {
                //
                if (!this.demand.filter.dkje) {
                    this.$Message.error('请输入贷款金额');
                    return;
                } else if (!this.demand.filter.dbfs.length) {
                    this.$Message.error('请选择贷款方式');
                    return;
                } else if (!this.demand.filter.dkqx) {
                    this.$Message.error('请输入贷款期限');
                    return;
                }
                this.authorType = 1;
                this.auth.show = true;
            },
            //获取需求列表
            getDemandList() {
                GetDemandsListDouble_QD({
                    pageIndex: this.demand.pageIndex,
                    pageSize: this.demand.pageSize,
                }).then(res => {
                    if (res.code === 200) {
                        this.demandList = res.data.list;
                        this.demand.total = res.data.count;
                    }
                })
            },
            //同意
            getDemandAgree(id, productID) {
                let count = 0;
                this.demandList.map((item) => {
                    if (item.id === id) {
                        item.listProduct.map(i => {
                            if (i.flowStatus === 2) {
                                count++;
                            }
                        })
                    }
                });
                if (count >= 3) {
                    this.$Message.error('您最多选择3家银行产品！');
                    return;
                }
                QY_InverseChoose_Product_QD({
                    demandID: id,
                    productID: productID,
                }).then(res => {
                    if (res.code === 200) {
                        this.$Message.success('您选择的产品提交成功！');
                        this.getDemandList();
                    }
                })
            },
            demandpagePageFil(page) {
                this.demand.pageIndex = page;
                this.getDemandList();
            },
            demandpageSizeFil(pageSize) {
                this.demand.pageSize = pageSize;
                this.getDemandList();
            },
            //获取当前时间
            getYearMouth() {
                let myDate = new Date();
                let list = [
                    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
                    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
                    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
                    '30', '31',];
                return myDate.getFullYear() + '-' + (list[myDate.getMonth() + 1]) + '-' + (list[myDate.getDate()])
            },
            //获取产品申请列表
            getDemondAppList() {
                GetApplyProByQY_QD({
                    pageIndex: this.application.pageIndex,
                    pageSize: this.application.pageSize,
                }).then(res => {
                    if (res.code === 200) {
                        this.application.list = res.data.dt;
                        this.application.total = res.data.count;
                    }
                });
            },
            //详情弹框
            getDetil(type, id, status) {
                if (type === 0) {
                    GetApplyQYInfo({
                        applyID: id
                    }).then(res => {
                        if (res.code === 200) {
                            let data = res.data[0];
                            this.detail.show = true;
                            this.detail.status = status;
                            this.detail.filter = {
                                productName: data.productName,
                                bank: data.bank,
                                bank_Zh: data.bank_ZH,
                                sxje: data.pzed + '万元',
                                sxqx: data.pzqx + data.pzqX_Unit,
                                lv: data.pzlv,
                                dbfs: data.dbfs,
                                reason: data.refuseReason,
                            }
                        }
                    })
                } else if (type === 1) {
                    this.detail.show = false;
                }
            },
            getUserNewslist(){
                GetUserNews({
                    pageIndex: 1,
                    pageSize: 10,
                }).then(res=>{
                    if (res.code === 200) {
                        console.log(res,'=====')
                        this.newsList.list = res.data.dataTable;
                        this.newsList.total = res.data.totalCount;
                    }
                })
            }
        },
        mounted() {
            this.getFinancialList();
            this.getDemandList();
            this.getUserNewslist();
        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    @import '../css/comFront.less';

    .basicInfor {
        width: 100%;
        min-width: 1200px;
        color: #1b4673;

        .basicInfor_til {
            width: 100%;
            padding: 60px 0 30px;

            .com_center {
                padding: 0 30px;
                height: 75px;
                background-color: #ffffff;
                box-shadow: 3px 3px 46px 0 rgba(163, 163, 163, 0.5);
                border-radius: 4px;

                > div {
                    width: 100%;
                    height: 100%;
                    padding: 10px 0;
                }

                .divImg {
                    margin-right: 20px;
                    width: 53px;
                    height: 53px;
                    display: inline-block;
                    float: left;

                    > img {
                        border-radius: 50%;
                        border: 1px solid #1b4673;
                        width: 100%;
                        height: 100%;
                    }
                }

                .divName {
                    width: calc(~'100% - 120px');
                    display: inline-block;
                    float: left;

                    p {
                        width: 100%;
                        line-height: 28px;
                        height: 28px;
                        font-size: 14px;
                        color: #333;
                    }
                }

                .divNews {
                    float: right;
                    width: 30px;
                    display: inline-block;
                    height: 100%;
                    text-align: center;

                    > div {
                        width: 30px;
                        height: 30px;
                        background: url("./img/news.png");
                        background-size: 100% 100%;
                        display: inline-block;
                        position: relative;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
            }
        }

        .basicInfor_body {
            width: 100%;
            margin-bottom: 40px;

            .com_center {
                > div {
                    width: 100%;
                    background-color: #ffffff;
                    box-shadow: 3px 3px 46px 0 rgba(163, 163, 163, 0.5);
                    border-radius: 4px;
                    padding: 30px;

                    .basicInfor_bodyBtn {
                        width: 100%;
                        height: 70px;

                        .spanDiv {
                            width: 50%;
                            height: 30px;
                            border-radius: 15px;
                            border: solid 1px #dcdcdc;
                            padding: 0 20px;
                            cursor: pointer;
                            margin: auto;

                            > img {
                                margin-right: 20px;
                                height: 18px;
                                width: 18px;
                                position: relative;
                                top: 4px;
                            }

                            > span {
                                width: calc(~'100% - 40px');
                                display: inline-block;
                                font-size: 14px;
                                letter-spacing: 1px;
                                line-height: 28px;
                                text-align: center;
                            }
                        }

                        .addSpanDiv {
                            background-color: #c39f6f;

                            > span {
                                color: #fff;
                            }
                        }
                    }

                    .basicInfor_financial {
                        width: 100%;

                        .financialBox {
                            .pSpan {

                                .tilLine {
                                    height: 20px;
                                    width: 2px;
                                    background-color: #1b4673;
                                    float: left;
                                    display: inline-block;
                                    margin-right: 10px;
                                    position: relative;
                                    top: 5px;
                                }

                                font-size: 14px;
                                color: #333;
                                line-height: 30px;
                                margin-bottom: 15px;

                                .allProduct {
                                    float: right;
                                    color: #8198c1;
                                    cursor: pointer;
                                    letter-spacing: 1px;
                                    font-weight: bold;
                                }

                                .allProduct:hover {
                                    color: #334a83;
                                }
                            }

                            > ul {
                                width: 110%;
                                display: inline-block;

                                > li {
                                    height: 225px;
                                    width: calc(~'70% / 3');
                                    border-radius: 4px;
                                    border: solid 1px #dddddd;
                                    padding: 10px;
                                    float: left;
                                    margin: 20px 10% 20px 0;

                                    > p {
                                        line-height: 30px;
                                        font-size: 16px;
                                        text-align: center;
                                        letter-spacing: 1px;
                                        margin-bottom: 10px;
                                        background: url("./img/tilLine.jpg");
                                        background-size: 100% 100%;
                                    }

                                    > ul {
                                        width: 100%;
                                        display: inline-block;

                                        li {
                                            width: 50%;
                                            float: left;
                                            padding: 0 10px;

                                            > span {
                                                display: inline-block;
                                                width: 100%;
                                            }

                                            .key {
                                                line-height: 27px;
                                                height: 27px;
                                                font-size: 15px;
                                                color: #1b4673;
                                                text-overflow: ellipsis;
                                                overflow: hidden;
                                                white-space: nowrap;
                                            }

                                            .value {
                                                line-height: 20px;
                                                height: 20px;
                                                font-size: 14px;
                                                color: #666666;
                                                text-overflow: ellipsis;
                                                overflow: hidden;
                                                white-space: nowrap;
                                            }
                                        }
                                    }

                                    > div {
                                        text-align: center;
                                        height: 30px;
                                        margin-top: 5px;

                                        > span {
                                            cursor: pointer;
                                            color: #fff;
                                            background-color: #1b4673;
                                            border-radius: 4px;
                                            padding: 0 20px;
                                            letter-spacing: 1px;
                                            line-height: 30px;
                                            display: inline-block;
                                        }

                                        > span:hover {
                                            background-color: #333;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .basicInfor_record {
                        > p {
                            text-align: right;
                            margin-bottom: 10px;
                        }

                        > div {
                            border: 1px solid #ddd;
                            border-radius: 4px;

                            .ulThDiv {
                                height: 45px;
                                background-color: #1b4673;

                                div {
                                    display: inline-block;
                                    float: left;
                                    height: 100%;

                                    > span {
                                        border-left: 1px solid #fff;
                                        text-align: center;
                                        color: #ffffff;
                                        letter-spacing: 1px;
                                        font-size: 14px;
                                        display: inline-block;
                                        width: 100%;
                                        position: relative;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        line-height: 15px;
                                    }
                                }

                                > div:first-child {
                                    span {
                                        border-left: 0;
                                    }
                                }


                            }

                            .ulDiv {
                                width: 100%;
                                min-height: 200px;
                                display: inline-block;

                                > div:last-child {
                                    border-bottom: 0;
                                }

                                > div:first-child {
                                    margin-top: 8px;
                                }

                                > div {
                                    border-bottom: 1px solid #ddd;
                                    width: 100%;

                                    > span {
                                        height: 35px;
                                        display: inline-block;
                                        float: left;
                                        width: 10%;
                                        padding: 0 10px;
                                        font-size: 14px;
                                        line-height: 35px;
                                        text-align: center;
                                    }

                                }

                                .allLi {
                                    position: relative;
                                    margin-top: 0;
                                    line-height: 40px;
                                    min-height: 40px;
                                    display: inline-block;

                                    > .div01 {
                                        height: 100%;
                                        float: left;
                                        text-align: center;
                                        position: absolute;
                                        left: 0;
                                        padding: 0 10px;

                                        > span {
                                            display: inline-block;
                                            width: 100%;
                                            position: absolute;
                                            top: 50%;
                                            left: 50%;
                                            transform: translateY(-50%) translateX(-50%);
                                            font-size: 14px;
                                            text-overflow: ellipsis;
                                            overflow: hidden;
                                            white-space: nowrap;
                                        }
                                    }

                                    > .div02 {
                                        height: 100%;
                                        float: left;
                                        text-align: center;
                                        position: absolute;
                                        left: 19%;
                                        padding: 0 10px;

                                        > span {
                                            display: inline-block;
                                            width: 100%;
                                            position: absolute;
                                            top: 50%;
                                            left: 50%;
                                            transform: translateY(-50%) translateX(-50%);
                                            font-size: 14px;
                                            text-overflow: ellipsis;
                                            overflow: hidden;
                                            white-space: nowrap;
                                        }
                                    }

                                    > .ulConDiv {
                                        width: 100%;

                                        > div {
                                            width: 100%;

                                            > span {
                                                height: 40px;
                                                display: inline-block;
                                                float: left;
                                                padding: 0 10px;
                                                font-size: 14px;
                                                line-height: 40px;
                                                text-align: center;
                                                text-overflow: ellipsis;
                                                overflow: hidden;
                                                white-space: nowrap;

                                                > span {
                                                    padding: 0 13px;
                                                    line-height: 25px;
                                                    height: 25px;
                                                    font-size: 12px;
                                                    display: inline-block;
                                                    text-align: center;
                                                    letter-spacing: 1px;
                                                    margin: auto;
                                                    border-radius: 6px;
                                                }

                                                .span01 {
                                                    background-color: #f0faeb;
                                                    color: #538a2c;
                                                }

                                                .span02 {
                                                    background-color: #fff0f0;
                                                    color: #f56c6c;
                                                }

                                                .span03 {
                                                    background-color: #faf8de;
                                                    color: #d2ad00;
                                                }

                                                .teo {
                                                    .ivu-poptip-content {
                                                        text-align: left;

                                                        .ivu-poptip-inner {
                                                            width: 240px;
                                                            letter-spacing: 1px;
                                                            font-size: 14px;
                                                        }

                                                        .ivu-btn-primary {
                                                            color: #fff;
                                                            background-color: #1b4673;
                                                            border-color: #1b4673;
                                                        }
                                                    }

                                                    .com_i_btn {
                                                        padding: 0 10px;
                                                        margin-right: 10px;
                                                    }

                                                    .com_i_btn:last-child {
                                                        margin-right: 0;
                                                    }

                                                    .color02 {
                                                        background-color: #c39f6f !important;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        .div01 {
                            width: 19%;
                        }

                        .div02 {

                            width: 16%
                        }

                        .div03 {

                            width: 19%
                        }

                        .div04 {

                            width: 16%
                        }

                        .div05 {

                            width: 15%
                        }

                        .div06 {

                            width: 15%
                        }


                        .com_page {
                            margin-bottom: 0 !important;
                            min-height: 70px !important;
                        }

                    }

                    .basicInfor_news {

                        > div {
                            border: 1px solid #ddd;
                            border-radius: 4px;

                            > div {
                                height: 45px;
                                background-color: #1b4673;

                                div {
                                    display: inline-block;
                                    float: left;
                                    width: 10%;
                                    height: 100%;

                                    > span {
                                        border-left: 1px solid #fff;
                                        text-align: center;
                                        color: #ffffff;
                                        letter-spacing: 1px;
                                        font-size: 14px;
                                        display: inline-block;
                                        width: 100%;
                                        position: relative;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        line-height: 15px;
                                    }
                                }

                                > div:first-child {
                                    span {
                                        border-left: 0;
                                    }
                                }


                            }

                            > ul {
                                width: 100%;
                                min-height: 200px;

                                > li:last-child {
                                    border-bottom: 0;
                                    margin-bottom: 5px;
                                }

                                li {
                                    height: 35px;
                                    border-bottom: 1px solid #ddd;
                                    margin-top: 5px;

                                    > span {
                                        display: inline-block;
                                        float: left;
                                        width: 10%;
                                        height: 100%;
                                        padding: 0 10px;
                                        font-size: 14px;
                                        line-height: 35px;
                                        text-align: center;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                        white-space: nowrap;


                                        > span {
                                            padding: 0 13px;
                                            line-height: 25px;
                                            height: 25px;
                                            font-size: 12px;
                                            display: inline-block;
                                            text-align: center;
                                            letter-spacing: 1px;
                                            margin: auto;
                                            border-radius: 6px;
                                        }

                                        .span01 {
                                            background-color: #f0faeb;
                                            color: #538a2c;
                                        }

                                        .span02 {
                                            background-color: #fff0f0;
                                            color: #f56c6c;
                                        }

                                        .span03 {
                                            background-color: #faf8de;
                                            color: #d2ad00;
                                        }

                                        .teo {
                                            .com_i_btn {
                                                padding: 0 10px;
                                                margin-right: 10px;
                                            }

                                            .com_i_btn:last-child {
                                                margin-right: 0;
                                            }

                                            .color02 {
                                                background-color: #c39f6f !important;
                                            }
                                        }
                                    }


                                }
                            }
                        }

                        .div01 {
                            width: 20%;
                        }

                        .div02 {

                            width: 20%
                        }

                        .div03 {

                            width: 15%
                        }

                        .div04 {

                            width: 15%
                        }

                        .div05 {

                            width: 15%;
                        }

                        .div06 {

                            width: 15%
                        }
                    }
                    .basicInfor_system {

                        > div {
                            border: 1px solid #ddd;
                            border-radius: 4px;

                            > div {
                                height: 45px;
                                background-color: #1b4673;

                                div {
                                    display: inline-block;
                                    float: left;
                                    width: 10%;
                                    height: 100%;

                                    > span {
                                        border-left: 1px solid #fff;
                                        text-align: center;
                                        color: #ffffff;
                                        letter-spacing: 1px;
                                        font-size: 14px;
                                        display: inline-block;
                                        width: 100%;
                                        position: relative;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        line-height: 15px;
                                    }
                                }

                                > div:first-child {
                                    span {
                                        border-left: 0;
                                    }
                                }


                            }

                            > ul {
                                width: 100%;
                                min-height: 200px;

                                > li:last-child {
                                    border-bottom: 0;
                                    margin-bottom: 5px;
                                }

                                li {
                                    height: 35px;
                                    border-bottom: 1px solid #ddd;
                                    margin-top: 5px;

                                    > span {
                                        display: inline-block;
                                        float: left;
                                        width: 10%;
                                        height: 100%;
                                        padding: 0 10px;
                                        font-size: 14px;
                                        line-height: 35px;
                                        text-align: center;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                        white-space: nowrap;


                                        > span {
                                            padding: 0 13px;
                                            line-height: 25px;
                                            height: 25px;
                                            font-size: 12px;
                                            display: inline-block;
                                            text-align: center;
                                            letter-spacing: 1px;
                                            margin: auto;
                                            border-radius: 6px;
                                        }

                                        .span01 {
                                            background-color: #f0faeb;
                                            color: #538a2c;
                                        }

                                        .span02 {
                                            background-color: #fff0f0;
                                            color: #f56c6c;
                                        }

                                        .span03 {
                                            background-color: #faf8de;
                                            color: #d2ad00;
                                        }

                                        .teo {
                                            .com_i_btn {
                                                padding: 0 10px;
                                                margin-right: 10px;
                                            }

                                            .com_i_btn:last-child {
                                                margin-right: 0;
                                            }

                                            .color02 {
                                                background-color: #c39f6f !important;
                                            }
                                        }
                                    }


                                }
                            }
                        }

                        .div01 {
                            width: 20%;
                        }

                        .div02 {

                            width: 60%
                        }

                        .div03 {
                            width:20%
                        }
                    }

                    .basicInfor_user {
                        width: 100%;

                        .basicInfor_user_Form {
                            width: 100%;
                            height: 390px;
                            display: inline-block;

                            .divOne {
                                width: 30%;
                                height: 100%;
                                text-align: center;
                                float: left;

                                > div {
                                    width: 150px;
                                    height: 150px;
                                    border-radius: 9px;
                                    background-color: #c4cfdb;
                                    display: inline-block;
                                    position: relative;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    text-align: center;

                                    > div {
                                        position: relative;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        width: 100%;
                                        text-align: center;

                                        > div {
                                            display: inline-block;
                                            background: url("./img/one.png");
                                            background-size: 100% 100%;
                                            width: 35px;
                                            height: 35px;
                                            margin-bottom: 10px;
                                        }

                                        > p {
                                            width: 100%;
                                            text-align: center;
                                            font-size: 18px;
                                            letter-spacing: 2px;
                                            color: #1b4673;
                                            line-height: 30px;
                                            font-weight: bold;
                                        }
                                    }
                                }
                            }

                            .div_form {
                                width: 70%;
                                float: left;
                                height: 100%;

                                .ivu-form {
                                    width: 70%;
                                    display: inline-block;
                                    position: relative;
                                    top: 50%;
                                    left: 10%;
                                    transform: translateY(-50%);

                                    .ivu-form-item-label {
                                        font-size: 14px;
                                        letter-spacing: 1px;
                                    }

                                    .ivu-form-item-label:before {
                                        font-size: 18px !important;
                                    }

                                    .verificInput {
                                        .ivu-input-wrapper {
                                            width: calc(~'100% - 119px');
                                            margin-right: 10px;
                                        }

                                        .verificNum {
                                            width: 60px;
                                            letter-spacing: 2px;
                                            font-size: 14px;
                                            display: inline-block;
                                            line-height: 30px;
                                            text-align: center;
                                            color: #1b4673;
                                        }
                                    }

                                    .agreeBook {
                                        .ivu-checkbox-wrapper {
                                            font-size: 14px;
                                            margin-right: 5px;
                                        }

                                        .book {
                                            font-size: 14px;
                                            color: #1b4673;
                                            border-bottom: 1px solid #1b4673;
                                            cursor: pointer;
                                        }

                                        .book:hover {
                                            color: #111;
                                            border-bottom: 1px solid #111;
                                        }
                                    }

                                }
                            }
                        }

                        .basicInfor_btn {
                            text-align: center;
                        }
                    }


                    .addSpan {
                        cursor: pointer;
                    }

                    .addSpan:hover {
                        color: red;
                    }
                }
            }
        }

    }

    .auth_boxModal {
        z-index: 4444 !important;


        .ql-editor {
            padding: 10px 20px;

            p {
                text-indent: 2em;
                font-size: 16px;
                line-height: 30px;
                color: #333;
            }

            .marBom {
                margin-bottom: 5px;
            }
        }

        :focus {
            outline: -webkit-focus-ring-color auto 0;
        }

        .ivu-modal-body {
            height: 400px;
            overflow: auto;
        }
    }

    .detail_boxModal {

    }

    .check_boxModal {

    }

    .demand_boxModal {
        z-index: 3333 !important;

        .modal_body {
            width: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            max-height: 540px;

            > ul {
                width: 100%;
                display: inline-block;
                border: 1px solid #e8eaec;

                > li {
                    width: 100%;
                    border-bottom: 1px solid #e8eaec;
                    white-space: nowrap;
                    list-style-type: none;
                    display: flex;

                    > div:first-child {
                        width: 13%;
                        border-right: 1px solid #e8eaec;
                        line-height: 45px;
                        padding: 0 15px;
                        font-size: 13px;
                        color: #515a6e;
                        letter-spacing: 1px;
                        display: inline-block;
                        float: left;
                        text-align: center;
                    }

                    > div:last-child {
                        height: 100%;
                        width: 87%;
                        padding: 0 10px;
                        line-height: 45px;
                        color: #111;
                        letter-spacing: 0.5px;
                        display: inline-block;
                        float: left;
                        word-wrap: break-word;
                    }

                }

                .ul_model {

                    .list {
                        padding: 0;
                        width: 100%;

                        > ul {
                            width: 100%;

                            > li {
                                line-height: 50px;
                                width: 100%;
                                height: 50px;
                                color: #111;
                                padding: 0;
                                list-style-type: none;
                                border-bottom: 1px solid #e8eaec;


                            }

                            > li:last-child {
                                border-bottom: 0;
                            }

                            .label_input {
                                white-space: nowrap;
                                display: flex;

                                > div:first-child {
                                    width: 22%;
                                    border-right: 1px solid #e8eaec;
                                    padding: 0 10px;
                                    letter-spacing: 1px;
                                    font-size: 13px;
                                    color: #515a6e;
                                    display: inline-block;
                                    float: left;
                                }

                                > div:last-child {
                                    height: 100%;
                                    width: 78%;
                                    padding: 0 15px;
                                    line-height: 48px;
                                    color: #111;
                                    letter-spacing: 0.5px;
                                    display: inline-block;
                                    float: left;
                                    word-wrap: break-word;
                                    text-align: left;

                                    .ivu-checkbox-group {
                                        text-align: left;
                                    }
                                }

                                .inputJe {
                                    position: relative;

                                    > span {
                                        position: absolute;
                                        right: 20px;
                                        display: inline-block;
                                        height: 100%;
                                        z-index: 2;
                                        width: 30px;
                                        line-height: 50px;
                                        text-align: center;
                                    }

                                    input {
                                        padding-right: 40px;
                                    }
                                }
                            }
                        }
                    }
                }

                li:last-child {
                    border-bottom: 0;
                }
            }
        }

    }
</style>
