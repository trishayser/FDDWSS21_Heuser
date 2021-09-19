import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: () => import(/* webpackChunkName: "helloworld" */ '../components/HelloWorld.vue'),
    },
    {
        path: '/facilities',
        name: 'ListFacilites',
        component: () => import(/* webpackChunkName: "ListFacilites" */ '../views/ListFacilities.vue'),
    },
    {
        path: '/messages',
        name: 'Messages',
        component: () => import(/* webpackChunkName: "Messages" */ '../views/Messages.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    },
]

const router = new VueRouter({
    routes
})

export default router