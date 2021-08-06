import axios from '@/libs/api.request'
import qs from 'qs';

// 获取中小微用户列表
export const ZXWRZ_GetpostLoanWarningList = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_BankWarning/GetDHYJ',
        method: 'get',
    })
};
