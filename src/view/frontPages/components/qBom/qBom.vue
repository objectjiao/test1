<template>
    <div class="qBom">
        <div class="com_center">
            <div class="qBom_right">
                <p class="qBom_top">
                    <span @click="getPath('/synopsis')">网站简介</span>
                    | <span @click="getPath('/contactUs')">联系我们</span>
                    | <span @click="getLink(0)">上饶市人民政府</span>
                    | <span @click="getLink(1)">上饶市数字和金融产业投资集团有限公司</span>
                </p>
                <p class="qBom_bom">
                    <span>@Copyright 2019-2020 上饶XXX有限公司（赣ICP备0000000号-1)</span>
                    <span>公安网备00000000000</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     @author xiaoye
     @date 2020/8/20 9:39 上午
     */
    export default {
        name: 'qBom',
        components: {},
        props: {},
        data() {
            return {}
        },
        methods: {
            getPath(path) {
                if (this.$route.path === path) {
                    return;

                }
                this.$router.push(path);
            },
            getLink(type) {
                if (type === 0) {
                    window.open('http://www.zgsr.gov.cn/')
                } else if (type === 1) {
                    window.open('http://www.srsjrkg.cn/')
                }
            }
        },
        mounted() {

        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    .qBom {
        width: 100%;
        height: 140px;
        background-color: #1b4673;
        text-align: center;

        .com_center {
            padding: 0 40px;
            height: 100%;
        }

        .qBom_right {
            float: right;
            height: 100%;
            width: 100%;

            .qBom_top {
                text-align: center;
                color: #fff;
                font-size: 14px;
                letter-spacing: 2px;
                position: absolute;
                top: 30px;
                width: 100%;

                > span {
                    display: inline-block;
                    margin: 0 5px;
                    cursor: pointer;
                }

                > span:hover {
                    color: #3ce9ff;
                }
            }

            .qBom_bom {
                text-align: center;
                color: #fff;
                font-size: 14px;
                letter-spacing: 1px;
                position: absolute;
                bottom: 35px;
                width: 100%;
                line-height: 25px;

                > span {
                    display: inline-block;
                    margin: 0 20px;
                }
            }
        }
    }
</style>