<template>
    <div
        class="fixed top-0 w-full z-30 h-12 bg-light-600 flex border-b-light-900 border-b items-center justify-between p-6 w-full">
        <router-link to="/home" class="text-black/50 text-lg">开饭啦</router-link>
        <router-link to="/cart" class="cursor-pointer hover:bg-light-900/50 rounded px-2 py-1 bg-light-900 relative">
            <i class="text-black/50 text-lg iconfont icon-cart-Empty"></i>
            <span
                v-if="cartItemsCount > 0"
                class="absolute flex items-center justify-center top-0 right-0 transform translate-x-5px -translate-y-5px rounded-full w-5 h-5 bg-red-600 text-sm text-white">
                {{ cartItemsCount }}</span>
        </router-link>
    </div>
</template>

<script setup>
import { cartItemsCount } from '../composable/useCart';
</script>