import { createRouter, createWebHistory } from 'vue-router'

import FirstPage from '../views/FirstPage.vue'


const routes = [
    {
        path: '/welcome',
        component: FirstPage
    },
    {
        path: '/',
        component: () => import('../views/AppHome.vue'),
        redirect: 'home',
        children: [
            {
                path: 'home',
                component: () => import('../views/DishList.vue')
            },
            {
                path: 'order/:did',
                component: () => import('../views/DishDetail.vue')
            },
            {
                path: 'new/:did',
                component: () => import('../views/OrderDish.vue')
            },
            {
                path: 'myorder',
                component: () => import('../views/ViewOrder.vue')
            },
            {
                path: 'cart',
                component: () => import('../views/ViewCart.vue')
            }
        ]
    },
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