import { createRouter, createWebHistory } from 'vue-router'
import { useTitle } from '@vueuse/core'

import { useUser } from '../composable/useUser'

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
                component: () => import('../views/DishList.vue'),
                meta: {
                    title: '开饭啦-首页'
                }
            },
            {
                path: 'order/:did',
                component: () => import('../views/DishDetail.vue'),
                meta: {
                    title: '商品详情'
                }
            },
            {
                path: 'new/:did',
                component: () => import('../views/OrderDish.vue'),
                meta: {
                    title: '新建订单'
                }
            },
            {
                path: 'myorder',
                component: () => import('../views/ViewOrder.vue'),
                meta: {
                    title: '订单列表'
                }
            },
            {
                path: 'cart',
                component: () => import('../views/ViewCart.vue'),
                meta: {
                    title: '我的购物车'
                }
            }, {
                path: 'login',
                component: () => import('../views/UserLogin.vue'),
                meta: {
                    title: '登录',
                    loginPage: true
                }
            },
            {
                path: 'favorite',
                component: () => import('../views/MyFavorite.vue'),
                meta: {
                    title: '我的收藏'
                }
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


router.beforeEach(to => {
    const title = to.meta.title

    if (to.meta.loginPage) {
        const user = useUser()
        if (user.value) {
            return '/'
        }
    }

    useTitle(title)
})

export default router