<template>
    <div class="index">
        <qNav></qNav>

        <div class="com_model financial" v-if="financialList.length>=3">
            <div class="com_center">
                <div class="com_tilDiv">
                    <p class="com_til">金融产品</p>
                    <p class="com_eng">Special anti epidemic products</p>
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
                                        <li class="heLi">
                                            <div class="spanBtn">
                                                {{item.dbfs}}
                                            </div>
                                        </li>
                                        <li>
                                            <span class="key">参考利率</span>
                                            <span class="val">{{item.interestRate_min}}%~{{item.interestRate_max}}%</span>
                                        </li>
                                        <li>
                                            <span class="key">贷款额度</span>
                                            <span class="val">{{item.quota}}万元</span>
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
        <div class="com_model success" v-if="successList.length>=4">
            <div class="com_center">
                <div class="com_tilDiv">
                    <p class="com_til">成功案例</p>
                    <p class="com_eng">Success stories</p>
                    <p class="com_line"><span></span></p>
                </div>
                <div class="com_body noSelect">
                    <Row>
                        <Col span="6" v-for="item in successList">
                            <div class="successDiv back01" data-aos="fade-up">
                                <div class="successDiv_div01">
                                    <span class="spanTil">{{item.bank}}</span>
                                    <span class="spanContent">{{item.productName}}</span>
                                </div>
                                <div class="successDiv_div02">
                                    <span class="spanTil">贷款额度</span>
                                    <span class="spanContent">{{item.pzed}}万</span>
                                </div>
                                <div class="successDiv_div03">
                                    <span class="spanTil">贷款方式</span>
                                    <span class="spanContent">{{item.dkfs}}</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div class="body_btn">
                    <div class="com_btn noSelect" @click="getPath('/demand')">
                        更多需求
                    </div>
                </div>
            </div>
        </div>
        <div class="com_model news">
            <div class="com_center">
                <div class="com_tilDiv">
                    <p class="com_til">动态新闻</p>
                    <p class="com_eng">Success stories</p>
                    <p class="com_line"><span></span></p>
                </div>
                <div class="com_body noSelect">
                    <Row>
                        <Col span="12">
                            <div class="newsDivImg">
                                <img src="./img/news.png">
                            </div>
                        </Col>
                        <Col span="12">
                            <div class="newsDivContent" data-aos="fade-down">
                                <p>
                                    中小企业是我省数量最大、最具活力的企业群体，是推动大众创业、万众创新的重要力量，
                                    保中小企业就是保增长、保民生,稳中小企业就是稳经济、稳就业。当前，中小企业在面临
                                    市场冰山、融资高山、转型火山等严峻挑战的同时，又叠加新型冠状肺炎疫情冲击，其生
                                    存发展备受各方关注。为破解中小企业发展难题，促进中小企业健康发展，中共江西省委
                                    办公厅、省政府办公厅近日印发了《关于促进中小企业健康发展的指导意见》（以下简称
                                    《实施意见》）。 强化顶层设计
                                    首次以省委办公厅、省政府办公厅名义出台支持中小企业发展的综合性政策文件
                                        2018年11月，习近平总书记在民营企业座谈会上发表重要讲话，2019年4月，中共中央办公
                                    厅、国务院办公厅印发了《关于促进中小企业健康发展的指导意见》，国务院新一届促进中小企业发
                                    展工作领导小组多次召开会议，对缓解中小企业融资难、增强中小企业专业化能力等工作进行部署，为
                                    中小企业发展擘画了蓝图，指明了方向。
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        <div class="swiper_div">
            <div class="com_center">
                <div class="swiper-container swiper01">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <img src="./img/swiper01.jpg">
                            <div>
                                <p>
                                    首次以省委办公厅、省政府办公厅名义出台支持中小企业发展的综合性政策文件
                                        2018年11月，习近平总书记在民营企业座谈会上发表重要讲话，2019年4月，
                                    中共中央办公厅、国务院办公厅印发了《关于促进中小企业健康发展的指导意见》，
                                    国务院新一届促进中小企业发展工作领导小组多次召开会议，对缓解中小企业融资难、
                                    增强中小企业专业化能力等工作进行部署，为中小企业发展擘画了蓝图，指明了方向。
                                </p>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <img src="./img/swiper02.jpg">
                            <div>
                                <p>  《实施意见》以党中央、国务院促进中小企业发展的方针政策为指导 ，结合江西实际，对促进
                                    中小企业发展的总体要求、重点任务、保障措施、组织实施等进行了顶层设计规划，系统构建促
                                    进中小企业创业创造创新的新生态，为促进我省中小企业健康发展提供了科学指引。
                                </p>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <img src="./img/swiper01.jpg">
                            <div>
                                <p>江西中小企业总体规模偏小，产业层次较低，科技水平不高，抵御外来风险能力较弱，为促进中小企业
                                    转型升级，实现高质量发展，《实施意见》鼓励支持和引导中小企业提升规模、专业、科技、融合等方
                                    面发展水平。一是提升规模水平。《实施意见》提出，促进不同发展阶段企业成长，鼓励支持和引导
                                    个体工商户转型升级为企业、小企业升格为规上企业、规上企业转为股份制企业、股份制企业实现上市
                                    ，做大中小企业体量。</p>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <img src="./img/swiper02.jpg">
                            <div>
                                <p>《实施意见》结合全省建设“五型政府”，打造“四最营商环境”，在做好增加扶持的加法同时，倾力做好减少束缚的减法，切实优化中小企业营商环境。
                                    增加扶持方面，以加大财税扶持方面为例，《实施意见》提出在省财政统筹安排中小企业发展资金，明确资金重点支持方向，各市
                                    、县（区）财政安排相应专项
                                    资金支持中小企业发展；加快设立中小企业发展基金；落实政府采购扶持等。梳理归集小微企业普惠性税收减免</p>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
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
                                    <div><img src="../bankImg/icon13.png" ondragstart="return false"></div>
                                    <div><img src="../bankImg/icon1.png" ondragstart="return false"></div>
                                    <div><img src="../bankImg/icon2.png" ondragstart="return false"></div>
                                    <div><img src="../bankImg/icon3.png" ondragstart="return false"></div>
                                    <div><img src="../bankImg/icon5.png" ondragstart="return false"></div>
                                    <div><img src="../bankImg/icon6.png" ondragstart="return false"></div>
                                    <div><img src="../bankImg/icon7.png" ondragstart="return false"></div>
                                    <div><img src="../bankImg/icon8.png" ondragstart="return false"></div>
                                    <div><img src="../bankImg/icon9.png" ondragstart="return false"></div>
                                    <div><img src="../bankImg/icon10.png" ondragstart="return false"></div>
                                    <div><img src="../bankImg/icon11.png" ondragstart="return false"></div>
                                    <div><img src="../bankImg/icon12.png" ondragstart="return false"></div>
                                    <div><img src="../bankImg/icon14.png" ondragstart="return false"></div>
                                    <div><img src="../bankImg/icon16.png" ondragstart="return false"></div>
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

    import {HotProduct, GetDemandsList_QD} from '@/api/front/index'

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
                        delay: 5000,
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
        },
        mounted() {
            //初始化轮播
            this.getSwiper();
            //获取金融理财产品
            this.getFinancialList();
            //获取金融理财产品
            this.getDemandsList();
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
                        text-align: left;
                        font-size: 16px;
                        line-height: 30px;
                        display: inline-block;
                        width: 100%;
                    }

                    .back01 {
                        background: url("./img/icon4.jpg");
                        background-size: 100% 100%;
                    }

                    .back02 {
                        background: url("./img/icon3.png");
                        background-size: 100% 100%;
                    }

                    .back03 {
                        background: url("./img/icon2.png");
                        background-size: 100% 100%;
                    }

                    .back04 {
                        background: url("./img/icon1.png");
                        background-size: 100% 100%;
                    }
                }
            }
        }


        .financial {
            .com_body {
                .financialDiv {
                    max-width: 290px;
                    height: 250px;
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
                                margin-bottom: 10px;
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

        .news {
            margin-bottom: 60px;

            .com_body {
                height: 310px;

                .newsDivImg {
                    text-align: center;

                    img {
                        max-width: 80%;
                        height: 100%;
                        border-radius: 4px;
                    }
                }

                .newsDivContent {
                    line-height: 20px;
                    font-size: 14px;
                    letter-spacing: 1px;
                    width: 80%;
                    margin: auto;
                    text-indent: 28px;

                    p {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 16;
                        -webkit-box-orient: vertical;
                    }
                }
            }
        }

        .swiper_div {
            width: 100%;
            height: 500px;
            padding: 70px 0;
            background: url("./img/swiperBack.png");
            background-size: 100% 100%;

            .com_center {
                height: 100%;

                .swiper-container {
                    height: 100%;

                    .swiper-wrapper {
                        .swiper-slide {
                            background-color: #fff;
                            border-radius: 4px;

                            > img {
                                height: 260px;
                                width: 100%;
                            }

                            > div {
                                width: 100%;
                                padding: 5px 10px;

                                > p {
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 4;
                                    -webkit-box-orient: vertical;
                                    line-height: 20px;
                                    font-size: 14px;
                                    letter-spacing: 1px;
                                    text-indent: 28px;
                                }
                            }
                        }
                    }

                    .swiper-button-next {
                        background: linear-gradient(to left, rgba(188, 188, 188, 0.7), rgba(0, 0, 0, 0));
                        height: 100%;
                        top: 0;
                        right: 0;
                        width: 100px;
                        margin: 0;
                        color: #1b4673;
                    }

                    .swiper-button-prev {
                        background: linear-gradient(to right, rgba(188, 188, 188, 0.7), rgba(0, 0, 0, 0));
                        background-size: 100% 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        width: 100px;
                        margin: 0;
                        color: #1b4673;
                    }

                    .swiper-button-next:hover,
                    .swiper-button-prev:hover {
                        color: #4dafff;
                    }

                    .swiper-button-next:after, .swiper-container-rtl .swiper-button-prev:after {
                        font-size: 40px;
                    }
                }
            }
        }

        .mechanism {
            height: 400px;

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

                    > div {
                        width: 170px;
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

                    > div:hover {
                        .displayOne {
                            display: none;
                        }

                        .displayTwo {
                            display: block;
                        }
                    }
                }
            }


        }

    }
</style>