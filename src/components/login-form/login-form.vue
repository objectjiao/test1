<template>
    <Form ref="loginForm" class="loginForm" :model="form" @keydown.enter.native="handleSubmit">
        <FormItem>
            <RadioGroup v-model="form.userType" type="button" @on-change="handleUserTypeChange">
                <Radio border label="企业用户"></Radio>
                <Radio border label="金融机构"></Radio>
                <Radio border label="政府部门"></Radio>
            </RadioGroup>
        </FormItem>
        <FormItem prop="userName" v-if="form.userType!=='企业用户'">
            <Input v-model="form.userName" placeholder="请输入用户名">
            </Input>
        </FormItem>
        <FormItem prop="password" v-if="form.userType!=='企业用户'">
            <Input type="password" v-model="form.password" placeholder="请输入密码">
            </Input>
        </FormItem>
        <FormItem prop="phone" v-if="form.userType==='企业用户'">
            <Input v-model="form.phone" placeholder="请输入手机号">
            </Input>
        </FormItem>
        <FormItem prop="code" v-if="form.userType==='企业用户'">
            <Input v-model="form.code" placeholder="请输入验证码" class="vInput">
            </Input>
            <div class="verification">
                <span class="vErt" v-if="!Verification.show" @click="getVerifNum">获取验证码</span>
                <span class="vNum" v-if="Verification.show">{{Verification.num}}秒</span>
            </div>
        </FormItem>

        <FormItem>
            <Button @click="handleSubmit" type="primary" long>登录</Button>
        </FormItem>
    </Form>
</template>

<script>
    import {mapActions} from 'vuex'
    import {
        ZXWRZ_SendVCodeByTel,
    } from '@/api/login/login'

    export default {
        name: 'LoginForm',
        data() {
            return {
                form: {
                    userName: '',
                    password: '',
                    userType: '企业用户',
                    phone: '',
                    code: '',
                },
                //验证码
                Verification: {
                    num: 60,
                    show: false,
                },
                //定时器
                interval: null,
                //登录类型
                loginType: 0,
            }
        },
        computed: {
            rules() {
                return {}
            }
        },
        methods: {
            //登录
            ...mapActions([
                'handleLogin',
                'getUserInfo'
            ]),
            //登录
            handleSubmit() {
                let userName = '';
                let password = '';

                switch (this.form.userType) {
                    case '企业用户': {
                        this.loginType = 1;
                        if (this.form.phone === '') {
                            this.$Message.error('请输入手机号！');
                            return;
                        } else if (this.form.code === '') {
                            this.$Message.error('请输入验证码！');
                            return;
                        }
                        break;
                    }
                    case '金融机构': {
                        this.loginType = 0;
                        if (this.form.userName === 'admin') {
                            this.$Message.error('账号不存在!');
                            return
                        }
                        ;
                        if (this.form.userName === '') {
                            this.$Message.error('请输入用户名！');
                            return;
                        } else if (this.form.password === '') {
                            this.$Message.error('请输入密码！');
                            return;
                        }
                        break;
                    }
                    case '政府部门': {
                        this.loginType = 0;
                        if (this.form.userName === '') {
                            this.$Message.error('请输入用户名！');
                            return;
                        } else if (this.form.password === '') {
                            this.$Message.error('请输入密码！');
                            return;
                        }
                        break;
                    }
                }
                let type = this.loginType;

                //0 账号密码登录 1 手机号码登录
                if (type === 0) {
                    userName = this.form.userName;
                    password = this.form.password;
                } else if (type === 1) {
                    userName = this.form.phone;
                    password = this.form.code;
                }

                this.handleLogin({userName, password, type}).then(res => {
                    if (res === 200) {
                        this.getUserInfo().then(res => {
                            if (this.loginType === 0) {
                                this.$router.push({
                                    name: this.$config.homeName
                                })
                            } else {
                                this.$Message.success('企业登录成功');
                                this.$router.push({
                                    name: 'index'
                                })
                            }
                        });

                    }
                })
            },
            //测试账号登录
            handleUserTypeChange(val) {
                this.form.userName = "";
                this.form.password = "";
                this.form.phone = "";
                this.form.code = "";
            },
            //获取验证码
            getVerifNum() {
                if (this.form.phone) {
                    if (!/^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.form.phone)) {
                        this.$Message.error('请输入正确格式的手机号');
                        return;
                    }
                } else {
                    this.$Message.error('请输入手机号');
                    return;
                }
                this.Verification.show = false;
                this.Verification.num = 60;

                ZXWRZ_SendVCodeByTel({
                    Tel: this.form.phone
                }).then(res => {
                    if (res.code === 200) {
                        this.Verification.show = true;
                        clearInterval(this.interval);
                        this.interval = setInterval(() => {
                            if (this.Verification.num === 0) {
                                this.Verification.show = false;
                                this.Verification.num = 60;
                                clearInterval(this.interval);
                                return;
                            }
                            this.Verification.num--;
                        }, 1000);
                    }
                });
            },
        },
        mounted() {
        }
    }
</script>
