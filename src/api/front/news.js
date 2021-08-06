/**
 @author xiaoye
 @date 2020/8/24 12:11 下午
 */
import axios from '@/libs/api.request'
import qs from 'qs';

// 获取新闻动态或政府政策
export const GetNewsOrPolicyList_QD = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_DeliveryMessage/GetNewsOrPolicyList_QD?' + qs.stringify(data),
        method: 'get',
    })
};

// 获取新闻动态或政府政策
export const GetNewOrPolicyInfo = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_DeliveryMessage/GetNewOrPolicyInfo?' + qs.stringify(data),
        method: 'get',
    })
};