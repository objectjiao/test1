export default {
    //配置显示在浏览器标签的title
    title: '饶企云-上饶市中小微企业融资应用平台',
    //token在Cookie中存储的天数，默认1天
    cookieExpires: 1,
    // api请求基础路径
    baseUrl: {
        dev: 'http://171.35.109.229:8005/api',
        pro: 'http://171.35.109.229:8005/api'
    },
    //默认打开的首页的路由name值，默认为home
    homeName: 'home',
    //角色权限
    roleAuth: {
        //超级管理员
        superAdmin: {
            //峰
            'userManagement': ['userTypeFiltering-superAdmin','cardAddBoxType-superAdmin','cardAddAgencyUser-superAdmin'],
            'infoRelease': ['btnOperation-superAdmin'],
            'demandManagement':['cardPushButtonAdmin'],
            'projectManagement':['cardPushButtonAdmin'],
            'operationMonitoring':[],
            //娇
            // 'systemSetting': [],
            'productList': [],
        },
        //政府
        government: {
            'infoRelease': [],
            'demandManagement':['cardPushButtonAdmin'],
            'operationMonitoring':[],
            'projectManagement':['cardPushButtonAdmin'],
            'productList': [],
        },
        //金融管理员
        agencyAll: {
            'userManagement': ['userTypeFiltering-agencyAll','cardAddBoxType-agencyAll','cardAddAgencyUser-agencyAll'],
            'productList': ['newproduct','getproduct','limitproduct','deleteproduct'],
            'projectManagement':['cardPushButton'],
            'demandManagement':['cardPushBox','cardPushButton'],
            'postLoanWarning':[],
        },
        //金融用户
        agencySupport: {
            'projectManagement':['cardPushButton'],
            'productList': ['newproduct','getproduct','limitproduct','deleteproduct'],
            'demandManagement':['cardPushBox','cardPushButton'],
            'postLoanWarning':[],
        },
        //企业
        company: {},
        //临时用户
        temporary: {}
    },
}
