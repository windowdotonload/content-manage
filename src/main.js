import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
import '../plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfile/fonts/iconfont.css'
import ZkTable from 'vue-table-with-tree-grid'


import './assets/css/global.css'

axios.defaults.baseURL = 'http://47.97.195.37:8080/api/private/v1/'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios

Vue.use(ZkTable)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')