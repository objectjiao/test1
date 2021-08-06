// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'view-design'
import 'view-design/dist/styles/iview.css'
import config from '@/config'
import importDirective from '@/directive'
import {directive as clickOutside} from 'v-click-outside-x'
import '@/assets/css/common_xy.less'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'

import '@/assets/js/prototype.js'

import hasPermission from '@/directive/hasPermission.js';

Vue.use(hasPermission);
Vue.use(iView)
Vue.use(TreeTable)

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
