<template>
    <div
        class="fixed top-0 w-full z-30 h-12 bg-light-600 flex border-b-light-900 border-b items-center justify-between p-6 w-full">
        <router-link to="/home" class="text-black/50 text-lg">开饭啦</router-link>
        <div v-if="user">
            <router-link to="/cart" class="icon-link relative">
                <i class="iconfont icon-cart-Empty"></i>
                <span v-if="cartItemsCount > 0"
                    class="absolute flex items-center justify-center top-0 right-0 transform translate-x-5px -translate-y-5px rounded-full w-5 h-5 bg-red-500 text-sm text-white">
                    {{ cartItemsCount }}</span>
            </router-link>

            <span @click="logout" class="icon-link">
                <i class="iconfont icon-exit"></i>
            </span>
        </div>

        <router-link class="text-sm text-gray-400 hover:text-blue-400" to="/login" v-else>登录</router-link>
    </div>
</template>

<script setup>
import { useUser } from '../composable/useUser'
import { cartItemsCount, clearCart } from '../composable/useCart';

import message from '../components/MessageBox'
import dialog from '../components/MessageDialog'

import { useRouter } from 'vue-router'

const router = useRouter()
const user = useUser()

function logout() {
    dialog('提示', '确定退出登录吗?', '确定', '取消', () => {
        user.value = null;
        clearCart()
        message('退出成功~', 'success')
        router.replace({path: '/home'})
    })
}
</script>

<style scoped>
.iconfont {
    @apply text-black/50 text-lg
}

.icon-link {
    @apply cursor-pointer hover: bg-light-900/50 rounded px-2 py-1 bg-light-900 ml-4
}
</style>