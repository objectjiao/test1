<template>
    <div class="contactUs">
        <qNav></qNav>
        <div class="com_model contactUsBody">
            <div class="com_center">
                <div class="com_tilTwoDiv">
                    <div>
                        <span></span>
                        <div>
                            <p class="com_til">联系我们</p>
                            <p class="com_eng">Contact Us</p>
                        </div>
                        <span></span>
                    </div>
                </div>
                <div class="contactUsContent">
                    <div>
                        <p class="cn">联系电话</p>
                        <p class="en">Contact Number</p>
                        <div class="dIcon dIcon01"></div>
                        <p class="num">0793-8823983</p>
                    </div>
                    <div>
                        <p class="cn">公司地址</p>
                        <p class="en">Company Address</p>
                        <div class="dIcon dIcon03"></div>
                        <p class="num">上饶市广信区<br/>万嘉商务中心17楼</p>
                    </div>
                    <div>
                        <p class="cn">工作时间</p>
                        <p class="en">Operating Hours</p>
                        <div class="dIcon  dIcon04"></div>
                        <p class="num">工作日 9:00-11:30<br/>13:30-17:30</p>
                    </div>
                    <div>
                        <p class="cn">邮箱地址</p>
                        <p class="en">Email Address</p>
                        <div class="dIcon dIcon05"></div>
                        <p class="num">srssjtjt@163.com</p>
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
        name: 'contactUs',
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

    .contactUs {
        width: 100%;
        min-width: 1200px;

        .contactUsBody {
            padding-top: 70px;
            padding-bottom: 100px;
            margin: auto;

            .contactUsContent {
                width: calc(~'100% + 20px');
                margin-top: 60px;
                display: inline-block;

                > div {
                    border-radius: 4px;
                    width: calc(~'25% - 20px');
                    float: left;
                    margin: 0 10px;
                    padding: 25px 15px;

                    > p {
                        width: 100%;
                    }

                    .cn {
                        line-height: 30px;
                        font-size: 18px;
                        margin-bottom: 10px;
                        font-weight: bold;
                        text-align: center;
                        color: #565656;
                    }

                    .en {
                        font-size: 15px;
                        line-height: 30px;
                        margin-bottom: 20px;
                        text-align: center;
                        color: #717171;
                    }

                    .dIcon {
                        width: 70px;
                        height: 70px;
                        position: relative;
                        left: 50%;
                        transform: translateX(-50%);
                        margin: 30px 0;
                    }

                    .dIcon01 {
                        background: url("./img/contactUs/icon1.png");
                        background-size: 100% 100%;
                    }

                    .dIcon02 {
                        background: url("./img/contactUs/icon2.png");
                        background-size: 100% 100%;
                    }

                    .dIcon03 {
                        background: url("./img/contactUs/icon3.png");
                        background-size: 100% 100%;
                    }

                    .dIcon04 {
                        background: url("./img/contactUs/icon4.png");
                        background-size: 100% 100%;
                    }

                    .dIcon05 {
                        background: url("./img/contactUs/icon5.png");
                        background-size: 100% 100%;
                    }

                    .num {
                        font-size: 16px;
                        line-height: 30px;
                        text-align: center;
                        font-weight: bold;
                        color: #757575;
                        letter-spacing: 0.5px;
                    }
                }

                > div:hover {
                    background: rgba(27, 70, 115, 0.56);

                    .cn {
                        color: #fff;
                    }

                    .en {
                        color: #fff;
                    }

                    .num {
                        color: #fff;
                    }

                    .dIcon01 {
                        background: url("./img/contactUs/iconA1.png");
                        background-size: 100% 100%;
                    }

                    .dIcon02 {
                        background: url("./img/contactUs/iconA2.png");
                        background-size: 100% 100%;
                    }

                    .dIcon03 {
                        background: url("./img/contactUs/iconA3.png");
                        background-size: 100% 100%;
                    }

                    .dIcon04 {
                        background: url("./img/contactUs/iconA4.png");
                        background-size: 100% 100%;
                    }

                    .dIcon05 {
                        background: url("./img/contactUs/iconA5.png");
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }
</style>