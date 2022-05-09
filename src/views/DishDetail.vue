<template>
    <div v-if="!loading">
        <header class="rounded text-gray-500 p-2 bg-light-700 mb-2 border border-light-600">
            <router-link class="text-blue-600/50" to="/home">首页</router-link>
            <span> / 详情</span>
        </header>
        <div class="rounded p-4 border border-light-800">
            <h2 class="text-xl mx-4">{{ name }}</h2>
            <div class="divider my-4"></div>
            <div class="flex w-full justify-center">
                <img class="object-cover max-w-full" :src="img_src" />
            </div>
            <div class="border border-light-500 p-4 bg-light-700">
                <p class="mb-4"><span class="font-bold">主要原料：</span>{{ material }}</p>
                <p class="text-sm">
                    {{ detail }}
                </p>
                <div class="divider"></div>
                <span class="text-red-600">￥ {{ price }}</span>
            </div>
        </div>

        <div
            class="rounded mb-8 mt-4 p-2 w-full flex justify-end items-center bg-light-700 border border-light-800 border-t-transparent">
            <button @click="addCart" class="relative text-sm btn btn-danger mr-2">
                <i class="iconfont icon-cart-Empty"></i>
                <span>加入购物车</span>
                <span class="h-5 w-5 rounded-full bg-red-500 text-white text-sm absolute top-0 right-0 transform translate-x-5px -translate-y-5px">
                    {{ currentItemCartCount}}
                </span>
            </button>
            <button @click="addOrder" class="text-sm btn btn-success mr-2">
                <i class="iconfont icon-dinner"></i><span>我要订餐</span>
            </button>
            <button class="text-sm btn btn-warn" @click="$router.replace({ path: '/home' })">
                <i class="iconfont icon-home"></i><span>我再看看</span>
            </button>
        </div>
    </div>
    <div class="text-center" v-else>
        <p class="mt-40 text-gray-500 text-lg">正在加载中~</p>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue'

import { getProduct } from '../api'
import { addToCart, getItem } from '../composable/useCart'
// import message from '../components/MessageBox'

const route = useRoute()
const router = useRouter()
const did = route.params.did

const loading = ref(true)

const detail = ref('')
const img_src = ref('')
const material = ref('')
const name = ref('')
const price = ref('')

const currentItem = getItem(did)
const currentItemCartCount = ref(currentItem.count || 0)

function addOrder() {
    router.push({ path: '/new/' + did })
}

function addCart() {
    const itemsCount = addToCart(did, name.value, price.value, img_src.value)
    // message(`添加成功，当前购物车共有 ${itemsCount} 个商品`, 'warn')
    currentItemCartCount.value++
}

getProduct(did).then(({ subjects: data }) => {
    data = data[0]
    detail.value = data.detail
    name.value = data.name
    price.value = data.price
    material.value = data.material
    img_src.value = `/images/${data.img_lg}`

    loading.value = false
})
</script>

<style scoped>
.divider {
    @apply h-1 border-t border-t-light-900 my-2
}

.iconfont {
    @apply mr-1
}
</style>