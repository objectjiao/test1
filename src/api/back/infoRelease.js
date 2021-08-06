/**
 @author xcf
 @date 2020/8/19 18:51 下午
 */
import axios from '@/libs/api.request'
import qs from 'qs';

// 获取新闻动态或政府政策
export const ZXWRZ_GetInfoOrPolicyList = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_DeliveryMessage/GetNewsOrPolicyList?' + qs.stringify(data),
        method: 'get',
    })
};
// 获取新闻动态或政府政策详情
export const ZXWRZ_GetInfoOrPolicyDetails = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_DeliveryMessage/GetNewOrPolicyInfo?' + qs.stringify(data),
        method: 'get',
    })
};


// 更改新闻动态或政府政策状态
export const ZXWRZ_SetInfoOrPolicyType = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_DeliveryMessage/ChangeStatus?' + qs.stringify(data),
        method: 'get',
    })
};

// 新建新闻动态或政府政策
export const ZXWRZ_SaveInfoOrPolicy = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_DeliveryMessage/SaveNewsOrPolicy',
        method: 'post',
        data
    })
};

// 删除新闻动态或政府政策
export const ZXWRZ_RemoveInfoOrPolicy = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_DeliveryMessage/RemoveNewsPolicyByIDs?'  + qs.stringify(data),
        method: 'get',
    })
};
