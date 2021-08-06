<template>
    <div class="newsDetail">
        <qNav :isNoShow="true"></qNav>
        <div class="newsDetailBody">
            <div class="com_center">
                <div class="newsDetailBody_til">
                    <p class="tilP">{{name}}</p>
                    <p class="timeP">{{time}}</p>
                    <div></div>
                </div>
                <div class="news-content" v-html="html">
                </div>
            </div>
        </div>
        <qBom></qBom>
    </div>
</template>

<script>
    /**
     @author xiaoye
     @date 2020/8/22 3:03 下午
     */
    import qNav from '../components/qNav'
    import qBom from '../components/qBom'

    import {GetNewOrPolicyInfo} from '@/api/front/news'

    export default {
        name: 'newsDetail',
        components: {
            qNav,
            qBom
        },
        data() {
            return {
                html: '',
                name: '',
                time: ''
            }
        },
        methods: {
            getInfo() {
                let data = this.getTopUrlCom();
                if (!data.id) {
                    window.close();
                }
                GetNewOrPolicyInfo({
                    id: data.id || '',
                }).then(res => {
                    if (res.code === 200) {
                        let data = res.data[0];
                        this.name = data.name;
                        this.html = data.context;
                        this.time = data.createTime.slice(0, 10);
                    }
                });
            }
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

    .newsDetail {
        width: 100%;
        min-width: 1200px;

        .newsDetailBody {
            width: 100%;
            padding: 80px 0 150px;

            .newsDetailBody_til {
                width: 100%;
                text-align: center;
                padding-bottom: 28px;

                .tilP {
                    font-size: 30px;
                    color: #333;
                    line-height: 42px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }

                .timeP {
                    margin-top: 20px;
                    font-size: 14px;
                    font-weight: normal;
                    color: #666;
                    line-height: 20px;
                    letter-spacing: 1px;
                }
            }

            .news-content {
                padding: 30px 20px;
                border-top: 1px solid #e7e7e7;
                border-bottom: 1px solid #e7e7e7;

                p {
                    text-indent: 2em;
                    font-size: 16px;
                    line-height: 30px;
                    color: #333;
                    padding-top: 8px;
                    padding-bottom: 8px;
                }
            }
        }
    }
</style>