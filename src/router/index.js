import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Login.vue'
import manage from '../components/manage.vue'
import welcome from '../components/welcome.vue'
import users from '../components/users.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  {
    path: '/manage', 
    component: manage, 
    redirect:'/users',
    children: [
      { path: '/welcome', component: welcome }, 
      { path: '/users', component: users },
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
