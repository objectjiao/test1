import {setToken, getToken, setTagNavListInLocalstorage} from '@/libs/util'
//角色限权
import {roleAuthData} from '@/router/routers'
import {
    ZXWRZ_LoginByTelVCode,
    ZXWRZ_LoginByPassword,
    ZXWRZ_GetCurrentUser
} from '@/api/login/login'

export default {
    state: {
        //名称
        userName: '',
        //登录名称
        userNameLogin: '',
        userId: '',
        userTel: '',
        //企业
        companyName: '',
        //银行
        bank: '',
        //银行 - 总行
        bankZH: '',
        //身份
        Identity: 0,
        IdentityZn: '',
        avatarImgPath: '',
        token: getToken(),
        access: '',
        hasGetInfo: false,
        unreadCount: 0,
        messageUnreadList: [],
        messageReadedList: [],
        messageTrashList: [],
        messageContentStore: {},
        //单个路由页面权限
        routeSingleAuth: {},
    },
    mutations: {
        setUserId(state, id) {
            state.userId = id
        },
        setUserTel(state, tel) {
            state.userTel = tel
        },
        setUserName(state, name) {
            state.userName = name
        },
        setUserNameLogin(state, name) {
            state.userNameLogin = name
        },
        setAccess(state, access) {
            state.access = access
        },
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        setHasGetInfo(state, status) {
            state.hasGetInfo = status
        },
        setRouteSingleAuth(state, data) {
            state.routeSingleAuth = data
        },
        setBankZh(state, bankZH) {
            state.bankZH = bankZH;
        },
        setBank(state, bank) {
            state.bank = bank
        },
        setIdentity(state, Identity) {
            state.Identity = Identity
        },
        setIdentityZn(state, IdentityZn) {
            state.IdentityZn = IdentityZn
        },
        setCompanyName(state, companyName) {
            state.companyName = companyName
        },
    },
    getters: {},
    actions: {
        // 登录
        async handleLogin({state, commit}, {userName, password, type}) {
            userName = userName.trim();
            return await new Promise(async (resolve, reject) => {

                let count = 0;

                if (type === 0) {
                    await ZXWRZ_LoginByPassword({
                        userName: userName,
                        password: password,
                    }).then((res) => {
                        if (res.code === 200) {
                            count = 1;
                            commit('setToken', res.data.token);
                            resolve(200)
                        }
                    }).catch(err => {
                        resolve(500)
                    })
                } else {
                    await ZXWRZ_LoginByTelVCode({
                        Tel: userName,
                        VCode: password,
                    }).then((res) => {
                        if (res.code === 200) {
                            count = 1;
                            commit('setToken', res.data.token);
                            resolve(200)
                        }
                    }).catch(err => {
                        resolve(500)
                    })
                }
            })
        },
        // 退出登录
        handleLogOut({state, commit}) {
            return new Promise((resolve, reject) => {
                // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
                commit('setToken', '');
                commit('setAccess', []);
                setTagNavListInLocalstorage([]);
                resolve()
            })
        },
        //删除所有用户信息
        handleUserOut({state, commit}) {
            commit('setUserName', '');
            commit('setUserNameLogin', '');
            commit('setUserId', '');
            commit('setUserTel', '');
            commit('setAccess', '');
            commit('setHasGetInfo', false);
        },
        // 获取用户相关信息
        getUserInfo({state, commit}) {
            return new Promise((resolve, reject) => {
                try {
                    if (getToken()) {
                        ZXWRZ_GetCurrentUser().then(res => {
                            if (res.code === 200) {

                                let data = res.data;
                                let IdentityZn = '';

                                switch (data.type) {
                                    case 0:
                                        //超级管理员
                                        data.access = ['superAdmin'];
                                        IdentityZn = '超级管理员';
                                        break;
                                    case 1:
                                        //金融管理员
                                        data.access = ['agencyAll'];
                                        IdentityZn = '金融管理员';
                                        break;
                                    case 2:
                                        //金融用户
                                        data.access = ['agencySupport'];
                                        IdentityZn = '金融用户';
                                        break;
                                    case 3:
                                        //企业用户
                                        data.access = ['company'];
                                        IdentityZn = '企业用户';
                                        break;
                                    case 4:
                                        //政府用户
                                        data.access = ['government'];
                                        IdentityZn = '政府用户';
                                        break;
                                    case 5:
                                        //临时用户
                                        data.access = ['temporary'];
                                        IdentityZn = '临时用户';
                                        break;
                                    default:
                                        //默认
                                        data.access = [];
                                        IdentityZn = '';
                                        break;
                                }

                                commit('setUserName', data.name);
                                commit('setUserNameLogin', data.userName);
                                commit('setUserId', data.id);
                                commit('setUserTel', data.tel);
                                commit('setAccess', data.access);
                                commit('setBankZh', data.bankName_ZH);
                                commit('setBank', data.bankName);
                                commit('setIdentity', data.type);
                                commit('setIdentityZn', IdentityZn);
                                commit('setCompanyName', data.qymc);
                                commit('setHasGetInfo', true);

                                if (data.access[0]) {
                                    for (let i in roleAuthData) {
                                        if (i === data.access[0]) {
                                            commit('setRouteSingleAuth', roleAuthData[i]);
                                        }
                                    }
                                }
                                resolve(data);
                            }
                        }).catch(err => {
                            reject(err)
                        });
                    } else {
                        commit('setUserName', '');
                        commit('setUserNameLogin', '');
                        commit('setUserId', '');
                        commit('setUserTel', '');
                        commit('setAccess', '');
                        commit('setHasGetInfo', false);
                        reject()
                    }
                } catch (error) {
                    reject(error)
                }
            })
        },
    }
}
