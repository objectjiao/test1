<template>
    <div class="companyDetil">
        <div class="companyDetilbox">
            <div class="companyDetilhead">
                <div class="head_left">
                    <i class="hLogo"></i>
                    <span>饶企云-上饶市中小微企业融资应用平台</span>
                </div>
            </div>
            <div class="companyDetil_content" >
                <div class="companyDetil_child">
                    <div class="companyinfo" v-loading="companyload">
                        <div class="enterprisetitle">
                            <h3>{{enterpriseInfo.qymc}}</h3>
                            <div>
                                {{enterpriseInfo.qyzt}}
                            </div>
                        </div>
                        <div class="enterprisecontent">
                            <ul>
                                <li>
                                    <i class="el-icon-user"></i>
                                    <p>
                                        <span class="infoname">统一社会信用代码/注册号：</span>
                                        <span class="infovalue">{{enterpriseInfo.tyshxydm}}</span>
                                    </p>
                                </li>
                                <li>
                                    <i class="el-icon-user"></i>
                                    <p class="alertName" @click="getInvestorInfo(enterpriseInfo.fddbr,enterpriseInfo.id)">
                                        <span class="infoname">法定代表人：</span>
                                        <span class="infovalue" >{{enterpriseInfo.fddbr}}</span>
                                    </p>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <i class="el-icon-user"></i>
                                    <p>
                                        <span class="infoname">住所：</span>
                                        <span class="infovalue">{{enterpriseInfo.zs}}</span>
                                    </p>
                                </li>
                                <li>
                                    <i class="el-icon-user"></i>
                                    <p>
                                        <span class="infoname">成立日期：</span>
                                        <span class="infovalue">{{enterpriseInfo.clrq}}</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="companyinfo_classify">
                        <div class="classifynav">
                            <el-menu
                                    :default-active="tabActiveName"
                                    class="el-menu-demo"
                                    mode="horizontal"
                                    @select="handleTabClick"
                                    background-color="#c4cfdb"
                                    text-color="#1b4673"
                                    active-text-color="#fff">
                                <el-menu-item index="1">基本信息</el-menu-item>
                                <el-menu-item index="2">企业投资</el-menu-item>
                                <el-menu-item index="3">法律风险</el-menu-item>
                                <el-menu-item index="4">经营风险</el-menu-item>
<!--                                <el-menu-item index="5">企业年报</el-menu-item>-->
                                <el-menu-item index="6">其他风险</el-menu-item>
                            </el-menu>
                        </div>
                        <div class="classifybox" >
                            <div class="classifyload" v-loading="dataload">
                                <div class="classify_content" v-if="tabActiveName==='1'" >
                                    <div class="registrationinfo">
                                        <div class="infocontent">
                                            <p>
                                                本报告的试用仅限于客户对目标公司的初步评估。本报告是基于公司认为可靠的数据撰写,上饶市中小微融资应用平台力求但不保证数据的完整性、真实性、时效性。本报告仅为您的决策提供参考,上饶市中小微融资应用平台不承担使用者的任何商业风险,同时上饶市中小微融资应用平台不保证文中观点或陈述不发生任何变更。
                                            </p>
                                            <p>
                                                本报告的生成依据是截止报告时间为止的企业征信数据库中的相关信息
                                            </p>
                                        </div>
                                        <h3>企业注册信息</h3>
                                        <div class="line"></div>
                                        <div class="registrationcontent basiccontent">
                                            <div>
                                                <ul>
                                                    <li>
                                                        <span class="registratname">*企业名称：</span>
                                                        <span>{{enterpriseData.registeredInfo.qymc}} </span>
                                                    </li>
                                                    <li>
                                                        <span class="registratname">*注册号：</span>
                                                        <span>{{enterpriseData.registeredInfo.zch}} </span>
                                                    </li>
                                                    <li>
                                                        <span class="registratname">*统一社会信用代码：</span>
                                                        <span>{{enterpriseData.registeredInfo.tyshxydm}} </span>
                                                    </li>
                                                    <li>
                                                        <span class="registratname">*经营状态：</span>
                                                        <span>{{enterpriseData.registeredInfo.qyzt}} </span>
                                                    </li>
                                                    <li>
                                                        <span class="registratname">*开业日期：</span>
                                                        <span>{{enterpriseData.registeredInfo.jyqxstart}} </span>
                                                    </li>

                                                    <li>
                                                        <span class="registratname">*登记机关：</span>
                                                        <span>{{enterpriseData.registeredInfo.djjg}} </span>
                                                    </li>
                                                    <li>
                                                        <span class="registratname">*国民经济行业名称（代码）：</span>
                                                        <span>{{enterpriseData.registeredInfo.hydm}} </span>
                                                    </li>

                                                </ul>
                                            </div>
                                            <div>
                                                <ul>
                                                    <li>
                                                        <span>*注册资本:</span>
                                                        <span>{{enterpriseData.registeredInfo.zczb}} </span>
                                                    </li>
                                                    <li>
                                                        <span>*原注册号:</span>
                                                        <span>{{enterpriseData.registeredInfo.jzch}}</span>
                                                    </li>
                                                    <li style="white-space:nowrap;">
                                                        <span>*企业（机构）类型:</span>
                                                        <span>{{enterpriseData.registeredInfo.qylx}} </span>
                                                    </li>
                                                    <li>
                                                        <span>*核准日期:</span>
                                                        <span>{{enterpriseData.registeredInfo.hzrq}} </span>
                                                    </li>
                                                    <li>
                                                        <span>*经营期限:</span>
                                                        <span>{{enterpriseData.registeredInfo.jyqxend}} </span>
                                                    </li>
                                                    <li>
                                                        <span>*注册地址:</span>
                                                        <span>{{enterpriseData.registeredInfo.jycs}} </span>
                                                    </li>
                                                    <li>
                                                        <span>*行业门类名称（代码）:</span>
                                                        <span>{{enterpriseData.registeredInfo.hyml}} </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <ul>
                                                    <li>
                                                        <span>*实收资本:</span>
                                                        <span>{{enterpriseData.registeredInfo.sszb}} </span>
                                                    </li>
                                                    <li>
                                                        <span>*法定代表人:</span>
                                                        <span>{{enterpriseData.registeredInfo.fddbr}} </span>
                                                    </li>
                                                    <li>
                                                        <span></span>
                                                        <span> </span>
                                                    </li>
                                                    <li>
                                                        <span></span>
                                                        <span> </span>
                                                    </li>
                                                    <li>
                                                        <span></span>
                                                        <span> </span>
                                                    </li>
                                                    <li>
                                                        <span></span>
                                                        <span> </span>
                                                    </li>
                                                    <li>
                                                        <span>*组织机构代码证信息:</span>
                                                        <span>{{enterpriseData.registeredInfo.ztbsm}} </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="jyspacal">
                                                <ul>
                                                    <li>
                                                        <span class="registratname">*经营（业务）范围：</span>
                                                        <span>{{enterpriseData.registeredInfo.xkjyxm}} </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>股东及出资</h3>
                                        <div class="line"></div>
                                        <p>股东的出资信息截止2019年12月12日，2019年12月12日之后工商只公示股东姓名，其他出资信息由企业自行公示。</p>
                                    </div>
                                    <div class="bodyTable currenttable" key="股东及出资">
                                        <el-table
                                                :data="enterpriseData.gdTable"
                                                border
                                                style="width: 100%;">
                                            <el-table-column
                                                    type="index"
                                                    align="center"
                                                    label="序号"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="tzr"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="股东名称"
                                                    width="260"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="czbl"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="出资比例"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="yje"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="认缴出资额"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="gb"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="国籍"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="czsj"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="日期"
                                            >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>主要人员</h3>
                                        <div class="line"></div>
                                    </div>
                                    <div class="bodyTable currenttable" key="主要人员">
                                        <el-table
                                                :data="enterpriseData.mainPeopleTable"
                                                border
                                                style="width: 100%;">
                                            <el-table-column
                                                    prop="xm"
                                                    :show-overflow-tooltip="true"
                                                    align="center"
                                                    label="姓名">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="zw"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="职位"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="xb"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="性别"
                                            >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>纳税情况</h3>
                                        <div class="line"></div>
                                        <p v-if="enterpriseData.nsqk.length===0">{{enterpriseData.nsxy}}</p>
                                    </div>
                                    <div class="bodyTable currenttable" key="纳税情况" v-if="enterpriseData.nsTable.length>0">
                                        <el-table
                                                :data="enterpriseData.nsTable"
                                                border
                                                style="width: 100%;">
<!--                                            <el-table-column-->
<!--                                                    prop="creditCode"-->
<!--                                                    :show-overflow-tooltip="true"-->
<!--                                                    align="center"-->
<!--                                                    label="统一社会信用代码"-->
<!--                                                    width="180">-->
<!--                                            </el-table-column>-->
<!--                                            <el-table-column-->
<!--                                                    prop="registerTime"-->
<!--                                                    align="center"-->
<!--                                                    :show-overflow-tooltip="true"-->
<!--                                                    label="税务登记时间"-->
<!--                                            >-->
<!--                                            </el-table-column>-->
                                            <el-table-column
                                                    prop="belonging"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="所属年月"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="taxPaid"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="已缴税额"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="zeroTaxDeclaration"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="纳税零申报"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="taxableSalesRevenue"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="应纳税销售收入"
                                                    width="160">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="taxPayable"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="应补退税额"
                                            >
                                            </el-table-column>

                                        </el-table>
                                    </div>
                                </div>
                                <div class="classify_content" v-if="tabActiveName==='2'" >
                                    <div class="registrationinfo textlist">
                                        <h3>对外投资</h3>
                                        <div class="line"></div>
                                        <p>{{riskList.dwtz}}</p>
                                    </div>
                                </div>
                                <div class="classify_content" v-if="tabActiveName==='3'" >
                                    <div class="registrationinfo textlist">
                                        <h3>开庭公告</h3>
                                        <div class="line"></div>
                                        <p>{{riskList.ktgg}}</p>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>裁判文书</h3>
                                        <div class="line"></div>
                                        <p>{{riskList.cpws}}</p>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>失信被执行人</h3>
                                        <div class="line"></div>
                                        <p>{{riskList.sx}}</p>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>被执行人</h3>
                                        <div class="line"></div>
                                        <p>{{riskList.bzxr}}</p>
                                    </div>
                                </div>
                                <div class="classify_content" v-if="tabActiveName==='4'" >

                                    <div class="registrationinfo textlist">
                                        <h3>行政处罚</h3>
                                        <div class="line"></div>
                                        <p>{{riskList.xzcf}}</p>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>股权冻结</h3>
                                        <div class="line"></div>
                                        <p>{{riskList.gqdj}}</p>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>股权出资</h3>
                                        <div class="line"></div>
                                        <p>{{riskList.gqcz}}</p>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>动产抵押</h3>
                                        <div class="line"></div>
                                        <p>{{riskList.dcdy}}</p>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>动产抵押物</h3>
                                        <div class="line"></div>
                                        <p>{{riskList.dyw}}</p>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>经营异常</h3>
                                        <div class="line"></div>
                                        <p>{{riskList.jyyc}}</p>
                                    </div>
                                </div>
<!--                                <div class="classify_content" v-if="tabActiveName==='5'" >-->
<!--                                    <div class="registrationinfo">-->
<!--                                        <h3>企业基本信息</h3>-->
<!--                                        <div class="line"></div>-->
<!--                                        <div class="registrationcontent">-->
<!--                                            <div>-->
<!--                                                <ul>-->
<!--                                                    <li>-->
<!--                                                        <span class="registratname">注册号：</span>-->
<!--                                                        <span>{{annualInfo.basisInfo.zch}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->

<!--                                                        <span class="registratname">企业联系电话：</span>-->
<!--                                                        <span>{{annualInfo.basisInfo.lxdh}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->

<!--                                                        <span class="registratname">企业通信地址：</span>-->
<!--                                                        <span>{{annualInfo.basisInfo.zs}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->

<!--                                                        <span class="registratname">电子邮箱：</span>-->
<!--                                                        <span>{{annualInfo.basisInfo.dzyj}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->
<!--                                                        <span class="registratname">企业经营状态：</span>-->
<!--                                                        <span>{{annualInfo.basisInfo.qyzt}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->
<!--                                                        <span class="registratname">企业是否有投资信息或购买其他公司股权：</span>-->
<!--                                                        <span>{{annualInfo.basisInfo.tz}} </span>-->
<!--                                                    </li>-->
<!--                                                </ul>-->
<!--                                            </div>-->
<!--                                            <div>-->
<!--                                                <ul>-->
<!--                                                    <li>-->
<!--                                                        <span class="registratname">企业名称：</span>-->
<!--                                                        <span>{{annualInfo.basisInfo.qymc}}  </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->

<!--                                                        <span class="registratname">邮政编码：</span>-->
<!--                                                        <span>{{annualInfo.basisInfo.yzbm}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->

<!--                                                        <span class="registratname">有限责任公司本年度是否发生股东股权转让：</span>-->
<!--                                                        <span>{{annualInfo.basisInfo.bgcs}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->

<!--                                                        <span class="registratname">是否有网站或网店：</span>-->
<!--                                                        <span>{{annualInfo.basisInfo.wz}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->

<!--                                                        <span class="registratname">从业人数：</span>-->
<!--                                                        <span>{{annualInfo.basisInfo.cyrs}} </span>-->
<!--                                                    </li>-->
<!--                                                </ul>-->
<!--                                            </div>-->
<!--                                            <div></div>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    <div class="registrationinfo textlist">-->
<!--                                        <h3>网站或网店信息</h3>-->
<!--                                        <div class="line"></div>-->
<!--                                        <p>{{annualInfo.siteTable}}</p>-->
<!--                                    </div>-->
<!--                                    <div class="registrationinfo textlist">-->
<!--                                        <h3>股东及出资信息</h3>-->
<!--                                        <div class="line"></div>-->
<!--                                    </div>-->
<!--                                    <div class="bodyTable currenttable" key="股东及出资信息">-->
<!--                                        <el-table-->
<!--                                                :data="annualInfo.shareholdersTable"-->
<!--                                                border-->
<!--                                                style="width: 100%;">-->
<!--                                            <el-table-column-->
<!--                                                    prop="tzr"-->
<!--                                                    :show-overflow-tooltip="true"-->
<!--                                                    align="center"-->
<!--                                                    label="股东名称"-->
<!--                                            >-->
<!--                                            </el-table-column   >-->
<!--                                            <el-table-column-->
<!--                                                    prop="yje"-->
<!--                                                    align="center"-->
<!--                                                    :show-overflow-tooltip="true"-->
<!--                                                    label="认缴出资额"-->
<!--                                            >-->
<!--                                            </el-table-column>-->
<!--                                            <el-table-column-->
<!--                                                    prop="czsj"-->
<!--                                                    align="center"-->
<!--                                                    :show-overflow-tooltip="true"-->
<!--                                                    label="认缴出资时间"-->
<!--                                            >-->
<!--                                            </el-table-column>-->
<!--                                            <el-table-column-->
<!--                                                    prop="sje"-->
<!--                                                    align="center"-->
<!--                                                    :show-overflow-tooltip="true"-->
<!--                                                    label="实缴出资额"-->
<!--                                            >-->
<!--                                            </el-table-column>-->

<!--                                            <el-table-column-->
<!--                                                    prop="sjsj"-->
<!--                                                    align="center"-->
<!--                                                    :show-overflow-tooltip="true"-->
<!--                                                    label="实缴出资时间"-->
<!--                                            >-->
<!--                                            </el-table-column>-->
<!--                                            <el-table-column-->
<!--                                                    prop="czfs"-->
<!--                                                    align="center"-->
<!--                                                    :show-overflow-tooltip="true"-->
<!--                                                    label="出资方式"-->
<!--                                            >-->
<!--                                            </el-table-column>-->
<!--                                        </el-table>-->
<!--                                    </div>-->
<!--                                    <div class="registrationinfo textlist">-->
<!--                                        <h3>对外投资信息</h3>-->
<!--                                        <div class="line"></div>-->
<!--                                        <p>{{annualInfo.dwtz}}</p>-->
<!--                                    </div>-->
<!--                                    <div class="registrationinfo">-->
<!--                                        <h3>企业资产状况信息</h3>-->
<!--                                        <div class="line"></div>-->
<!--                                        <div class="registrationcontent">-->
<!--                                            <div>-->

<!--                                                <ul>-->
<!--                                                    <li>-->
<!--                                                        <span class="registratname">资产总额：</span>-->
<!--                                                        <span>{{annualInfo.BalanceSheets.zcze}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->

<!--                                                        <span class="registratname">营业总收入：</span>-->
<!--                                                        <span>{{annualInfo.BalanceSheets.zsr}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->

<!--                                                        <span class="registratname">营业总收入中主营业务收入：</span>-->
<!--                                                        <span>{{annualInfo.BalanceSheets.ywsr}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->

<!--                                                        <span class="registratname">纳税总额：</span>-->
<!--                                                        <span>{{annualInfo.BalanceSheets.nsze}} </span>-->
<!--                                                    </li>-->
<!--                                                </ul>-->
<!--                                            </div>-->
<!--                                            <div>-->
<!--                                                <ul>-->
<!--                                                    <li>-->
<!--                                                        <span class="registratname">所有者权益合计：</span>-->
<!--                                                        <span>{{annualInfo.BalanceSheets.qyhj}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->

<!--                                                        <span class="registratname">利润总额：</span>-->
<!--                                                        <span>{{annualInfo.BalanceSheets.lrze}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->

<!--                                                        <span class="registratname">净利润：</span>-->
<!--                                                        <span>{{annualInfo.BalanceSheets.jlr}} </span>-->
<!--                                                    </li>-->
<!--                                                    <li>-->

<!--                                                        <span class="registratname">负债总额：</span>-->
<!--                                                        <span>{{annualInfo.BalanceSheets.fzze}} </span>-->
<!--                                                    </li>-->
<!--                                                </ul>-->
<!--                                            </div>-->
<!--                                            <div></div>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    <div class="registrationinfo textlist">-->
<!--                                        <h3>对外提供保证担保信息</h3>-->
<!--                                        <div class="line"></div>-->
<!--                                        <p>{{annualInfo.bzdb}}</p>-->
<!--                                    </div>-->
<!--                                    <div class="registrationinfo textlist">-->
<!--                                        <h3>股权变更信息</h3>-->
<!--                                        <div class="line"></div>-->
<!--                                        <p v-if="annualInfo.databg.length===0">{{annualInfo.gqbg}}</p>-->
<!--                                    </div>-->
<!--                                    <div class="bodyTable currenttable" key="3" v-if="annualInfo.databg.length>0">-->
<!--                                        <el-table-->
<!--                                                :data="annualInfo.databg"-->
<!--                                                border-->
<!--                                                style="width: 100%;">-->
<!--                                            <el-table-column-->
<!--                                                    type=""-->
<!--                                                    prop="tzr"-->
<!--                                                    :show-overflow-tooltip="true"-->
<!--                                                    align="center"-->
<!--                                                    label="投资人"-->
<!--                                            >-->
<!--                                            </el-table-column>-->
<!--                                            <el-table-column-->
<!--                                                    prop="czbl"-->
<!--                                                    align="center"-->
<!--                                                    :show-overflow-tooltip="true"-->
<!--                                                    label="出资比率"-->
<!--                                            >-->
<!--                                            </el-table-column>-->
<!--                                            <el-table-column-->
<!--                                                    prop="yje"-->
<!--                                                    align="center"-->
<!--                                                    :show-overflow-tooltip="true"-->
<!--                                                    label="金额"-->
<!--                                            >-->
<!--                                            </el-table-column>-->
<!--                                            <el-table-column-->
<!--                                                    prop="czsj"-->
<!--                                                    align="center"-->
<!--                                                    :show-overflow-tooltip="true"-->
<!--                                                    label="出资时间"-->
<!--                                            >-->
<!--                                            </el-table-column>-->
<!--                                        </el-table>-->
<!--                                    </div>-->
<!--                                    <div class="registrationinfo textlist">-->
<!--                                        <h3>修改记录</h3>-->
<!--                                        <div class="line"></div>-->
<!--                                        <p>{{annualInfo.xgjl}}</p>-->
<!--                                    </div>-->
<!--                                </div>-->
                                <div class="classify_content" v-if="tabActiveName==='6'" >
                                    <div class="registrationinfo textlist" >
                                        <div class="infocontent">
                                            <p>
                                                本报告的试用仅限于客户对目标公司的初步评估。本报告是基于公司认为可靠的数据撰写,上饶市中小微融资应用平台力求但不保证数据的完整性、真实性、时效性。本报告仅为您的决策提供参考,上饶市中小微融资应用平台不承担使用者的任何商业风险,同时上饶市中小微融资应用平台不保证文中观点或陈述不发生任何变更。
                                            </p>
                                            <p>
                                                本报告的生成依据是截止报告时间为止的企业征信数据库中的相关信息
                                            </p>
                                        </div>
                                        <h3>发改委失信认证信息</h3>
                                        <div class="line"></div>
                                        <p v-if="otherRisk.fgw.length===0">截止{{timeNoDta}},未查询到XXXXXXXX公司相关信息</p>
                                    </div>
                                    <div class="bodyTable currenttable" key="发改委失信认证信息"  v-if="otherRisk.fgw.length>0">
                                        <el-table
                                                :data="otherRisk.fgw"
                                                border
                                                style="width: 100%;">
                                            <el-table-column
                                                    prop="enterpriseName"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="企业中文名称"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="organizationCode"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="组织机构代码"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="firstRegistrationDate"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="首次注册日期"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="creditRating"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="信用等级"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="gradeIdentificationDate"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="等级认定时间"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="legalRepresentative"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="法人代表"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="registerAddress"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="注册地址"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="industryCategory"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="行业种类"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="signOff"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="注销标志"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="unifiedSocialCreditCode"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="统一社会信用代码"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="cognizanceDate"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="认定时间"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="status"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="工商吊销信息"
                                            >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>市用电风险信息</h3>
                                        <div class="line"></div>
                                        <p v-if="otherRisk.gw.length===0"> 截止{{timeNoDta}},未查询到XXXXXXXX公司相关信息</p>
                                    </div>
                                    <div class="bodyTable currenttable" key="市用电风险信息"  v-if="otherRisk.gw.length>0">
                                        <el-table
                                                :data="otherRisk.gw"
                                                border
                                                style="width: 100%;">
                                            <el-table-column
                                                    prop="name"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="单位名称"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="accountNumber"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="户号"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="customerName"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="客户名称"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="address"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="用电地址"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="label"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="标签名称"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="explains"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="命中说明"
                                            >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>市燃气信息</h3>
                                        <div class="line"></div>
                                        <p v-if="otherRisk.rq.length===0">截止{{timeNoDta}},未查询到XXXXXXXX公司相关信息</p>
                                    </div>
                                    <div class="bodyTable currenttable" key="市燃气信息"  v-if="otherRisk.rq.length>0">
                                        <el-table
                                                :data="otherRisk.rq"
                                                border
                                                style="width: 100%;">
                                            <el-table-column
                                                    prop="accountNumber"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="户号"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="accountName"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="户名"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="address"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="用气地址"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="address"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="用电地址"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="purchaseVolume"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="购气量"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="moneys"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="实收金额"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="tel"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="联系电话"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="chargeTime"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="收费时间"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="idno"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="身份证号码"
                                            >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>市自来水公司信息</h3>
                                        <div class="line"></div>
                                        <p v-if="otherRisk.zls.length===0">截止{{timeNoDta}},未查询到XXXXXXXX公司相关信息</p>
                                    </div>
                                    <div class="bodyTable currenttable" key="市自来水公司信息"  v-if="otherRisk.zls.length>0">
                                        <el-table
                                                :data="otherRisk.zls"
                                                border
                                                style="width: 100%;">
                                            <el-table-column
                                                    prop="accountNumber"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="户号"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="accountName"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="户名"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="address"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="地址"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="currentState"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="当前状态"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="writeOffIdentification"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="销账标志"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="meterReadingDate"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="抄表日期"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="writeOffDate"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="销账日期"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="waterQuantity"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="水量"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="money"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="金额"
                                            >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>市税务局信息</h3>
                                        <div class="line"></div>
                                        <p v-if="otherRisk.sw.length===0">截止{{timeNoDta}},未查询到XXXXXXXX公司相关信息</p>
                                    </div>
                                    <div class="bodyTable currenttable" key="市税务局信息"  v-if="otherRisk.sw.length>0">
                                        <el-table
                                                :data="otherRisk.sw"
                                                border
                                                style="width: 100%;">
                                            <!--                                                <el-table-column-->
                                            <!--                                                        prop="creditCode"-->
                                            <!--                                                        align="center"-->
                                            <!--                                                        :show-overflow-tooltip="true"-->
                                            <!--                                                        label="统一社会信用代码"-->
                                            <!--                                                >-->
                                            <!--                                                </el-table-column>-->
                                            <!--                                                <el-table-column-->
                                            <!--                                                        prop="registerTime"-->
                                            <!--                                                        align="center"-->
                                            <!--                                                        :show-overflow-tooltip="true"-->
                                            <!--                                                        label="税务登记时间"-->
                                            <!--                                                >-->
                                            <!--                                                </el-table-column>-->
                                            <el-table-column
                                                    prop="belonging"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="所属年月"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="taxPaid"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="已缴税额"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="zeroTaxDeclaration"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="纳税零申报"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="taxableSalesRevenue"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="应纳税销售收入"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="taxPayable"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="应补退税额"
                                            >
                                            </el-table-column>

                                        </el-table>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>市医保局信息</h3>
                                        <div class="line"></div>
                                        <p v-if="otherRisk.yb.length===0">截止{{timeNoDta}},未查询到XXXXXXXX公司相关信息</p>
                                    </div>
                                    <div class="bodyTable currenttable" key="市医保局信息"  v-if="otherRisk.yb.length>0">
                                        <el-table
                                                :data="otherRisk.yb"
                                                border
                                                style="width: 100%;">
                                            <el-table-column
                                                    prop="unitName"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="单位名称"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="workersNumber"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="职工平均人数"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="retireNumber"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="退休平均人数"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="wages"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="工资总额"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="retireMoney"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="退休金总额"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="receivable"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="应收合计"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="paidIn"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="实缴合计"
                                            >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>市中级人民法院信息（失信被执行机构）</h3>
                                        <div class="line"></div>
                                        <p v-if="otherRisk.jg.length===0">截止{{timeNoDta}},未查询到XXXXXXXX公司相关信息</p>

                                    </div>
                                    <div class="bodyTable currenttable" key="市中级人民法院信息"  v-if="otherRisk.jg.length>0">
                                        <el-table
                                                :data="otherRisk.jg"
                                                border
                                                style="width: 100%;">
                                            <el-table-column
                                                    prop="name"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="名称"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="organizationCode"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="组织机构代码"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="businessRegistrationNumber"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="工商注册号"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="unifiedSocialCreditCode"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="统一社会信用代码"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="legalPersonName"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="法定代表人姓名"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="legalPersonNumber"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="法定代表人证件号码"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="caseNumbers"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="执行案号"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="courts"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="执行法院"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="filingCaseDate"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="立案日期"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="caseStatus"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="案件状态"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="executionNumbers"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="执行依据文号"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="causeAction"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="执行案由"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="obligations"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="法律文书确定的义务"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="performance"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="被执行人履行情况"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="dishonesty"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="被执行人失信情形"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="eventCode"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="事项代码"
                                            >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>市中级人民法院信息（失信被执行自然人）</h3>
                                        <div class="line"></div>
                                        <p v-if="otherRisk.zrr.length===0">截止{{timeNoDta}},未查询到XXXXXXXX公司相关信息</p>
                                    </div>
                                    <div class="bodyTable currenttable" key="失信被执行自然人" v-if="otherRisk.zrr.length>0">
                                        <el-table
                                                :data="otherRisk.zrr"
                                                border
                                                style="width: 100%;">
                                            <el-table-column
                                                    prop="name"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="姓名"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="documentType"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="证件类型"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="documentNumber"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="证件号码"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="sex"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="性别"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="age"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="年龄"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="executionCaseNo"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="执行案号"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="executionCourt"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="执行法院"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="filingDate"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="立案日期"
                                            >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>市住房公积金信息（单位账户基本信息）</h3>
                                        <div class="line"></div>
                                        <p v-if="otherRisk.gjj.length===0">截止{{timeNoDta}},未查询到XXXXXXXX公司相关信息</p>
                                    </div>
                                    <div class="bodyTable currenttable" key="单位账户基本信息"  v-if="otherRisk.gjj.length>0">
                                        <el-table
                                                :data="otherRisk.gjj"
                                                border
                                                style="width: 100%;">
                                            <el-table-column
                                                    prop="unitAccountNumber"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="单位账号"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="unitName"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="单位名称"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="unitNature"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="单位性质"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="organizationCode"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="组织机构代码"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="countyCode"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="所属区县代码"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="industryCode"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="所属行业代码"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="depositorsNumber"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="单位缴存人数"
                                            >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>市住房公积金信息（单位本年度总账信息）</h3>
                                        <div class="line"></div>
                                        <p v-if="otherRisk.zz.length===0">截止{{timeNoDta}},未查询到XXXXXXXX公司相关信息</p>
                                    </div>
                                    <div class="bodyTable currenttable" key="单位本年度总账信息"  v-if="otherRisk.zz.length>0">
                                        <el-table
                                                :data="otherRisk.zz"
                                                border
                                                style="width: 100%;">

                                            <el-table-column
                                                    prop="companyAccountNumber"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="单位账号"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="companyName"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="单位名称"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="payment"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="本年汇补缴额"
                                            >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="registrationinfo textlist">
                                        <h3>市住房公积金信息（单位汇缴核定信息）</h3>
                                        <div class="line"></div>
                                        <p v-if="otherRisk.hj.length===0">截止{{timeNoDta}},未查询到XXXXXXXX公司相关信息</p>
                                    </div>
                                    <div class="bodyTable currenttable" key="单位汇缴核定信息"  v-if="otherRisk.hj.length>0">
                                        <el-table
                                                :data="otherRisk.hj"
                                                border
                                                style="width: 100%;">
                                            <el-table-column
                                                    prop="companyAccountNumber"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="单位账号"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="companyName"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="单位名称"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="remittanceNature"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="汇缴性质"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="remittanceMoney"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="本月汇缴金额"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="remittanceNumber"
                                                    align="center"
                                                    :show-overflow-tooltip="true"
                                                    label="本月汇缴人数"
                                            >
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                    v-model="getAlertbox"
                    title="法人或投资人对外投资情况"
                    class-name="alertBoxmodel"
            >
                <Table border :columns="columnsTitle" :data="tableDatalist"  :loading="alertboxload" height="380"
                ></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    /**
     @author xiaoye
     @date 2020/8/18 6:11 下午
     */
    import {
        GetEnterPriseInfoJX,
        GetEnterpriseInfo,
        GetEnterpriseRisk,
        GetEnterpAnnualReport,
        GetEnterpOtherRisks,
        GetInvestorInfo
    } from '@/api/report/company'
    import './element'
    import 'element-ui/lib/theme-chalk/index.css';
    export default {
        name: 'companyDetil',
        components: {},
        props: {
            name: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                //
                alertboxload:true,
                // 姓名、职务、公司名称
                columnsTitle: [
                    {
                        title: '企业名称',
                        key: 'qymc',
                        align:"center",
                        width: 80,
                    },
                    {
                        title: '股东名称',
                        key: 'tzr',
                        align:"center",
                    },
                    {
                        title: '企业状态',
                        key: 'qyzt',
                        align:"center",
                    },
                    {
                        title: '统一社会信用代码',
                        key: 'tyshxydm',
                        width: 150,
                        align:"center",
                    },
                    {
                        title: '出资比例',
                        key: 'czbl',
                        align:"center",
                    },
                    {
                        title: '认缴出资额',
                        key: 'yje',
                        width: 90,
                        align:"center",
                    },
                    {
                        title: '出资日期',
                        key: 'czsj',
                        align:"center",
                    }
                ],
                tableDatalist: [],
                //
                tabActiveName: '1',
                //弹框出现
                getAlertbox:false,
                timeNoDta:'',
                //
                companyload:true,
                //数据加载
                dataload:true,
                //企业信息
                enterpriseInfo:{},
                //获取企业基本信息
                enterpriseData:{
                    registeredInfo: {},//基础信息
                    gdTable:[],//股东出资
                    mainPeopleTable:[],
                    nsTable:[],
                    nsqk:[],
                    nsxy:''
                },
                //风险集合
                riskList: {},
                businessInvestment:[],
                managementRisks:[],
                //获取企业年报信息
                annualInfo: {
                    basisInfo: {},//基础信息
                    siteTable:'',//网站或网店信息
                    shareholdersTable:[],//股东及出资信息
                    dwtz:'',//对外投资信息
                    BalanceSheets: {},//企业资产状况信息
                    bzdb:'',//对外提供保证担保信息
                    databg:[], //DATABG股权变更表格数据
                    gqbg:'',//DATABG股权变变更信息
                    xgjl:'',//修改记录
                },
                // 其他风险
                otherRisk:{
                    fgw:[],//发改委失信认证信息,
                    gw:[],//市用电风险信息,
                    rq:[],//市燃气信息,
                    zls:[],// 市自来水公司信息,
                    sw:[],//市税务局信息,
                    yb:[],//市医保局信息,
                    jg:[],//市中级人民法院信息（失信被执行机构）,
                    zrr:[],//市中级人民法院信息（失信被执行自然人）,
                    gjj:[],//市住房公积金信息（单位账户基本信息）,
                    zz:[],//市住房公积金信息（单位本年度总账信息）,
                    hj:[],//市住房公积金信息（单位汇缴核定信息）}
                },
            }
        },
        methods: {
            getNOdataTime(){
                let datetime = new Date();
                let year = datetime.getFullYear();
                let month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
                let date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
                this.timeNoDta = year+'年'+month+'月'+date+'日';
            },
            //获取企业信息
            getEnterPriseInfoJX(){
                GetEnterPriseInfoJX({
                    parameter:this.$route.query.parameter
                }).then(res=>{
                    if(res.code===200){
                        this.companyload=false;
                        if(res.data===null){
                            this.enterpriseInfo= {};
                        }else{
                            this.enterpriseInfo=res.data.dataTable[0];
                            this.enterpriseInfo.clrq = this.enterpriseInfo.clrq.substring(0,10)
                            if(res.data.dataTable[0].tyshxydm ===''){
                                this.enterpriseInfo.tyshxydm = res.data.dataTable[0].zch;
                            }
                        }
                    }
                })
            },
            //获取企业基本信息
            getEnterpriseInfo(){
                GetEnterpriseInfo({
                    parameter:this.$route.query.parameter
                }).then(res=>{
                    if(res.code===200){
                        console.log(res.data,'=====')
                        this.enterpriseData.registeredInfo=res.data.info[0];
                        this.enterpriseData.gdTable=res.data.gdcz;
                        if(this.enterpriseData.gdTable){
                            this.enterpriseData.gdTable.map(item=>{
                                if(item.yje >= 0 && item.yje){
                                    item.yje = item.yje+'万元';
                                }
                                if(item.czbl >= 0 && item.czbl){
                                    item.czbl = item.czbl+'%';
                                }
                            })
                        }
                        this.enterpriseData.mainPeopleTable=res.data.zyry;
                        this.enterpriseData.nsTable=res.data.nsqk;
                        this.enterpriseData.nsxy=res.data.nsxy;
                        if(this.enterpriseData.registeredInfo.sszb>=0 && this.enterpriseData.registeredInfo.sszb){
                            this.enterpriseData.registeredInfo.sszb = this.enterpriseData.registeredInfo.sszb+'万元';
                        }
                        if(this.enterpriseData.registeredInfo.zczb>=0 && this.enterpriseData.registeredInfo.zczb){
                            this.enterpriseData.registeredInfo.zczb = this.enterpriseData.registeredInfo.zczb+'万元';
                        }
                        if(this.enterpriseData.registeredInfo.jyqxstart){
                            this.enterpriseData.registeredInfo.jyqxstart = res.data.info[0].jyqxstart.substring(0,10);
                            this.enterpriseData.registeredInfo.hzrq = res.data.info[0].hzrq.substring(0,10);
                        }
                    }
                })
            },
            //获取企业风险信息
            getEnterpriseRisk(){
                GetEnterpriseRisk({
                    parameter:this.$route.query.parameter
                }).then(res=>{
                    if(res.code===200){
                        this.riskList = res.data;
                    }
                })
            },
            //获取企业年报信息
            getEnterpAnnualReport(){
                GetEnterpAnnualReport({
                    parameter:this.$route.query.parameter
                }).then(res=>{
                    if(res.code===200){
                        this.annualInfo.basisInfo = res.data.jbxx[0];
                        this.annualInfo.siteTable = res.data.wzxx;
                        this.annualInfo.shareholdersTable = res.data.gdcz;
                        this.annualInfo.shareholdersTable.map(item=>{
                            if(item.yje >= 0 && item.yje){
                                item.yje= item.yje+'万元';
                            }
                            if(item.sje >= 0 && item.sje){
                                item.sje= item.sje+'万元';
                            }
                        })
                        this.annualInfo.dwtz =res.data.dwtz;
                        this.annualInfo.BalanceSheets =res.data.qyzc;
                        this.annualInfo.bzdb = res.data.bzdb;
                        this.annualInfo.databg = res.data.databg;
                        this.annualInfo.gqbg= res.data.gqbg;
                        this.annualInfo.xgjl = res.data.xgjl;
                    }
                })
            },
            //获取其他风险信息
            getEnterpOtherRisks(){
                GetEnterpOtherRisks({
                    parameter:this.$route.query.parameter
                }).then(res=>{
                    if(res.code===200){
                        this.otherRisk=res.data;
                        this.dataload = false;
                    }
                })
            },
            // 获取法人或投资人其他企业信息
            getInvestorInfo(parameter,QYID){
                this.getAlertbox=true;
                GetInvestorInfo({
                    parameter:parameter,
                    QYID:QYID
                }).then(res=>{
                    if(res.code===200){
                        this.alertboxload=false;
                        this.tableDatalist=res.data.dataTable;
                        this.tableDatalist.map(item=>{
                            if(item.yje >= 0 && item.yje){
                                item.yje = item.yje+'万元';
                            }
                            if(item.czbl >= 0 && item.czbl){
                                item.czbl = item.czbl+'%';
                            }
                            if(item.czsj){
                                var timearr = item.czsj.replace(" ", ":").replace(/\:/g, "-").split("-");
                                item.czsj=timearr[0];
                            }
                        })
                    }else if(res.code===500){
                        GetInvestorInfo({
                            parameter:parameter,
                            QYID:QYID
                        }).then(res=> {
                            console.log(res,'=====222')
                        })
                    }
                })
            },
            handleTabClick(tab, event) {
                this.tabActiveName=tab;
                switch(this.tabActiveName){
                    case 1 :
                        this.getEnterpriseInfo();
                        break;
                    case 2 :
                        this.getEnterpriseRisk();
                        break;
                    case 3 :
                        this.getEnterpriseRisk();
                        break;
                    case 4 :
                        this.getEnterpriseRisk();
                        break;
                    case 5 :
                        this.getEnterpAnnualReport();
                        break;
                    case 6 :
                        this.getEnterpOtherRisks();
                        break;
                    default :
                        this.getEnterpriseInfo();
                    break;
                }
            }

        },
        mounted() {
            this.getNOdataTime();
            this.getEnterPriseInfoJX();
            this.getEnterpriseInfo();
            this.getEnterpriseRisk();
            // this.getEnterpAnnualReport();
            this.getEnterpOtherRisks();
        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    //黄色
    @yellow: #c39f6f;
    //蓝色
    @blue: rgba(27, 70, 115, 1);
    .companyDetil {
        height: 100%;
        font-size: 14px;
        color:#666666;
        background: #eee!important;
        .companyDetilbox{
            height: 100%;
            .companyDetilhead {
                width: 100%;
                height: 80px;
                background-color: #fff;
                .head_left {
                    width:1000px;
                    height: 100%;
                    margin: 0 auto;
                    line-height: 80px;
                    .hLogo {
                        width: 35px;
                        height: 35px;
                        display: inline-block;
                        background: url("./img/logo.png");
                        background-size: 100% 100%;
                        margin-right: 10px;
                        vertical-align: middle;
                    }
                    > span {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 30px;
                        font-weight: bold;
                        color: #666666;

                    }
                }
            }
            .companyDetil_content{
                width: 1000px;
                margin: 0 auto;
                height:calc(~'100% - 80px');
                padding-top: 40px;
                overflow-y: scroll;
                &::-webkit-scrollbar {
                    display: none; /* Chrome Safari */
                }
                .companyDetil_child{
                    height: 100%;
                }
                /*企业基本信息*/
                .companyinfo{
                    height: 152px;
                    background-color: #ffffff;
                    box-shadow: 5px 6px 25px 3px rgba(209, 209, 209, 0.5);
                    padding:20px;
                    .enterprisetitle{
                        >h3{
                            font-size: 20px;
                            display: inline-block;
                        }
                        div{
                            display: inline-block;
                            background-color: #c39f6f;
                            border-radius: 4px;
                            color: #fff;
                            font-size: 14px;
                            padding: 5px 8px;
                            margin-left: 8px;
                        }
                    }
                    .enterprisecontent{
                        padding-top:20px;

                        ul{
                            li{
                                width: 50%;
                                display: inline-block;
                                i{
                                    color:rgba(27, 70, 115,0.8);
                                    font-size: 16px;
                                    vertical-align: middle;
                                }
                                p{
                                    display: inline-block;
                                    vertical-align: middle;
                                    margin-left: 8px;
                                    .infoname{
                                        font-size: 14px;
                                        font-weight: bold;
                                        color: rgba(153, 153, 153, 1);
                                    }
                                    .infovalue{
                                        font-size: 14px;
                                        font-weight: bold;
                                        color: rgba(27, 70, 115, 0.8);
                                    }

                                }
                                .alertName{
                                    cursor: pointer;
                                }
                            }
                            &:last-child{
                                margin-top:20px;
                            }
                        }
                    }

                }
                /**/
                .companyinfo_classify{
                    padding-top:40px;
                    padding-bottom: 20px;
                    height: calc(~'100% - 152px');
                    /*分类导航*/
                    .classifynav{
                        .el-menu{
                            font-weight: bold;
                            display: flex;
                            justify-content:  space-between ;
                            .el-menu-item{
                                font-size: 18px;
                                font-weight: bold;
                                &.is-active{
                                    background: @blue!important;
                                    border-bottom: none;
                                }

                            }
                        }

                    }
                    .classifybox{
                        height: calc(~'100% - 60px');
                        background: #fff;
                        padding-bottom: 20px;
                        .classifyload{
                            min-height: 300px;
                        }
                    }
                    .classify_content{
                        background: #fff;
                        .instruction{
                            display: block;
                            padding:20px 0;
                            color: #c80000;
                            font-weight: bold;
                        }
                        .registrationinfo{
                            padding:20px;
                            .infocontent{
                                padding-bottom: 10px;
                                p{
                                    text-indent:2em;
                                    color: #000;
                                }
                            }
                            h3{
                                font-size: 14px;
                                color:#333;
                            }
                            .line{
                                width: 42px;
                                height: 3px;
                                background-color: #1b4673;
                                border-radius: 1px;
                                margin-top:8px;
                            }
                            .registrationcontent{

                                div{
                                    display: inline-block;
                                    width: 50%;
                                    height: 100%;
                                    vertical-align: top;
                                    ul{
                                        li{
                                            margin-top: 20px;
                                            /*overflow: hidden;*/
                                            /*text-overflow: ellipsis;*/
                                            /*white-space: nowrap;*/
                                            >i{
                                                font-style:normal;
                                                font-size: 20px;
                                                vertical-align: bottom;
                                                display: inline-block;
                                            }
                                            >span{
                                                vertical-align: bottom;
                                                display: inline-block;
                                                font-weight: bold;
                                                color: #666;

                                                &.registratname{
                                                    padding: 0 4px;
                                                }
                                            }

                                        }
                                    }
                                }
                                &.basiccontent{
                                    >div{
                                        display: inline-block;
                                        vertical-align: top;
                                        width:calc(~'100% / 3');
                                        &.jyspacal{
                                            width: 100%;
                                            line-height: 28px;
                                            min-height: 30px;
                                            ul{
                                                li{
                                                    span{
                                                        display: inline-block;
                                                        vertical-align: top;
                                                        height: 100%;
                                                        &:first-child{
                                                            width: 150px;
                                                        }
                                                        &:last-child{
                                                            width: calc(~'100% - 150px');
                                                        }
                                                    }
                                                }
                                            }

                                        }
                                    }

                                }
                            }
                            &.textlist{
                                padding-bottom: 0;
                                >p{
                                    margin-top: 14px;
                                }
                            }
                        }
                    }
                    .currenttable{
                        padding:20px 0;
                        .el-table {
                            .el-table__header-wrapper {
                                tr {
                                    th{
                                        border-right:none;
                                        background: @yellow;
                                        .cell{
                                            color: #fff;
                                            border-left: 1px solid #fff;
                                        }
                                        &:first-child{
                                            .cell{
                                                border-left:none;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                }


            }
        }
    }
    .alertBoxmodel{
        z-index:2001!important;
        .ivu-modal{
            width: 700px!important;
            .ivu-modal-body{
                height: 420px;
            }
        }
    }
    .ivu-modal-mask{
        z-index:2001!important;
    }
</style>
