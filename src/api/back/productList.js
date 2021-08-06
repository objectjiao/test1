/**
 @author xcf
 @date 2020/8/19 18:51 下午
 */
import axios from '@/libs/api.request'
import qs from 'qs';

// 获取金融产品列表
export const ZXWRZ_GetFinanProductsList = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_FinancialProducts/GetFinanProductsList?' + qs.stringify(data),
        method: 'get',
    })
};
// 删除金融产品
export const ZXWRZ_RemoveFinanProByIDs = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_FinancialProducts/RemoveFinanProByIDs?' + qs.stringify(data),
        method: 'get',
    })
};
//保存金融产品
export const ZXWRZ_SaveFinanProduct = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_FinancialProducts/SaveFinanProduct',
        method: 'post',
        data
    })
};
// 获取金融产品详情
export const ZXWRZ_GetfinanProInfo = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_FinancialProducts/GetfinanProInfo?' + qs.stringify(data),
        method: 'get',
    })
};
//修改金融产品状态（状态，0是弃用、1是启用）
export const ZXWRZ_ChangeStatus = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_FinancialProducts/ChangeStatus?' + qs.stringify(data),
        method: 'get',
    })
};
// 获取银行列表
export const ZXWRZ_GetBankListByUser = () => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_FinancialProducts/GetBankListByUser',
        method: 'get',
    })
};