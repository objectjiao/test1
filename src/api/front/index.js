/**
 @author xiaoye
 @date 2020/8/24 11:59 上午
 */
import axios from '@/libs/api.request'
import qs from 'qs';

// 获取热门产品
export const HotProduct = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QY_Product/HotProduct?' + qs.stringify(data),
        method: 'get',
    })
};

// 获取项目需求列表
export const GetDemandsList_QD = (data) => {
    return axios.request({
        url: '/ZXWRZ/ZXWRZ_QYDemand/GetDemandsList_QD?' + qs.stringify(data),
        method: 'get',
    })
};

//上面标题
export const GetHeadDetails = () => {
    return axios.request({
        url: '/LDJSC/LDJSC_DataCollection/GetHeadDetails',
        method: 'get'
    })
}