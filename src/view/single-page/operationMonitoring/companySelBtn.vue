<template>
    <div class="company_btn">
        <RadioGroup v-model="selBntData" type="button" size="small" shape="circle" @change.native="companyBtnClick()">
            <Radio label="week" >周</Radio>
            <Radio label="quarter">季</Radio>
            <Radio label="year">年</Radio>
        </RadioGroup>
    </div>
</template>

<script>
    export default {
        name: "companySelBtn",
        data(){
            return{
                selBntData:'week'
            }
        },
        props:{
            chartsName:{
                type:String,
            }
        },
        methods:{
            companyBtnClick(){
                this.$emit('change-sel-btn',this.selBntData,this.chartsName);
            }
        }
    }
</script>

<style lang="less">
    .company_btn{
        position: absolute;
        right: 5%;
        top: 5%;
        z-index: 999;
    }
</style>
