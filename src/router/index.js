import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Login.vue'
import manage from '../components/manage.vue'


Vue.use(VueRouter)

  const routes = [
    {path:'/',redirect:'/login'},
    {path:'/login',component:login},
    {path:'/manage',component:manage}
  
]

const router = new VueRouter({
  routes
})

export default router
