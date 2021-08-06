import Vue from 'vue'
import Router from 'vue-router'
import {routes, frontPagesName, roleAuthData} from './routers'
import store from '@/store'
import iView from 'view-design'
import {setToken, getToken, canTurnTo, setTitle, setTagNavListInLocalstorage} from '@/libs/util'
import config from '@/config'

const {homeName} = config

Vue.use(Router)
const router = new Router({
    routes,
    // mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
    if (access[0]) {
        for (let i in roleAuthData) {
            if (i === access[0]) {
                store.state.user.routeSingleAuth = roleAuthData[i];
            }
        }
    }
    if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
    else next({replace: true, name: 'error_401'}) // 无权限，重定向到401页面
}

//判断是否跳转的是前台页面
const pdFrontName = (name) => {
    let bool = false;
    for (let i of frontPagesName) {
        if (i === name) {
            bool = true;
            break;
        }
    }
    return bool;
};

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    const token = getToken();

    if (!store.state.user.hasGetInfo) {
        store.dispatch('getUserInfo').then(user => {

        }).catch(() => {

        })
    }

    if (!token && to.name !== LOGIN_PAGE_NAME) {
        if (pdFrontName(to.name)) {
            // 未登录且要跳转的页面不是登录页也是前台页面
            next() // 跳转
        } else {
            // 未登录且要跳转的页面不是登录页也不是前台页面
            next({
                name: LOGIN_PAGE_NAME // 跳转到首页
            })
        }

    } else if (!token && to.name === LOGIN_PAGE_NAME) {
        // 未登陆且要跳转的页面是登录页
        next() // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
        // 已登录且要跳转的页面是登录页
        store.dispatch('getUserInfo').then(user => {
            //企业用户跳转到前台首页
            if (user.type === 5 || user.type === 3) {
                next({
                    name: 'index'
                })
            } else {
                // 其他用户跳转到后台首页
                next({
                    name: homeName // 跳转到homeName页
                })
            }
        }).catch(() => {
            // 其他用户跳转到后台首页
            next({
                name: 'index' // 跳转到homeName页
            })
        });
    } else {
        if (pdFrontName(to.name)) {
            if (store.state.user.hasGetInfo) {
                if (to.name === 'basicInfor' && store.state.user.Identity !== 3 && store.state.user.Identity !== 5) {
                    next({
                        name: LOGIN_PAGE_NAME // 跳转到首页
                    })
                } else {
                    next() // 跳转
                }
            } else {
                store.dispatch('getUserInfo').then(user => {
                    if (to.name === 'basicInfor' && store.state.user.Identity !== 3 && store.state.user.Identity !== 5) {
                        next({
                            name: LOGIN_PAGE_NAME // 跳转到首页
                        })
                    } else {
                        next() // 跳转
                    }
                }).catch(() => {
                    setToken('');
                    next({
                        name: 'login'
                    })
                })

            }
        } else {
            if (store.state.user.hasGetInfo) {
                turnTo(to, store.state.user.access, next);
            } else {
                store.dispatch('getUserInfo').then(user => {
                    if (user.type === 5 || user.type === 3) {
                        next({
                            name: 'index'
                        })
                    } else {
                        turnTo(to, user.access, next);
                    }
                }).catch(() => {
                    setToken('');
                    next({
                        name: 'login'
                    })
                })

            }

        }
    }
})

router.afterEach((to, from) => {
    setTitle(to, router.app)
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default router

// vue-router.esm.js?3211:16 [vue-router] Duplicate named routes definition: { name: "userManagement", path: "/userManagement" }