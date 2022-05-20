<template>
    <div>
        <h2 class="text-dark-500/50 mb-2 text-xl text-center"><i class="iconfont icon-cart-Empty text-xl mr-2"></i>我的购物车
        </h2>
        <template v-if="hasItems">
            <!-- 选择操作 -->
            <div class="text-sm !text-dark-900/50 flex w-full justify-between mt-6 mb-2 px-2">
                <span>已选择 <span class="text-red-600">{{ selectedCount }}</span> 项商品</span>
                <div class="flex select-tabs">
                    <span class="mr-2" @click="selectAllItems">全选</span>
                    <span @click="reverseSelectAllItems">反选</span>
                </div>
            </div>
            <div class="flex flex-col w-full">
                <!-- 购物车物品展示处 -->
                <div v-for="(item, idx) in cartItems" :key="idx">
                    <div :class="{ selected: item.selected }" class="p-2 rounded flex border border-light-700 my-2 shadow-light-900" v-if="item.count > 0">
                        <img class="rounded w-20 h-20" :src="item.img" alt="">
                        <div class="pl-2 flex flex-col justify-between w-full">
                            <p class="text-lg w-full flex items-center justify-between">
                                <span>{{ item.name }}</span>
                                <i class="checkbox-btn iconfont icon-check" :class="{ selected: item.selected }"
                                    @click="item.selected = !item.selected"></i>
                            </p>
                            <div class="flex items-center">
                                <div class="items-center flex p-2">
                                    <button @click="sub(item)" class="op-btn">-</button>
                                    <span class="font-bold text-sm text-red-500 mx-4">{{ item.count }}</span>
                                    <button @click="add(item)" class="op-btn">+</button>
                                    <button @click="remove(item)" class="op-btn ml-2">x</button>
                                </div>
                                <div class="ml-4 text-sm">单价:<span class="text-red-500 ml-1 mr-2">{{ item.price
                                }}</span>
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
                        <button @click="checkout" :class="{ disabled: selectedCount === 0 }"
                            class="btn btn-success min-w-20 !text-sm">结算</button>
                    </div>
                </div>
            </div>
        </template>

        <div class="text-center ml-4 mt-20 text-light-900" v-else>
            这↑里↓还什么都没有呢~<router-link class="ml-2 underline" to="/home">去点餐</router-link>
        </div>
    </div>
</template>

<script setup>
import { cartItems, cartItemsCount, clearCart as clearCartItems, clearSelectedCartItem, removeItem } from '../composable/useCart';
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import message from '../components/MessageBox';
import messageDialog from '../components/MessageDialog';


const router = useRouter()

const hasItems = computed(() => cartItemsCount.value > 0)

const total = computed(() => cartItems.value.map((item) => item.selected ? item.count * item.price: 0).reduce((p, c) => p + c, 0))
const selectedCount = computed(() => cartItems.value.filter((item) => item.selected).length)

function selectAllItems() {
    cartItems.value.forEach(item => {
        item.selected = true
    })
}

function reverseSelectAllItems() {
    cartItems.value.forEach(item => {
        item.selected = !item.selected
    })
}

function checkout() {
    const checkoutCount = clearSelectedCartItem()

    if (checkoutCount === 0) {
        message('请至少选择一个商品~', 'danger')
        return
    }

    message('结算成功~', 'success')
    setTimeout(() => {

        router.push({ path: '/home' })
    }, 100);
}

function clearCart() {
    messageDialog('提示', '确定要清空购物车吗？', '确定', '取消', () => {
        message('清空成功~', 'warn')
        clearCartItems()
    })
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

.selected {
    @apply border border-blue-400/90 !important
}

i.selected {
    @apply text-blue-400/90
}

.select-tabs span {
    @apply hover: text-blue-400  cursor-pointer
}

.checkbox-btn {
    @apply cursor-pointer rounded-full inline-block w-5 h-5 border flex items-center justify-center border-gray-400 text-gray-400;
}

.op-btn {
    @apply flex items-center justify-center w-24px h-24px border rounded border-light-900 text-light-900 active: (bg-gray-200/50)
}
</style>