/**
 @author xcf
 @date 2020/8/19 18:51 下午
 */
import axios from '@/libs/api.request'
import qs from 'qs';

// 金融机构用户获取企业申请的产品列表
export const ZXWRZ_GetApplyQYList = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QY_Product/GetApplyQYList?' + qs.stringify(data),
        method: 'get',
    })
};

// 企业用户同意或是不同意更改申请状态
export const ZXWRZ_SetApprovalApplyType = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QY_Product/ApprovalQYApply_QD',
        method: 'post',
        data
    })
};

// 获取产品详情内容
export const ZXWRZ_GetfinanProInfo = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QY_Product/GetApplyQYInfo?' + qs.stringify(data),
        method: 'get',
    })
};


// 金融机构用户获取企业申请需求列表
export const ZXWRZ_GetDemandsList = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QYDemand/GetDemandsDoubleList?' + qs.stringify(data),
        method: 'get',
    })
};

// 获取金融产品列表
export const ZXWRZ_GetFinanProductsList = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_FinancialProducts/GetFinanProductsList?' + qs.stringify(data),
        method: 'get',
    })
};

// 金融机构申请企业的需求，推产品
export const ZXWRZ_JRJG_ApplyDemand_QD = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QY_Product/JRJG_ApplyDemand_QD?' + qs.stringify(data),
        method: 'get',
    })
};
