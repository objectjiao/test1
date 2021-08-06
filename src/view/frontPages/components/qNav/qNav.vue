<template>
    <div class="qNav">
        <div class="qNav_header">
            <div class="com_center">
                <div class="head_left">
                    <div class="hLogo"></div>
                    <span>饶企云-上饶市中小微企业融资应用平台</span>
                </div>
                <div class="head_right">
                    <div @click="getPath('basicInfor')"
                         v-if="$store.state.user.userId&&($store.state.user.Identity===3||$store.state.user.Identity===5)"
                         class="routeBtn">企业主页
                    </div>
                    <div @click="getPath('home')"
                         v-if="$store.state.user.userId&&$store.state.user.Identity!==3&&$store.state.user.Identity!==5"
                         class="routeBtn">后台管理
                    </div>
                    <div class="hBtn noSelect" v-if="!$store.state.user.userId" @click="getLogin">
                        登录
                    </div>
                    <div v-else class="hBtn noSelect" @click="getLoginOut">
                        退出
                    </div>
                </div>
            </div>
        </div>
        <div class="qNav_banner"
             :style="{
            background: `url('./navBack.jpg') center`,
            backgroundSize: 'center center'
             }" :class="{noBlank:isNoShow}">
            <div class="com_center">
                <div class="com_tilDiv">
                    <p class="com_til">快速融资入口</p>
                    <p class="com_line"><span></span></p>
                </div>
                <div class="bannerSelect">
                    <div>
                        <div class="selInput">
                            <span>融资金额(万元)</span>
                            <Input v-model="form.money" placeholder=""/>
                        </div>
                        <div class="selInput">
                            <span>担保方式</span>
                            <Select v-model="form.way" placeholder="">
                                <Option v-for="item in wayList" :value="item.key">
                                    {{ item.value }}
                                </Option>
                            </Select>
                        </div>
                        <div class="btnClick" @click="getDemond">我要融资</div>
                    </div>
                </div>
                <div class="bannerDiv">
                    <div @click="getPathFina()">
                        <img src="./img/icon4.jpg">
                        <p>我要贷款</p>
                    </div>
                    <div>
                        <img src="./img/icon2.jpg">
                        <p>我要租赁</p>
                    </div>
                    <div>
                        <img src="./img/icon3.jpg">
                        <p>我要担保</p></div>
                    <div>
                        <img src="./img/icon1.jpg">
                        <p>我要转贷</p></div>
                </div>
            </div>
        </div>
        <div class="qNav_til">
            <div class="com_center noSelect">
                <Row>
                    <Col span="4">
                        <div class="span_col" :class="{addSpan:$route.name==='index'}" @click="getPath('index')">
                            <span>网站首页</span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div class="span_col" :class="{addSpan:$route.name==='news'}" @click="getPath('news')">
                            <span>政策新闻</span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div class="span_col" :class="{addSpan:$route.name==='financial'}"
                             @click="getPath('financial')">
                            <span>金融产品</span>
                        </div>
                    </Col>
                    <Col span="4">
                        <div class="span_col" :class="{addSpan:$route.name==='demand'}" @click="getPath('demand')">
                            <span>融资需求</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     @author xiaoye
     @date 2020/8/20 9:35 上午
     */
    import {setToken, getToken} from '@/libs/util'
    import {mapActions} from 'vuex'

    import {
        SaveQYDemand,

    } from '@/api/front/basicInfor'

    export default {
        name: 'qNav',
        components: {},
        props: {
            isNoShow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                form: {
                    money: '',
                    way: '信用',
                },
                wayList: [
                    {key: '信用', value: '信用'},
                    {key: '抵押', value: '抵押'},
                    {key: '保证', value: '保证'},
                    {key: '贴现', value: '贴现'},
                    {key: '质押', value: '质押'},
                    {key: '综合', value: '综合'},
                ],
            }
        },
        methods: {
            ...mapActions([
                'handleUserOut'
            ]),
            getPath(path) {
                if (path === this.$route.name) {
                    return;
                }
                this.$router.push({name: path})
            },
            getLogin() {
                this.$router.push({name: 'login'})
            },
            getLoginOut() {
                setToken('');
                this.handleUserOut();
                if (this.$route.name === 'basicInfor') {
                    this.$router.push('/login');
                }
            },
            getDemond() {
                if (!this.$store.state.user.userId) {
                    this.$router.push('/login');
                    return;
                }
                if (!this.$store.state.user.Identity === 5) {
                    this.$Message.error('请到后台页面进行企业认证');
                    return;
                }
                if (!this.form.money) {
                    this.$Message.error('请填写投资金额');
                    return;
                }

                if (!this.form.way) {
                    this.$Message.error('请填写担保方式');
                    return;
                }

                SaveQYDemand({
                    quota: this.form.money,
                    dkfs: this.form.way,
                    dkqx: '1',
                    dkqX_Unit: '年',
                }).then(res => {
                    if (res.code === 200) {
                        this.$Message.success('发布需求成功！');
                        this.form.money = '';
                        this.form.way = '信用';
                    }
                })
            },
            getPathFina() {
                if (!this.$store.state.user.userId) {
                    this.$router.push('/login');
                } else {
                    this.$router.push('/financial');
                }
            },
        },
        mounted() {

        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    .qNav {
        width: 100%;

        .qNav_header {
            width: 100%;
            height: 80px;
            text-align: center;
            background-color: #fff;

            .head_left {
                float: left;
                position: relative;
                line-height: 80px;
                top: 50%;

                .hLogo {
                    width: 35px;
                    height: 35px;
                    display: inline-block;
                    background: url("./img/logo.png");
                    background-size: 100% 100%;
                    margin-right: 10px;
                    position: relative;
                    top: 4px;
                }

                > span {
                    font-size: 30px;
                    font-weight: bold;
                    color: #666666;
                }
            }

            .head_right {
                float: right;
                height: 80px;
                line-height: 80px;

                .hBtn {
                    width: 61px;
                    height: 30px;
                    border-radius: 4px;
                    display: inline-block;
                    border: solid 1px #1b4673;
                    color: #1b4673;
                    text-align: center;
                    cursor: pointer;
                    letter-spacing: 2px;
                    font-size: 14px;
                    line-height: 28px;
                }

                .hBtn:hover {
                    background-color: #1b4673;
                    color: #fff;
                }

                .routeBtn {
                    height: 30px;
                    color: #1b4673;
                    display: inline-block;
                    text-align: center;
                    width: 80px;
                    line-height: 28px;
                    font-size: 14px;
                    cursor: pointer;
                    letter-spacing: 2px;
                    margin-right: 15px;
                }

                .routeBtn:hover {
                    color: #333;
                }
            }
        }

        .qNav_banner {
            width: 100%;
            height: 500px;
            position: relative;
            overflow: hidden;

            .bigTil {
                font-size: 30px !important;
                line-height: 35px !important;
            }

            .com_til {
                font-size: 20px;
                color: #fff;
                margin-bottom: 15px;
                text-align: center;
                font-weight: bold;
                line-height: 22px;
            }

            .com_eng {
                font-size: 14px;
                line-height: 22px;
                color: #fff;
                margin-bottom: 20px;
                text-align: center;
            }

            .com_line {
                text-align: center;
                margin-bottom: 50px;

                span {
                    width: 50px;
                    height: 2px;
                    background-color: #fff;
                    display: inline-block;
                }
            }

            .com_center {
                position: relative;
                top: 32%;
                text-align: center;
            }

            .bannerSelect {
                height: 45px;
                text-align: center;

                > div {
                    display: inline-block;
                    white-space: nowrap;
                    position: relative;
                }

                .selInput {

                    display: inline-block;
                    float: left;
                    margin-right: 20px;

                    > span {
                        line-height: 45px;
                        height: 45px;
                        color: #fff;
                        display: inline-block;
                        width: 120px;
                        font-size: 14px;
                        letter-spacing: 1px;
                    }

                    .ivu-input-wrapper {
                        width: 300px;
                        margin-right: 20px;
                        font-size: 16px;

                        .ivu-input {
                            background-color: rgba(255, 255, 255, 0.5);
                            color: #000;
                            letter-spacing: 1px;
                            border: 0;
                        }
                    }

                    .ivu-select {
                        width: 300px;
                        margin-right: 20px;
                        font-size: 16px;
                        letter-spacing: 1px;
                        border: 0;
                        text-align: left;

                        .ivu-select-selection {
                            background-color: rgba(255, 255, 255, 0.5);
                            color: #000;
                            border: 0;
                        }

                        .ivu-icon {
                            color: #000;
                            font-size: 16px;
                        }
                    }

                    :focus {
                        outline: -webkit-focus-ring-color auto 0;
                    }

                    .ivu-select-visible .ivu-select-selection {
                        border-color: transparent;
                    }

                    .ivu-input:focus {
                        border-color: transparent;
                    }

                    .ivu-select-dropdown {
                        background-color: #f5f5f5;
                        color: #000;

                        .ivu-select-item {
                            color: #000;
                            font-size: 16px;
                            text-align: left;
                        }

                        .ivu-select-item-focus {
                            background-color: rgba(255, 255, 255, 0.3) !important;
                        }

                        .ivu-select-item:hover {
                            background-color: rgba(0, 0, 0, 0.3);
                        }
                    }
                }

                .btnClick {
                    line-height: 32px;
                    display: inline-block;
                    height: 32px;
                    color: #fff;
                    background-color: #c39f6f;
                    border-radius: 4px;
                    text-align: center;
                    padding: 0 20px;
                    letter-spacing: 1px;
                    cursor: pointer;
                    position: absolute;
                    font-size: 14px;
                    font-weight: bold;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }

            .bannerDiv {
                display: inline-block;
                margin-top: 40px;

                > div {
                    margin-right: 35px;
                    width: 140px;
                    height: 105px;
                    background-color: rgba(255, 255, 255, 0.3);
                    border-radius: 4px;
                    float: left;
                    display: inline-block;
                    text-align: center;
                    padding-top: 20px;
                    cursor: pointer;

                    > img {
                        width: 38px;
                        margin: auto;
                        margin-bottom: 5px;
                    }

                    > p {
                        line-height: 30px;
                        height: 30px;
                        font-size: 14px;
                        letter-spacing: 1px;
                        font-weight: bold;
                        color: #fff;
                    }
                }

                > div:hover {
                    background-color: rgba(119, 126, 226, 0.28);
                }

                > div:last-child {
                    margin-right: 0;
                }
            }

        }

        .noBlank {
            background: none !important;
            height: 10px !important;
        }

        .qNav_til {
            background-color: rgba(27, 70, 115, 0.28);
            text-align: center;
            width: 100%;

            .ivu-col {
                .span_col {
                    padding: 0 20px;
                    line-height: 60px;
                    text-align: center;
                    display: inline-block;
                    cursor: pointer;

                    span {
                        line-height: 20px;
                        color: #1b4673;
                        font-size: 16px;
                        letter-spacing: 1px;
                    }
                }

                .span_col:hover {
                    background-color: #1b4673;

                    span {
                        color: #fff;
                    }
                }

                .addSpan {
                    background-color: #1b4673;

                    span {
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
