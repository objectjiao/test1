import Vue from 'vue';
import {Message} from 'view-design'

Vue.prototype.randomNum = (Min = 0, Max = 1, num = 2) => {
    let Range = Max - Min;
    let Rand = Math.random();
    return Min + Number((Rand * Range).toFixed(num));
};

Vue.prototype.formatError = () => {
};

//获取url参数地址
Vue.prototype.getTopUrlCom = () => {
    let href = window.location.href;
    let params = href.split('?')[1];
    if (params) {
        let list = params.split('&');
        let data = {};
        list.forEach((v) => {
            let d = v.split('=');
            data[d[0]] = decodeURI(d[1]);
        });
        return data;
    } else {
        return {};
    }
};

Vue.prototype.getBankUrl = (name) => {
    let url = 'icon18.png';

    switch (name) {
        case '农业发展银行':
            url = 'icon7.png';
            break;
        case '招商银行':
            url = 'icon2.png';
            break;
        case '江西银行':
            url = 'icon8.png';
            break;
        case '民生银行':
            url = 'icon6.png';
            break;
        case '浦发银行':
            url = 'icon3.png';
            break;
        case '九江银行':
            url = 'icon11.png';
            break;
        case '贛州银行':
            url = 'icon9.png';
            break;
        case '中信银行':
            url = 'icon10.png';
            break;
        case '光大银行':
            url = 'icon14.png';
            break;
        case '工商银行':
            url = 'icon4.png';
            break;
        case '农业银行':
            url = 'icon17.png';
            break;
        case '中国银行':
            url = 'icon12.png';
            break;
        case '建设银行':
            url = 'icon13.png';
            break;
        case '交通银行':
            url = 'icon5.png';
            break;
        case '邮政储蓄银行':
            url = 'icon1.png';
            break;
        case '上饶银行':
            url = 'icon16.png';
            break;
        case '省联社上饶辖区党':
            break;
    }

    return url;
};

Vue.prototype.getEwmUrl = (name) => {
    let url = 'text.png';

    switch (name) {
        case '农业发展银行':
            break;
        case '招商银行':
            url = '招商银行.jpg';
            break;
        case '江西银行':
            url = '江西银行.jpg';
            break;
        case '民生银行':
            url = '民生银行.jpg';
            break;
        case '浦发银行':
            url = '浦发银行.png';
            break;
        case '九江银行':
            url = '九江银行.jpg';
            break;
        case '贛州银行':
            url = '赣州银行.png';
            break;
        case '中信银行':
            url = '中信银行.png';
            break;
        case '光大银行':
            url = '光大银行.jpg';
            break;
        case '工商银行':
            url = '工商银行.jpg';
            break;
        case '农业银行':
            url = '农业银行.png';
            break;
        case '中国银行':
            url = '中国银行.jpg';
            break;
        case '建设银行':
            url = '建设银行.jpg';
            break;
        case '交通银行':
            url = '交通银行.jpg';
            break;
        case '邮政储蓄银行':
            url = '邮储银行.jpg';
            break;
        case '上饶银行':
            url = '上饶银行.jpg';
            break;
        case '省联社上饶辖区党':
            break;
    }

    return url;
};