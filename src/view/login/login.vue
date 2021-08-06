<template>
    <div class="login">
        <div class="login_div">
            <div class="title">
                <div class="logo"></div>
                <div class="name">饶企云-上饶市中小微企业融资应用平台</div>
            </div>
            <div class="login-con">
                <Card icon="log-in" title="欢迎登录" :bordered="false">
                    <div class="form-con">
                        <login-form></login-form>
                        <p class="login-tip">欢迎登录饶企云-上饶市中小微企业融资应用平台</p>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
    import LoginForm from '_c/login-form'

    export default {
        components: {
            LoginForm
        },
        methods: {}
    }
</script>

<style lang="less">
    @import './login.less';

    .login {

    }
</style>
