/**
 @author xiaoye
 @date 2020/8/24 4:07 下午
 */
import axios from '@/libs/api.request'
import qs from 'qs';


export const authUser = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_UserManager/authUser?' + qs.stringify(data),
        method: 'get',
    })
};

export const GetDemandsList_QD = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QYDemand/GetDemandsList_QD?' + qs.stringify(data),
        method: 'get',
    })
};