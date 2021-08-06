<template>
    <div class="postLoanWarning">
        <Card>
            <tables
                    ref="tables"
                    editable
                    searchable
                    :border="false"
                    size="small"
                    search-place="top"
                    :height="550"
                    v-model="stores.data"
                    :totalCount="stores.query.totalCount"
                    :columns="stores.columns"
                    @on-delete="handleDelete"
                    @on-edit="handleEdit"
                    @on-refresh="loadDeptList"
                    :row-class-name="rowClsRender"
                    @on-page-change="handlePageChanged"
                    @on-page-size-change="handlePageSizeChanged"
                    @on-selection-change="handleSelectUser"
            >
                <div slot="search">
                </div>
            </tables>
        </Card>
    </div>
</template>

<script>
    /*
     @author xcf
     @date 2020/8/18 17:35 下午
     */
    import Tables from "_c/tables";
    import {
        ZXWRZ_GetpostLoanWarningList
    } from '@/api/back/postLoanWarning';
    export default {
        name: 'postLoanWarning',
        components: {
            Tables,
        },
        props: {
            name: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                isClear: false,
                detail:"",
                //选择块
                commands: {
                    delete: {name: "delete", title: "删除"},
                    forbidden: {name: "forbidden", title: "禁用", type: 0},
                    normal: {name: "normal", title: "启用", type: 1}
                },
                //表格默认值
                stores: {
                    //基本数据
                    query: {
                        totalCount: 0,
                        pageSize: 15,
                        currentPage: 1,
                        kw: "",
                        isInfo: -1,
                        status: -1,
                    },
                    //下拉框
                    sources: {
                        isInfoSources: [
                            {value: -1, text: "全部"},
                            {value: 0, text: "政府政策"},
                            {value: 1, text: "新闻动态"},
                        ],
                        statusSources: [
                            {value: -1, text: "全部"},
                            {value: 0, text: "禁用"},
                            {value: 1, text: "正常"}
                        ],
                    },
                    columns: [
                        {title: "企业名称", ellipsis: true, tooltip: true, key: "qymc"},
                        {title: "统一社会信用代码", ellipsis: true, tooltip: true, key: "tyxydm"},
                        {title: "法人名称",  ellipsis: true, tooltip: true, key: "frmc"},
                        {title: "身份证号码", ellipsis: true, tooltip: true, key: "sfzh"},
                        {title: "联系电话", ellipsis: true, tooltip: true, key: "tel"},
                        {
                            title: '操作',
                            key: "status",
                            align: 'center',
                            ellipsis: true,
                            tooltip: true,
                        }
                    ],
                    //表格数据
                    data: [

                    ],

                    selections: [],
                },
                selectedRowsId: [],
            }
        },
        methods: {
            //查询表格
            async loadDeptList() {
                await ZXWRZ_GetpostLoanWarningList().then((res) => {
                    if (res.code === 200) {
                       this.stores.data  = res.data.data
                    }
                })
            },
            //表格 - 修改
            async handleEdit(command) {

            },
            //表格 - 删除
            handleDelete(ids) {

            },
            //表格 - 添加
            handleAdd() {

            },
            //点击四个操作块
            handleBatchCommand(command) {
                if (!this.selectedRowsId || this.selectedRowsId.length <= 0) {
                    this.$Message.warning({
                        content: "请选择至少一条数据",
                        duration: 2,
                        closable: true
                    });
                    return;
                }
                this.$Modal.confirm({
                    title: "操作提示",
                    content:
                        "<p>确定要执行当前 [" +
                        this.commands[command].title +
                        "] 操作吗?</p>",
                    onOk: () => {
                        if (command === 'delete') {
                            this.handleDelete(this.selectedRowsId.join(","));
                        } else {
                            this.handleEdit(this.commands[command].type);
                        }
                    }
                });
            },
            //表格数据 - 删除隐藏不展示 - 根据数据中字段判断
            rowClsRender(row, index) {
                if (row.isInfo) {
                    return "table-row-disabled";
                }
                return "";
            },
            //切换页
            handlePageChanged(page) {
                this.selectedRowsId = [];
                this.stores.query.currentPage = page;
                this.loadDeptList();
            },
            //切换一页展示多少数据
            handlePageSizeChanged(pageSize) {
                this.selectedRowsId = [];
                this.stores.query.pageSize = pageSize;
                this.loadDeptList();
            },
            // 获取选中的数据
            handleSelectUser(selection) {
                this.selectedRowsId = [];
                selection.map((val) => {
                    this.selectedRowsId.push(val.id);
                })
            },
            ready(editorInstance) {
                // 这里可以拿到ueditor的实例，比如editorInstance.getContent()就可以拿到编辑器的html内容
                this.evtHub.$emit('editor.data', editorInstance);
            }
        },
        created() {
        },
        mounted() {
            this.loadDeptList();
        },
        destroyed() {

        }
    }
</script>

<style lang="less">
    .postLoanWarning{
        .ivu-modal-body {
            height: 450px;
            overflow: auto;
            .formItem {
                margin-bottom: 20px;
                .inputTitle {
                    display: inline-block;
                    vertical-align: center;
                    width: 16.5%;
                    text-align: right;
                }

                .inputItem {
                    display: inline-block;
                    vertical-align: center;
                    width: 83.5%;
                }
            }
        }
    }
    #modal_box{
        .ivu-modal-body{
            .ivu-form-item-required{
                .ivu-form-item-content{
                    .ql-container{
                        height: 200px;
                        .ql-editor{

                        }
                    }
                }
            }
        }
    }
</style>
