/**
 @author xiaoye
 @date 2020/8/19 7:29 下午
 */
import axios from '@/libs/api.request'
import qs from 'qs';


// 获取企业基本信息列表分页
export const GetEnterpriseList = (data) => {
    return axios.request({
        url: "/SJZL/SJZL_MainBusiness/GetEnterpriseList?" + qs.stringify(data),
        method: "get",
    })
};
// 根据企业Id，获取企业信息
export const GetEnterPriseInfoJX = (data) => {
    return axios.request({
        url: "/SJZL/SJZL_MainBusiness/GetEnterPriseInfoJX?" + qs.stringify(data),
        method: "get",
    })
};
//获取企业基本信息
export const GetEnterpriseInfo = (data) => {
    return axios.request({
        url: "/SJZL/SJZL_MainBusiness/GetEnterpriseInfo?" + qs.stringify(data),
        method: "get",
    })
};
//获取企业风险信息（企业投资、法律风险、经营风险）
export const GetEnterpriseRisk = (data) => {
    return axios.request({
        url: "/SJZL/SJZL_MainBusiness/GetEnterpriseRisk?" + qs.stringify(data),
        method: "get",
    })
};

// 获取企业年报信息
export const GetEnterpAnnualReport = (data) => {
    return axios.request({
        url: "/SJZL/SJZL_MainBusiness/GetEnterpAnnualReport?" + qs.stringify(data),
        method: "get",
    })
};

// 获取其他风险信息
export const GetEnterpOtherRisks = (data) => {
    return axios.request({
        url: "/SJZL/SJZL_MainBusiness/GetEnterpOtherRisks?" + qs.stringify(data),
        method: "get",
    })
};
// 获取法人信息
export const GetInvestorInfo = (data) => {
    return axios.request({
        url: "/SJZL/SJZL_MainBusiness/GetInvestorInfo?" + qs.stringify(data),
        method: "get",
    })
};