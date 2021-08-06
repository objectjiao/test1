<template>
    <div class="news">
        <qNav :isNoShow="true"></qNav>
        <div class="newsBody">
            <div class="newsList">
                <div class="com_center">
                    <p>政府政策</p>
                    <ul class="newsUl">
                        <li @click="getPath(item.id)" v-for="item in policyList">
                            <div></div>
                            <p>{{item.name}}</p>
                            <span>{{getCreatTime(item.createTime)}}</span>
                        </li>
                    </ul>
                    <Page :total="policy.total" :page-size="policy.pageSize" :current="policy.pageIndex"
                          show-elevator show-sizer show-total class="com_page" :page-size-opts="pageSizeOpts"
                          @on-change="pagePageFil" @on-page-size-change="pageSizeFil"/>
                </div>
            </div>
            <div class="newsList">
                <div class="com_center">
                    <p>新闻动态</p>
                    <ul class="newsUl">
                        <li @click="getPath(item.id)" v-for="item in newsList">
                            <div></div>
                            <p>{{item.name}}</p>
                            <span>{{getCreatTime(item.createTime)}}</span>
                        </li>
                    </ul>
                    <Page :total="news.total" :page-size="news.pageSize" :current="news.pageIndex"
                          show-elevator show-sizer show-total class="com_page" :page-size-opts="pageSizeOpts"
                          @on-change="pagePageNews" @on-page-size-change="pageSizeNews"/>
                </div>
            </div>
        </div>
        <qBom></qBom>
    </div>
</template>

<script>
    /**
     @author xiaoye
     @date 2020/8/21 9:54 上午
     */
    import qNav from '../components/qNav'
    import qBom from '../components/qBom'

    import {GetNewsOrPolicyList_QD} from '@/api/front/news'
    //详情
    export default {
        name: 'news',
        components: {
            qNav,
            qBom
        },
        props: {},
        data() {
            return {
                newsList: [],
                policyList: [],
                policy: {
                    pageIndex: 1,
                    pageSize: 5,
                    total: 100
                },
                news: {
                    pageIndex: 1,
                    pageSize: 5,
                    total: 100
                }, pageSizeOpts: [5, 15, 30],
            }
        },
        methods: {
            getPath(id) {
                let routeUrl = this.$router.resolve({
                    path: "/newsDetail",
                    query: {id: id}
                });
                window.open(routeUrl.href, '_blank');
            },
            //获取政策
            getOrPolicy() {
                GetNewsOrPolicyList_QD({
                    type: 1,
                    pageIndex: this.policy.pageIndex,
                    pageSize: this.policy.pageSize,
                }).then(res => {
                    if (res.code === 200) {
                        this.policyList = res.data.dt;
                        this.policy.total = res.data.count;
                    }
                })
            },
            //获取新闻
            getNewsList() {
                GetNewsOrPolicyList_QD({
                    type: 0,
                    pageIndex: this.news.pageIndex,
                    pageSize: this.news.pageSize,
                }).then(res => {
                    if (res.code === 200) {
                        this.newsList = res.data.dt;
                        this.news.total = res.data.count;
                    }
                })
            },
            //
            getCreatTime(data) {
                return data.substring(0, 10);
            },
            pageSizeFil(pageSize) {
                this.policy.pageSize = pageSize;
                this.loadDeptList();
            },
            pageSizeNews(pageSize) {
                this.news.pageSize = pageSize;
                this.getNewsList();
            },
            pagePageFil(page) {
                this.policy.pageIndex = page;
                this.loadDeptList();
            },
            pagePageNews(page) {
                this.news.pageIndex = page;
                this.getNewsList();
            },
        },
        mounted() {
            //获取政策
            this.getOrPolicy();
            //获取新闻
            this.getNewsList();
        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    @import '../css/comFront.less';

    .news {
        width: 100%;
        min-width: 1200px;

        .newsBody {
            padding: 10px 0 40px 0;

            .newsList {
                margin-top: 80px;

                .com_center {
                    > p {
                        width: 100%;
                        line-height: 30px;
                        color: #666666;
                        font-size: 20px;
                        margin-bottom: 20px;
                        letter-spacing: 1px;
                    }
                }

                .newsUl {
                    li {
                        cursor: pointer;
                        height: 48px;
                        line-height: 48px;
                        padding: 0 20px;
                        background-color: #ffffff;
                        box-shadow: 0 1px 13px 0 rgba(27, 70, 115, 0.11);
                        border-radius: 6px;
                        margin-bottom: 20px;

                        > div {
                            width: 16px;
                            height: 16px;
                            background: url("./img/LX.jpg");
                            background-size: 100% 100%;
                            margin-right: 15px;
                            float: left;
                            position: relative;
                            top: 50%;
                            transform: translateY(-50%);
                        }

                        > span {
                            float: right;
                            width: 120px;
                            display: inline-block;
                            height: 100%;
                            font-size: 16px;
                            text-align: center;
                            color: #666666;
                            letter-spacing: 1px;
                        }

                        > p {
                            width: calc(~'100% - 200px - 26px - 20px');
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            display: inline-block;
                            float: left;
                            font-size: 18px;
                            color: #666666;
                            letter-spacing: 1px;
                        }
                    }

                    li:hover {
                        box-shadow: 0 1px 13px 0 rgba(27, 70, 115, 0.2);
                        background-color: rgba(27, 70, 115, 0.1);

                        > div {
                        }

                        > span {
                            color: #000;
                        }

                        > p {
                            color: #000;
                        }
                    }
                }

                .ivu-page {

                }
            }
        }
    }
</style>