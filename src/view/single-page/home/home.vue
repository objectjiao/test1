<template>
    <div class="home">
        <div class="text">
            <div>上饶市中小微企业融资管理平台</div>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'home',
        mounted() {
        }
    }
</script>

<style lang="less">
    .home{
        background: url("../../../../public/indexBg.png") no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
        position: relative;
        .text{
            position: absolute;
            color: #fff;
            top: 50%;
            left: 50%;
            font-size: 50px;
            transform: translate(-50%,-50%);
            letter-spacing:20px;
            width: 100%;
            text-align: center;
            text-shadow: #0a246a 1px 1px;
        }
    }
</style>
