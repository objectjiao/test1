/**
 @author xiaoye
 @date 2020/8/24 3:44 下午
 */
import axios from '@/libs/api.request'
import qs from 'qs';

// 获取银行列表
export const GetBankList = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_FinancialProducts/GetBankList?' + qs.stringify(data),
        method: 'get',
    })
};

// 获取金融产品列表
export const GetFinanProductsList_QD = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_FinancialProducts/GetFinanProductsList_QD?' + qs.stringify(data),
        method: 'get',
    })
};

// 获取金融产品详情
export const GetfinanProInfo = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_FinancialProducts/GetfinanProInfo?' + qs.stringify(data),
        method: 'get',
    })
};




// 企业申请金融产品
export const ApplyProductByQY_QD = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QY_Product/ApplyProductByQY_QD?' + qs.stringify(data),
        method: 'get',
    })
};