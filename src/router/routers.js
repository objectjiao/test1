import Main from '@/components/main'

import config from '@/config'

/**
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

//角色权限 配置角色都能看哪些页面
const roleAuth = config.roleAuth;

//用户权限
const access = (path) => {
    let list = [];
    for (let i in roleAuth) {
        for (let j in roleAuth[i]) {
            if (j === path) {
                list.push(i);
            }
        }
    }

    return list.length ? list : ['none'];
};

//前台页面
const frontPages = [{
    path: '/index',
    name: 'index',
    meta: {
        title: '',
        front: true,
    },
    component: () => import('@/view/frontPages/index/index.vue')
}, {
    path: '/news',
    name: 'news',
    meta: {
        title: '政策新闻',
        front: true,
    },
    component: () => import('@/view/frontPages/news/news.vue')
}, {
    path: '/financial',
    name: 'financial',
    meta: {
        title: '金融管理',
        front: true,
    },
    component: () => import('@/view/frontPages/financial/financial.vue')
}, {
    path: '/demand',
    name: 'demand',
    meta: {
        title: '融资需求',
        front: true,
    },
    component: () => import('@/view/frontPages/demand/demand.vue')
}, {
    path: '/basicInfor',
    name: 'basicInfor',
    meta: {
        title: '个人基本信息',
        front: true,
    },
    component: () => import('@/view/frontPages/basicInfor/basicInfor.vue')
}, {
    path: '/newsDetail',
    name: 'newsDetail',
    meta: {
        title: '新闻详情',
        front: true,
    },
    component: () => import('@/view/frontPages/news/newsDetail.vue')
}, {
    path: '/financialDetail',
    name: 'financialDetail',
    meta: {
        title: '产品详情',
        front: true,
    },
    component: () => import('@/view/frontPages/financial/financialDetail.vue')
}, {
    path: '/reportPages',
    name: 'reportPages',
    meta: {
        title: '企业信用报告',
        front: true,
    },
    component: () => import('@/view/single-page/company/companyDetails.vue')
}, {
    path: '/contactUs',
    name: 'contactUs',
    meta: {
        title: '联系我们',
        front: true,
    },
    component: () => import('@/view/frontPages/other/contactUs.vue')
}, {
    path: '/synopsis',
    name: 'synopsis',
    meta: {
        title: '网站简介',
        front: true,
    },
    component: () => import('@/view/frontPages/other/synopsis.vue')
}];

//后台页面
const backPages = [
    {
        path: '/userManagement',
        name: 'userManagement',
        meta: {
            icon: 'md-body',
            hideInBread: true,
            title: '用户管理'
        },
        component: Main,
        children: [
            {
                path: 'userManagement',
                name: 'userManagement',
                meta: {
                    icon: 'ios-hammer',
                    title: '用户管理',
                    access: access('userManagement'),
                },
                component: () => import('@/view/backPages/userManagement/userManagement.vue')
            }
        ]
    },
    {
        path: '/systemManagement',
        name: 'systemManagement',
        meta: {
            icon: 'md-build',
            hideInBread: true,
            title: '系统设置管理'
        },
        component: Main,
        children: [
            {
                path: 'systemSetting',
                name: 'systemSetting',
                meta: {
                    icon: 'md-build',
                    title: '系统设置',
                    access: access('systemSetting'),
                },
                component: () => import('@/view/backPages/systemManagement/systemSetting')
            }
        ]
    },
    {
        path: '/infoManagement',
        name: 'infoManagement',
        meta: {
            icon: 'ios-bookmarks',
            hideInBread: true,
            title: '信息发布管理'
        },
        component: Main,
        children: [
            {
                path: 'infoRelease',
                name: 'infoRelease',
                meta: {
                    icon: 'ios-bookmarks',
                    title: '信息发布管理',
                    access: access('infoRelease'),
                },
                component: () => import('@/view/backPages/infoManagement/infoRelease')
            }
        ]
    },
    {
        path: '/financialManagement',
        name: 'financialManagement',
        meta: {
            icon: 'logo-usd',
            hideInBread: true,
            title: '金融产品管理'
        },
        component: Main,
        children: [
            {
                path: 'productList',
                name: 'productList',
                meta: {
                    icon: 'logo-usd',
                    title: '金融产品列表',
                    access: access('productList'),
                },
                component: () => import('@/view/backPages/financialManagement/productList')
            }
        ]
    },
    {
        path: '/projectManagement',
        name: 'projectManagement',
        meta: {
            icon: 'logo-usd',
            hideInBread: true,
            title: '融资需求管理'
        },
        component: Main,
        children: [
            {
                path: 'projectManagement',
                name: 'projectManagement',
                meta: {
                    icon: 'md-chatbubbles',
                    title: '待审批融资列表',
                    access: access('projectManagement'),
                },
                component: () => import('@/view/backPages/projectManagement/projectManagement')
            },
            {
                path: 'demandManagement',
                name: 'demandManagement',
                meta: {
                    icon: 'md-chatbubbles',
                    title: '融资需求列表',
                    access: access('demandManagement'),
                },
                component: () => import('@/view/backPages/projectManagement/demandManagement')
            }
        ]
    },
    {
        path: '/operationMonitoring',
        name: 'operationMonitoring',
        meta: {
            icon: 'logo-usd',
            hideInBread: true,
            title: '系统运行监控'
        },
        component: Main,
        children: [
            {
                path: 'operationMonitoring',
                name: 'operationMonitoring',
                meta: {
                    icon: 'md-chatbubbles',
                    title: '系统运行监控',
                    access: access('operationMonitoring'),
                },
                component: () => import('@/view/single-page/operationMonitoring/operationMonitoring')
            }
        ]
    },
    {
        path: '/postLoanWarning',
        name: 'postLoanWarning',
        meta: {
            icon: 'logo-usd',
            hideInBread: true,
            title: '贷后预警列表'
        },
        component: Main,
        children: [
            {
                path: 'postLoanWarning',
                name: 'postLoanWarning',
                meta: {
                    icon: 'md-chatbubbles',
                    title: '贷后预警列表',
                    access: access('postLoanWarning'),
                },
                component: () => import('@/view/backPages/postLoanWarning/postLoanWarning')
            }
        ]
    },
    {
        path: '',
        name: 'front',
        meta: {
            icon: 'logo-usd',
            title: '前台页面',
            href: '/',
        },
        component: Main,
        children: [
            {
                path: '',
                name: 'fronVueRoutert',
                meta: {
                    icon: 'logo-usd',
                    title: '前台页面',
                    href: '/',
                },
                component: Main,
            }
        ]
    },
];

//路由
export const routes = [
    {
        path: '/',
        redirect: '/index',
        meta: {
            title: '首页',
            front: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录',
            hideInMenu: true,
        },
        component: () => import('@/view/login/login.vue')
    },
    {
        path: '/home',
        name: '_home',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true,
        },
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    hideInMenu: true,
                    title: '首页',
                    notCache: true,
                    icon: 'md-home'
                },
                component: () => import('@/view/single-page/home')
            }
        ]
    },
    {
        path: '/401',
        name: 'error_401',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/404.vue')
    },
    ...frontPages,
    ...backPages,
];

//前台页面路由名称
export const frontPagesName = (() => {
    let list = [];
    frontPages.map((item) => {
        list.push(item.name)
    });
    return list;
})();

//角色权限
export let roleAuthData = roleAuth;
