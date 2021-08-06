<template>
    <div class="synopsis">
        <qNav></qNav>
        <div class="com_model website">
            <div class="com_center">
                <div class="com_tilTwoDiv">
                    <div>
                        <span></span>
                        <div>
                            <p class="com_til">网站简介</p>
                            <p class="com_eng">Website Introduction</p>
                        </div>
                        <span></span>
                    </div>
                </div>
                <div class="websiteContent">
                    <div>
                        <div class="back01"></div>
                        <div class="countBox">
<!--                            <p class="til">网站简介</p>-->
                            <p class="ledC">
                                “饶企云"上饶市智能化综合服务平台是上饶市大力扶持中小微企业，推广实施"融资通畅工程"的重要举措，由上饶市大数据发展管理局和上饶市人民政府金融工作办公室牵头主办，上饶市数字和金融产业投资集团有限公司建设和运营。上饶市智能化综合服务平台立足从供给侧引导金融资源支持实体经济发展，健全优化金融机构与在饶中小微企业融资信息对接机制。
                            </p>
                        </div>
                    </div>
                    <div>
                        <div class="countBox">
<!--                            <p class="til">网站简介</p>-->
                            <p class="ledC">
                                平台为上饶市中小微企业提供融资需求发布渠道，并与金融机构端各类型金融产品智能撮合匹配，综合运用政府部门、公共事业单位等数据，配套提供企业社会信用查询、信用评分、贷后监控、投融资政策支撑等一站式服务， 力求化解中小微企业融资难融资贵、金融供求双方信息不对称等问题。
                            </p>
                        </div>
                        <div class="back02"></div>
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
     @date 2020/9/19 10:42 上午
     */
    import qNav from '../components/qNav'
    import qBom from '../components/qBom'

    export default {
        name: 'synopsis',
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
            return {}
        },
        methods: {},
        mounted() {

        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    @import '../css/comFront.less';

    .synopsis {
        width: 100%;
        min-width: 1200px;

        .website {
            padding-top: 70px;
            padding-bottom: 100px;
            margin: auto;
            max-width: 900px;

            .com_center {
                min-width: 900px;
                max-width: 900px;
            }

            .websiteContent {
                margin-top: 60px;
                width: 100%;

                > div {
                    width: 100%;
                    margin-bottom: 20px;
                    display: inline-block;

                    > div {
                        width: calc(~'(100% - 20px) / 2');
                        height: 320px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        float: left;
                    }

                    > div:first-child {
                        margin-right: 20px;
                    }

                    .countBox {
                        padding: 40px 20px;
                        background-color: #e6e6e6;

                        .til {
                            line-height: 28px;
                            font-size: 16px;
                            color: #111;
                            letter-spacing: 1px;
                            font-weight: bold;
                            margin-bottom: 15px;
                            text-align: center;
                        }

                        .ledC {
                            line-height: 35px;
                            font-size: 16px;
                            color: #616366;
                            text-indent: 2em;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 10;
                            overflow: hidden;
                            word-break: break-all;
                        }
                    }

                    .back01 {
                        background: url("./img/synopsis/img01.jpg");
                        background-size: 100% 100%;
                    }

                    .back02 {
                        background: url("./img/synopsis/img02.jpg");
                        background-size: 100% 100%;
                    }
                }
            }
        }

    }
</style>