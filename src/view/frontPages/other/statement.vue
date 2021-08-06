<template>
    <div class="statement">
        <qNav></qNav>
        <div class="com_model statementBody">
            <div class="com_center ">
                <div class="com_tilTwoDiv">
                    <div>
                        <span></span>
                        <div>
                            <p class="com_til">郑重声明</p>
                            <p class="com_eng">Website Introduction</p>
                        </div>
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="statementContent">
                <p>郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明
                    郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明
                    郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明
                    郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明
                    郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明
                    郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明
                    郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明
                    郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明
                    郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明
                    郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明郑重声明</p>
            </div>
        </div>
        <qBom></qBom>
    </div>
</template>

<script>
    /**
     @author xiaoye
     @date 2020/9/19 10:43 上午
     */
    import qNav from '../components/qNav'
    import qBom from '../components/qBom'

    export default {
        name: 'statement',
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

    .statement {
        width: 100%;
        min-width: 1200px;

        .statementBody {
            padding-top: 70px;
            padding-bottom: 100px;
            margin: auto;
            max-width: 1200px;

            .com_center {
                padding-bottom: 30px;
                border-bottom: 1px solid #ddd;
            }

            .statementContent {
                margin-top: 60px;
                width: 100%;
                text-align: center;

                > p {
                    display: inline-block;
                    width: 90%;
                    max-width: 900px;
                    line-height: 35px;
                    font-size: 16px;
                    color: #65676a;
                    text-indent: 2em;
                    text-align: left;
                }
            }

        }
    }
</style>