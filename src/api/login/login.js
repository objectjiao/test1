/**
 @author xiaoye
 @date 2020/8/19 2:50 下午
 */
import axios from '@/libs/api.request'
import qs from 'qs';

// 获取验证码
export const ZXWRZ_SendVCodeByTel = (data) => {
    return axios.request({
        url: '/Login_Register/LoginService/ZXWRZ_SendVCodeByTel?' + qs.stringify(data),
        method: 'get',
    })
};

// 手机号验证码登录 企业登录
export const ZXWRZ_LoginByTelVCode = (data) => {
    return axios.request({
        url: '/Login_Register/LoginService/ZXWRZ_LoginByTelVCode',
        method: 'post',
        data
    })
};

// 账号密码登录
export const ZXWRZ_LoginByPassword = (data) => {
    return axios.request({
        url: '/Login_Register/LoginService/ZXWRZ_LoginByPassword',
        method: 'post',
        data
    })
};

// 账号密码登录
export const ZXWRZ_GetCurrentUser = (data) => {
    return axios.request({
        url: '/Login_Register/LoginService/ZXWRZ_GetCurrentUser',
        method: 'get',
    })
};


// 获取系统运行监控数据
export const ZXWRZ_GetStatisticalData = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_DataCollection/GetStatisticalData',
        method: 'get',
    })
};
