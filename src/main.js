import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import '../plugins/element.js'

import '../lib/mui/css/mui.min.css'
import 'F:/WEBFRONT/project/contentmanage/src/assets/css/global.css'

axios.defaults.baseURL = 'http://47.97.195.37/api'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
