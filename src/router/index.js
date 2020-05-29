import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Login.vue'
import manage from '../components/manage.vue'
import welcome from '../components/welcome.vue'
import users from '../components/users.vue'
import rights from '../components/rights.vue'
import roles from '../components/roles.vue'
import categories from '../components/categories.vue'
import goods from '../components/goods.vue'
import add from '../components/add.vue'



Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
        path: '/manage',
        component: manage,
        redirect: '/users',
        children: [
            { path: '/welcome', component: welcome },
            { path: '/users', component: users },
            { path: '/rights', component: rights },
            { path: '/roles', component: roles },
            { path: '/categories', component: categories },
            { path: '/goods', component: goods },
            { path: '/goods/add', component: add },
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