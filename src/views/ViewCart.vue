<template>
    <div>
        <h2 class="text-dark-500/50 mb-2 text-xl text-center"><i class="iconfont icon-cart-Empty text-xl mr-2"></i>我的购物车
        </h2>
        <div class="flex flex-col w-full" v-if="hasItems">
            <!-- 购物车物品展示处 -->
            <div v-for="(item, idx) in cartItems" :key="idx">
                <div class="p-2 rounded flex border border-light-700 my-2 shadow-light-900" v-if="item.count > 0">
                    <img class="rounded w-20 h-20" :src="item.img" alt="">
                    <div class="pl-2 flex flex-col justify-between">
                        <p class="text-lg">{{ item.name }}</p>
                        <div class="flex items-center">
                            <div class="items-center flex p-2">
                                <button @click="sub(item)" class="op-btn">-</button>
                                <span class="font-bold text-sm text-red-500 mx-4">{{ item.count }}</span>
                                <button @click="add(item)" class="op-btn">+</button>
                                <button @click="remove(item)" class="op-btn ml-2">x</button>
                            </div>
                            <div class="ml-4 text-sm">单价:<span class="text-red-500 ml-1 mr-2">{{ item.price }}</span>
                                总计:<span class="text-red-500 ml-1">{{ item.price * item.count }}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 结算部分 -->
            <div class="px-4 mt-6 flex w-full justify-between items-center">
                <span>总计: <span class="text-red-600">{{ total }}￥</span></span>
                <div>
                    <button @click="clearCart" class="mr-2 btn btn-danger min-w-20 !text-sm">清空购物车</button>
                    <button @click="checkout" class="btn btn-success min-w-20 !text-sm">结算</button>
                </div>
            </div>
        </div>
        <div class="text-center ml-4 mt-20 text-light-900" v-else>
            这↑里↓还什么都没有呢~<router-link class="ml-2 underline" to="/home">去点餐</router-link>
        </div>
    </div>
</template>

<script setup>
import { cartItems, cartItemsCount, clearCart as clearCartItems, removeItem } from '../composable/useCart';
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import message from '../components/MessageBox';

const router = useRouter()

const hasItems = computed(() => cartItemsCount.value > 0)

const total = computed(() => cartItems.value.map((item) => item.count * item.price).reduce((p, c) => p + c, 0))

function checkout() {
    message('结算成功~', 'success')
    setTimeout(() => {
        clearCart()
        router.push({ path: '/home' })
    }, 100);
}

function clearCart() {
    message('清空成功~', 'warn')
    clearCartItems()
}

function add(item) {
    item.count++;
}

function sub(item) {
    item.count--;
    if (item.count === 0) {
        removeItem(item.did)
    }
}

function remove(item) {
    item.count = 0
    removeItem(item.did)
}

</script>

<style scoped>
.op-btn {
    @apply flex items-center justify-center w-24px h-24px border rounded border-light-900 text-light-900 active: (bg-gray-200/50)
}
</style>