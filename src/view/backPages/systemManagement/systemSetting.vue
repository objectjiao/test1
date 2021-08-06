<template>
    <div class="systemSetting">
        <div v-can="'m3Page01_add'">
            新增
        </div>
    </div>
</template>

<script>
    /**
     @author xiaoye
     @date 2020/8/18 2:32 下午
     */
    export default {
        name: 'systemSetting',
        components: {},
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
    .m3Page01 {

    }
</style>