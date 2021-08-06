/**
 @author xiaoye
 @date 2020/8/24 5:07 下午
 */
import axios from '@/libs/api.request'
import qs from 'qs';


export const GetDemandsList_QD = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QYDemand/GetDemandsList_QD?' + qs.stringify(data),
        method: 'get',
    })
};


export const SaveQYDemand = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QYDemand/SaveQYDemand',
        loading: true,
        method: 'post',
        data
    })
};


export const authUser = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_UserManager/authUser',
        loading: true,
        method: 'post',
        data
    })
};


export const GetDemandsListDouble_QD = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QYDemand/GetDemandsListDouble_QD?' + qs.stringify(data),
        method: 'get',
    })
};

// 获取金融产品详情
export const QY_InverseChoose_Product_QD = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QY_Product/QY_InverseChoose_Product_QD?' + qs.stringify(data),
        method: 'get',
    })
};


// 获取金融产品详情
export const QY_authUserTel = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_UserManager/QY_authUserTel?' + qs.stringify(data),
        method: 'get',
    })
};


// 获取金融产品详情
export const GetApplyProByQY_QD = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QY_Product/GetApplyProByQY_QD?' + qs.stringify(data),
        method: 'get',
    })
};


//
export const GetApplyQYInfo = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QY_Product/GetApplyQYInfo?' + qs.stringify(data),
        method: 'get',
    })
};
//获取用户系统消息列表
export const GetUserNews = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_UserManager/GetUserNews?' + qs.stringify(data),
        method: 'get',
    })
};
