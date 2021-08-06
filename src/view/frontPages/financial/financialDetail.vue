<template>
    <div class="financialDetail">
        <qNav :isNoShow="true"></qNav>
        <div class="financialDetailBody">
            <div class="com_center">
                <div class="detailUl">
                    <ul class="detailUl_til">
                        <li class="li01">
                            <img :src="require('../bankImg/'+getBankImg(details.bank_ZH))">
                            <span class="til">{{details.productName}}</span>
                            <span class="blackTil">{{details.bank}}</span>
                        </li>
                        <li class="keyValue li02">
                            <span class="key">
                            {{details.interestRate_min + '%'}}{{details.interestRate_max!==details.interestRate_min?('~'+details.interestRate_max+'%'):''}}</span>
                            <span class="value">参考利率</span>
                        </li>
                        <li class="keyValue li03">
                            <span class="key">{{details.quota}}万元及以下</span>
                            <span class="value">贷款额度</span>
                        </li>
                        <li class="keyValue li04">
                            <span class="key">{{details.dbfs}}</span>
                            <span class="value">担保方式</span>
                        </li>
                        <li class="keyValue li05">
                            <span class="key">{{details.dkqx}}{{details.dkqX_Unit}}及以下</span>
                            <span class="value">贷款期限</span>
                        </li>
                    </ul>
                    <ul class="detailUl_product">
                        <li>
                            <div class="li_left">
                                <img src="./img/icon5.jpg">
                            </div>
                            <div class="li_right">
                                <p class="div_til">产品介绍</p>
                                <p class="div_content">
                                    {{details.introduce}}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="li_left">
                                <img src="./img/icon3.jpg">
                            </div>
                            <div class="li_right">
                                <p class="div_til">产品特点</p>
                                <p class="div_content">
                                    {{details.characteristic}}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="li_left">
                                <img src="./img/icon4.jpg">
                            </div>
                            <div class="li_right">
                                <p class="div_til">适用客户</p>
                                <p class="div_content">
                                    {{details.sykh}}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="li_left">
                                <img src="./img/icon2.jpg">
                            </div>
                            <div class="li_right">
                                <p class="div_til">申请条件</p>
                                <p class="div_content">
                                    {{details.sqtj}}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="li_left">
                                <img src="./img/icon1.jpg">
                            </div>
                            <div class="li_right">
                                <p class="div_til">申请材料</p>
                                <p class="div_content">
                                    {{details.sqcl}}
                                </p>
                            </div>
                        </li>
                        <li v-if="details.bank_ZH!=='农业发展银行'">
                            <div class="li_left">
                                <img src="./img/icon6.png">
                            </div>
                            <div class="li_right">
                                <p class="div_til">公众号</p>
                                <p class="div_content">
                                    <img :src="require('../ewmImg/'+getEwmImg(details.bank_ZH))">
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="detailBtn">
                    <div class="com_i_btn"
                         @click="getAuth(0)">申请
                    </div>
                </div>
            </div>
    </div>
        <qBom></qBom>
        <Modal v-model="auth.show" title="授权书"
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
                <Button @click="getAuth(1)">取消</Button>
                <Button type="primary" @click="getProductId">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    /**
     @author xiaoye
     @date 2020/8/22 3:58 下午
     */
    import qNav from '../components/qNav'
    import qBom from '../components/qBom'

    import {GetfinanProInfo, ApplyProductByQY_QD} from '@/api/front/financial'

    export default {
        name: 'financialDetail',
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
                //详情
                details: {
                    //银行
                    bank: "工商银行上饶分行",
                    //银行
                    bank_ZH: "",
                    //担保方式
                    dbfs: "质押",
                    //担保期限 单位
                    dkqX_Unit: "beijing",
                    //担保期限
                    dkqx: 6,
                    //最大利率
                    interestRate_max: 6,
                    //最小利率
                    interestRate_min: 5,
                    //产品特点
                    characteristic: "官方",
                    //产品介绍
                    introduce: "公司发的",
                    //产品名称
                    productName: "回访电话",
                    //额度
                    quota: 5,
                    //申请材料
                    sqcl: "官方",
                    //申请条件
                    sqtj: "官方",
                    //适用客户
                    sykh: "官方",
                },
                //
                //授权书
                auth: {
                    show: false,
                },
            }
        },
        methods: {
            getInfo() {
                let data = this.getTopUrlCom();
                if (!data.id) {
                    window.close();
                }
                GetfinanProInfo({
                    id: data.id || '',
                }).then(res => {
                    if (res.code === 200) {
                        let data = res.data[0];
                        this.details = {
                            //银行
                            bank: data.bank,
                            //银行
                            bank_ZH: data.bank_ZH,
                            //担保方式
                            dbfs: data.dbfs.join(','),
                            //担保期限 单位
                            dkqX_Unit: data.dkqX_Unit,
                            //担保期限
                            dkqx: data.dkqx,
                            //最大利率
                            interestRate_max: data.interestRate_max,
                            //最小利率
                            interestRate_min: data.interestRate_min,
                            //产品特点
                            characteristic: data.characteristic,
                            //产品介绍
                            introduce: data.introduce,
                            //产品名称
                            productName: data.productName,
                            //额度
                            quota: data.quota,
                            //申请材料
                            sqcl: data.sqcl,
                            //申请条件
                            sqtj: data.sqtj,
                            //适用客户
                            sykh: data.sykh,
                        };
                    }
                });
            },
            getBankImg(name) {
                let url = this.getBankUrl(name);
                return url;
            },
            getEwmImg(name) {
                let url = this.getEwmUrl(name);
                return url;
            },
            //企业申请金融产品
            getProductId() {
                let data = this.getTopUrlCom();
                ApplyProductByQY_QD({
                    productID: data.id || '',
                }).then(res => {
                    this.auth.show = false;
                    if (res.code === 200) {
                        if (this.details.bank_ZH === '建设银行') {
                            window.open('http://rqy.zgsr.gov.cn:8002/jssdk/H5MerchantAuthSDKServlet/136837f7_b7c6_453c_8965_2b5315464157', '_blank');
                            return;
                        }
                        this.$Message.success('金融产品申请成功！');
                    }
                })
            },
            getAuth(type) {
                if (this.$store.state.user.userId && this.$store.state.user.Identity === 3) {
                    if (type === 0) {
                        this.auth.show = true;
                    } else if (type === 1) {
                        this.auth.show = false;
                    }
                } else if (this.$store.state.user.userId && this.$store.state.user.Identity === 5) {
                    this.$Message.error('请到个人信息页面进行企业认证!')
                } else if (this.$store.state.user.userId) {
                    this.$Message.error('企业用户才能够申请产品!')
                } else {
                    this.$router.push({name: 'login'})
                }
            },
        },
        mounted() {
            this.getInfo();
        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    @import '../css/comFront.less';

    .financialDetail {
        width: 100%;
        min-width: 1200px;

        .financialDetailBody {
            padding: 80px 0;

            .detailUl {
                margin: auto;
                width: 90%;
                background-color: #ffffff;
                box-shadow: 7px 7px 23px 3px rgba(181, 181, 181, 0.5);
                border-radius: 4px;
                padding: 40px 20px 20px;

                .detailUl_til {
                    width: 100%;
                    display: inline-block;
                    margin-bottom: 20px;

                    > li {
                        width: 20%;
                        height: 80px;
                        border-left: 1px solid rgba(153, 153, 153, 0.30);
                        display: inline-block;
                        float: left;
                        text-align: center;

                        > img {
                            max-width: 80%;
                            max-height: 30px;
                            display: inline-block;
                            margin-bottom: 5px;
                        }

                        .til {
                            display: inline-block;
                            width: 100%;
                            font-size: 16px;
                            line-height: 22px;
                            color: #333333;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        .blackTil {
                            display: inline-block;
                            width: 100%;
                            font-size: 14px;
                            line-height: 17px;
                            color: #999999;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            letter-spacing: 1px;
                        }
                    }

                    .li01 {
                        width: 26%;
                    }

                    .li02 {
                        width: 20%;
                    }

                    .li03 {
                        width: 20%;
                    }

                    .li04 {
                        width: 14%;
                    }

                    .li05 {
                        width: 20%;
                    }

                    .keyValue {
                        text-align: center;
                        padding: 10px 0;

                        .key {
                            display: inline-block;
                            width: 100%;
                            line-height: 30px;
                            color: #1b4673;
                            font-size: 17px;
                            margin-bottom: 5px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            padding: 0 10px;
                        }

                        .value {
                            display: inline-block;
                            width: 100%;
                            font-size: 14px;
                            line-height: 20px;
                            color: #999999;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }

                    li:first-child {
                        border-left: 0;
                    }
                }

                .detailUl_product {
                    width: 100%;
                    padding: 20px;
                    display: inline-block;

                    > li {
                        width: 100%;
                        margin-bottom: 10px;
                        display: inline-block;
                    }

                    .li_left {
                        margin: 5px 10px;
                        width: 50px;
                        float: left;
                        text-align: center;

                        > img {
                            width: 23px;
                            height: 23px;
                            display: inline-block;
                        }

                    }

                    .li_right {
                        width: calc(~'100% - 70px');
                        float: left;

                        .div_til {
                            width: 100%;
                            font-size: 17px;
                            line-height: 30px;
                            letter-spacing: 1px;
                            color: #1b4673;
                            margin-bottom: 5px;

                        }

                        .div_content {
                            width: 100%;
                            font-size: 14px;
                            line-height: 23px;
                            letter-spacing: 1px;
                            color: #999;

                            > img {
                                width: 200px;
                                border-radius: 8px;
                                height: 200px;
                            }
                        }
                    }
                }
            }

            .detailBtn {
                margin-top: 70px;
                text-align: center;
            }

        }

    }

    .auth_boxModal {

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
</style>

