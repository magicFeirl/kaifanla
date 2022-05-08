import { createRouter, createWebHistory } from 'vue-router'

import FirstPage from '../views/FirstPage.vue'


const routes = [
    {
        path: '/',
        component: FirstPage
    },
    {
        path: '/home',
        component: () => import('../views/AppHome.vue'),
        children: [
            {
                path: '',
                component: () => import('../views/DishList.vue')
            },
            {
                path: 'order/:did',
                component: () => import('../views/DishDetail.vue')
            }
        ]
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
    scrollBehavior: () => {
        return {
            top: 0
        }
    }
})

export default router