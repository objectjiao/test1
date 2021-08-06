/**
 @author xcf
 @date 2020/8/19 18:51 下午
 */
import axios from '@/libs/api.request'
import qs from 'qs';

// 获取中小微用户列表
export const ZXWRZ_GetUserManager = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_UserManager/GetUserList?' + qs.stringify(data),
        method: 'get',
    })
};

// 更改企业用户状态
export const ZXWRZ_SetUserStatus = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_UserManager/ChangeStatus?' + qs.stringify(data),
        method: 'get',
    })
};

// 新建用户
export const ZXWRZ_SaveCreateUser = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_UserManager/SaveUserByAdmin',
        method: 'post',
        data
    })
};

// 删除用户
export const ZXWRZ_SetDeleteUser = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_UserManager/RemoveUsers?'  + qs.stringify(data),
        method: 'get',
    })
};

// 获取银行列表
export const ZXWRZ_GetBankList = () => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_UserManager/GetBankList',
        method: 'get',
    })
};

// 获取银行列表
export const ZXWRZ_GetRegionList = () => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_UserManager/GetAreaList',
        method: 'get',
    })
};
