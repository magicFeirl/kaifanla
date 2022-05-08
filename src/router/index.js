import { createRouter, createWebHistory } from 'vue-router'

import FirstPage from '../views/FirstPage.vue'


const routes = [
    {
        path: '/',
        component: FirstPage
    },
    {
        path: '/home',
        component: () => import('../views/AppHome.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router