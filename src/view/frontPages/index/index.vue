<template>
    <div class="index">
        <qNav></qNav>
        <div class="com_model platform">
            <div class="com_center">
                <div class="com_tilDiv">
                    <p class="com_til">平台运行情况</p>
                    <p class="com_eng">Platform overview</p>
                    <p class="com_line"><span></span></p>
                </div>
                <div class="com_body noSelect">
                    <Row>
                        <Col span="6">
                            <div class="platformBoxDiv">
                                <img src="./img/one1.png" ondragstart="return false">
                                <p class="boxTil">认证企业</p>
                                <p class="boxNum">{{overviewList.company}}家</p>
                            </div>
                        </Col>
                        <Col span="6">
                            <div class="platformBoxDiv">
                                <img src="./img/one2.png" ondragstart="return false">
                                <p class="boxTil">金融机构</p>
                                <p class="boxNum">{{overviewList.agency}}家</p>
                            </div>
                        </Col>
                        <Col span="6">
                            <div class="platformBoxDiv">
                                <img src="./img/one3.png" ondragstart="return false">
                                <p class="boxTil">成功案例</p>
                                <p class="boxNum">{{overviewList.case}}例</p>
                            </div>
                        </Col>
                        <Col span="6">
                            <div class="platformBoxDiv">
                                <img src="./img/one4.png" ondragstart="return false">
                                <p class="boxTil">融资总额</p>
                                <p class="boxNum">{{overviewList.total}}万元</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        <div class="com_model financial" v-if="financialList.length>=3">
            <div class="com_center">
                <div class="com_tilDiv">
                    <p class="com_til">金融产品</p>
                    <p class="com_eng">financial products</p>
                    <p class="com_line"><span></span></p>
                </div>
                <div class="com_body noSelect">
                    <Row>
                        <Col span="8" v-for="item in financialList">
                            <div class="financialDiv" data-aos="zoom-in">
                                <div class="financialDiv_tilTop">
                                    {{item.productName}}
                                </div>
                                <div class="financialDiv_body">
                                    <div>
                                        <img :src="require('../bankImg/'+getBankImg(item.bank_ZH))">
                                    </div>
                                    <ul>
                                        <li>
                                            <span class="key">贷款方式</span>
                                            <span class="val">
                                                {{item.dbfs}}
                                            </span>
                                        </li>
                                        <li>
                                            <span class="key">参考利率</span>
                                            <span class="val">
                                                {{item.interestRate_min + '%'}}{{item.interestRate_max!==item.interestRate_min?('~'+item.interestRate_max+'%'):''}}
                                            </span>
                                        </li>
                                        <li>
                                            <span class="key">贷款额度</span>
                                            <span class="val">{{item.quota}}万元</span>
                                        </li>
                                        <li class="heLi">
                                            <div class="spanBtn" @click="getfinancialPath(item.id)">
                                                详情
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div class="body_btn">
                    <div class="com_btn noSelect" @click="getPath('/financial')">
                        更多产品
                    </div>
                </div>
            </div>
        </div>
        <div class="com_model overview">
            <div class="com_center">
                <div class="com_tilDiv">
                    <p class="com_til">平台总览</p>
                    <p class="com_eng">Platform overview</p>
                    <p class="com_line"><span></span></p>
                </div>
                <div class="com_body noSelect">
                    <Row>
                        <Col span="6">
                            <div class="platformDiv" data-aos="fade-up">
                                <div class="platforDiv_back back01"></div>
                                <span class="spanTil">政府背景</span>
                                <span class="spanCount">上饶市大数据局主办</span>
                                <span class="spanCount">上饶市数金投建设运营</span>
                            </div>
                        </Col>
                        <Col span="6">
                            <div class="platformDiv" data-aos="fade-up">
                                <div class="platforDiv_back back02"></div>
                                <span class="spanTil">资源丰富</span>
                                <span class="spanCount">多家金融机构入驻</span>
                                <span class="spanCount">多样产品可选</span>
                            </div>
                        </Col>
                        <Col span="6">
                            <div class="platformDiv" data-aos="fade-up">
                                <div class="platforDiv_back back03"></div>
                                <span class="spanTil">数据安全</span>
                                <span class="spanCount">严格的安全制度</span>
                                <span class="spanCount">完善的安全技术</span>
                            </div>
                        </Col>
                        <Col span="6">
                            <div class="platformDiv" data-aos="fade-up">
                                <div class="platforDiv_back back04"></div>
                                <span class="spanTil">撮合迅速</span>
                                <span class="spanCount">7x24小时在线下单</span>
                                <span class="spanCount">快速智能撮合</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        <div class="com_model mechanism">
            <div class="com_center">
                <div class="com_tilDiv">
                    <p class="com_til">合作机构</p>
                    <p class="com_eng">Cooperative organization</p>
                    <p class="com_line"><span></span></p>
                </div>
                <div class="com_body noSelect">
                    <div class="swiper-container swiper02">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="enterprise">
                                    <div class="divBox"><img src="../bankImg/icon13.png" ondragstart="return false">
                                    </div>
                                    <div class="divBox"><img src="../bankImg/icon16.png" ondragstart="return false">
                                    </div>
                                    <div class="divBox"><img src="../bankImg/icon1.png" ondragstart="return false">
                                    </div>
                                    <div class="divBox"><img src="../bankImg/icon2.png" ondragstart="return false">
                                    </div>
                                    <div class="divBox"><img src="../bankImg/icon3.png" ondragstart="return false">
                                    </div>
                                    <div class="divBox"><img src="../bankImg/icon5.png" ondragstart="return false">
                                    </div>
                                    <div class="divBox"><img src="../bankImg/icon6.png" ondragstart="return false">
                                    </div>
                                    <div class="divBox"><img src="../bankImg/icon7.png" ondragstart="return false">
                                    </div>
                                    <div class="divBox"><img src="../bankImg/icon4.png" ondragstart="return false">
                                    </div>
                                    <div class="divBox"><img src="../bankImg/icon17.png" ondragstart="return false">
                                    </div>
                                    <div class="divBox"><img src="../bankImg/icon8.png" ondragstart="return false">
                                    </div>
                                    <div class="divBox"><img src="../bankImg/icon9.png" ondragstart="return false">
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="enterprise">
                                    <div class="divBoxBiv">
                                        <div class="divBox"><img src="../bankImg/icon12.png" ondragstart="return false">
                                        </div>
                                        <div class="divBox"><img src="../bankImg/icon14.png" ondragstart="return false">
                                        </div>
                                        <div class="divBox"><img src="../bankImg/icon10.png" ondragstart="return false">
                                        </div>
                                        <div class="divBox"><img src="../bankImg/icon11.png" ondragstart="return false">
                                        </div>
                                        <div class="divBox"><img src="../bankImg/icon18.png" ondragstart="return false">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <qBom></qBom>
    </div>
</template>

<script>
    /**
     @author xiaoye
     @date 2020/8/18 10:11 上午
     */
    import qNav from '../components/qNav'
    import qBom from '../components/qBom'
    import AOS from 'aos'
    import 'aos/dist/aos.css'

    import {HotProduct, GetDemandsList_QD, GetHeadDetails} from '@/api/front/index'

    export default {
        name: 'index',
        components: {
            qNav,
            qBom
        },
        data() {
            return {
                financialList: [
                    {
                        bank: "中信银行",
                        bank_ZH: "中信银行",
                        count: 3,
                        dbfs: "质押",
                        dkqX_Unit: "年",
                        dkqx: 4,
                        interestRate_max: 5,
                        interestRate_min: 4,
                        productID: "163e8540-74fe-4728-bcdb-1eeb448d6b8d",
                        productName: "d09e7d6e-e515-4586-9885-e5a1b31c8fc4",
                        quota: 3,
                    }
                ],
                //成功案例
                successList: [
                    {}
                ],
                //平台运行情况总览
                overviewList: {
                    //企业
                    company: '',
                    //机构
                    agency: '',
                    //案例
                    case: '',
                    //总额
                    total: '',
                }
            }
        },
        methods: {
            getPath(path) {
                this.$router.push(path);
            },
            //初始化轮播
            getSwiper() {


                new Swiper('.swiper01', {
                    autoplay: {
                        autoplay: true,
                        delay: 3000,
                    },
                    slidesPerView: 4,
                    centeredSlides: true,
                    spaceBetween: 30,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });


                //上下滚动
                new Swiper('.swiper02', {
                    autoplay: {
                        autoplay: true,
                        delay: 3000,
                    },
                    direction: 'vertical',
                    loop: true,
                    // simulateTouch: false,
                });

            },
            //获取金融理财产品
            getFinancialList() {
                HotProduct({
                    pageIndex: 1,
                    pageSize: 3
                }).then(res => {
                    if (res.code === 200) {
                        this.financialList = res.data;
                    }
                })
            },
            //获取成功案例列表
            getDemandsList() {
                GetDemandsList_QD({
                    type: 1,
                    pageIndex: 1,
                    pageSize: 4
                }).then(res => {
                    if (res.code === 200) {
                        this.successList = res.data.dt;
                    }
                })
            },
            getBankImg(name) {
                let url = this.getBankUrl(name);
                return url;
            },
            //跳转产品详情
            getfinancialPath(id) {
                let routeUrl = this.$router.resolve({
                    path: "/financialDetail",
                    query: {id: id}
                });
                window.open(routeUrl.href, '_blank');
            },
            //平台运行情况总览
            getHeadTopNum() {
                GetHeadDetails().then(res => {
                    if (res.code === 200) {
                        res.data.map(item => {
                            if (item.name === '注册企业数') {
                                this.overviewList.company = item.count;
                            } else if (item.name === '金融机构数量') {
                                this.overviewList.agency = item.count;
                            } else if (item.name === '成功案例数量') {
                                this.overviewList.case = item.count;
                            } else if (item.name === '融资总额') {
                                this.overviewList.total = item.count;
                            }
                        })
                    }
                })
            },
        },
        mounted() {
            //初始化轮播
            this.getSwiper();
            //获取金融理财产品
            this.getFinancialList();
            //获取金融理财产品
            this.getDemandsList();
            //平台运行情况总览
            this.getHeadTopNum();
            AOS.init({
                offset: 200,
                duration: 500,
                easing: 'ease-in-sine',
            });
        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    @import '../css/comFront.less';

    .index {
        width: 100%;
        min-width: 1200px;

        .platform {
            .com_body {

                .ivu-col {
                    text-align: center;
                }

                .platformBoxDiv {
                    display: inline-block;
                    margin: auto;
                    min-width: 170px;
                    max-width: 240px;
                    padding-left: 20px;

                    img {
                        float: left;
                        width: 70px;
                        height: 70px;
                        margin-right: 10px;
                    }

                    > p {
                        float: right;
                        width: calc(~'100% - 10px - 70px');
                        text-align: left;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        word-break: break-all;
                    }

                    .boxTil {
                        font-size: 16px;
                        line-height: 35px;
                        letter-spacing: 1px;
                        color: #333333;
                    }

                    .boxNum {
                        font-size: 16px;
                        line-height: 35px;
                        letter-spacing: 1px;
                        color: #1b4673;
                        font-weight: bold;
                    }
                }
            }
        }

        .overview {
            .com_body {

                .platformDiv {
                    width: 180px;
                    height: 200px;
                    margin: auto;

                    .platforDiv_back {
                        width: 90px;
                        height: 90px;
                        margin: auto;
                    }

                    .spanTil {
                        text-align: center;
                        letter-spacing: 1px;
                        color: #333;
                        font-size: 20px;
                        display: inline-block;
                        width: 100%;
                        line-height: 45px;
                    }

                    .spanCount {
                        letter-spacing: 1px;
                        text-align: center;
                        font-size: 16px;
                        line-height: 30px;
                        display: inline-block;
                        width: 100%;
                    }

                    .back01 {
                        background: url("./img/two1.png");
                        background-size: 100% 100%;
                    }

                    .back02 {
                        background: url("./img/two2.png");
                        background-size: 100% 100%;
                    }

                    .back03 {
                        background: url("./img/two3.png");
                        background-size: 100% 100%;
                    }

                    .back04 {
                        background: url("./img/two4.png");
                        background-size: 100% 100%;
                    }
                }
            }
        }

        .financial {
            padding-bottom: 20px;

            .com_body {
                .financialDiv {
                    max-width: 290px;
                    height: 280px;
                    margin: auto;
                    border-radius: 4px;
                    border: solid 1px #bfbfbf;

                    .financialDiv_tilTop {
                        width: 100%;
                        height: 42px;
                        line-height: 42px;
                        text-align: center;
                        letter-spacing: 2px;
                        font-size: 17px;
                        color: #fff;
                        background-color: #c39f6f;
                        font-weight: bold;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }

                    .financialDiv_body {
                        padding: 15px 20px;

                        > div {
                            height: 50px;
                            margin-bottom: 10px;
                            text-align: center;

                            > img {
                                margin: auto;
                                max-width: 60%;
                                max-height: 100%;
                                position: relative;
                                top: 50%;
                                transform: translateY(-50%);
                            }
                        }

                        ul {
                            margin-top: 10px;

                            .heLi {
                                margin-top: 5px;
                                text-align: center;

                                .spanBtn {
                                    cursor: pointer;
                                }

                                .spanBtn:hover {
                                    background-color: #333;
                                }
                            }

                            li {
                                line-height: 35px;

                                .spanBtn {
                                    border-radius: 4px;
                                    background-color: #1b4673;
                                    color: #fff;
                                    text-align: center;
                                    padding: 0 15px;
                                    letter-spacing: 1px;
                                    max-width: 200px;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    line-height: 30px;
                                    display: inline-block;
                                    font-size: 14px;
                                }

                                .key {
                                    float: left;
                                    width: 80px;
                                    font-size: 15px;
                                    letter-spacing: 1px;
                                    color: #333333;
                                    margin-right: 20px;
                                    display: inline-block;
                                }

                                .val {
                                    font-size: 17px;
                                    color: #333333;
                                    display: inline-block;
                                    width: calc(100% - 100px);
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }
                        }
                    }
                }
            }

            .com_center {
                .body_btn {
                    margin-top: 30px;
                    text-align: center;
                }
            }


        }

        .success {
            .com_body {
                .successDiv {
                    max-width: 230px;
                    height: 190px;
                    margin: auto;
                    border-radius: 6px;
                    padding: 15px 20px;
                    position: relative;

                    .successDiv_div01 {
                        color: #fff;

                        .spanTil {
                            font-size: 13px;
                            line-height: 20px;
                            display: inline-block;
                            width: 100%;
                        }

                        .spanContent {
                            font-size: 20px;
                            line-height: 30px;
                            display: inline-block;
                            width: 100%;
                        }
                    }

                    .successDiv_div02 {
                        color: #fff;
                        position: absolute;
                        top: 40%;

                        .spanTil {
                            font-size: 13px;
                            line-height: 20px;
                            display: inline-block;
                            width: 100%;
                        }

                        .spanContent {
                            font-size: 20px;
                            line-height: 30px;
                            display: inline-block;
                            width: 100%;
                        }
                    }

                    .successDiv_div03 {
                        color: #fff;
                        white-space: nowrap;
                        position: absolute;
                        bottom: 15px;

                        .spanTil {
                            font-size: 13px;
                            float: left;
                            margin-right: 15px;
                            width: 40px;
                        }

                        .spanContent {
                            font-size: 13px;
                            width: calc(~'100% - 40px');
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }


                }

                .back01 {
                    background: url("./img/back1.jpg");
                    background-size: 100% 100%;
                }

                .back02 {
                    background: url("./img/back2.jpg");
                    background-size: 100% 100%;
                }
            }

            .com_center {
                .body_btn {
                    margin-top: 30px;
                    text-align: center;
                }
            }
        }

        .mechanism {
            height: 400px;

            .com_center {
                width: 1000px !important;
                min-width: 1000px !important;
            }

            .com_line {
                margin-bottom: 20px;
            }

            .swiper-wrapper {
                position: relative;
                height: 200px !important;

                .swiper-slide {
                    height: 200px;
                }

                .enterprise {
                    cursor: pointer;
                    display: inline-block;
                    overflow: hidden;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    position: relative;

                    .divBox {
                        width: 166px;
                        height: 100px;
                        display: inline-block;
                        float: left;
                        text-align: center;
                        position: relative;

                        img {
                            width: auto;
                            cursor: pointer;
                            position: relative;
                            top: 50%;
                            transform: translateY(-50%);
                            margin: auto;
                            max-width: 82%;
                            max-height: 80%;
                        }

                        .displayOne {
                            display: block;
                        }

                        .displayTwo {
                            display: none;
                        }
                    }

                    .divBox:hover {
                        .displayOne {
                            display: none;
                        }

                        .displayTwo {
                            display: block;
                        }
                    }

                    .divBoxBiv {
                        display: inline-block;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translateX(-50%) translateY(-50%);
                        width: calc(~'166px * 5');
                    }
                }
            }


        }

    }
</style>