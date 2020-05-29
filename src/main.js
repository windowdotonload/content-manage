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
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import './assets/css/global.css'

axios.defaults.baseURL = 'http://47.97.195.37:8080/api/private/v1/'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios

Vue.use(ZkTable)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false
Vue.filter('dataFormat', (date) => {
    let dt = new Date(date)
    let y = dt.getFullYear()
    let m = (dt.getMonth() + 1 + '').padStart(2, '0')
    let d = (dt.getDate() + 1 + '').padStart(2, '0')
    let hh = (dt.getHours() + 1 + '').padStart(2, '0')
    let mm = (dt.getMinutes() + 1 + '').padStart(2, '0')
    let ss = (dt.getSeconds() + 1 + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}-${mm}-${ss}`
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')