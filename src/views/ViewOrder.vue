<template>
    <div class="flex flex-col items-center pb-10">
        <h2 class="text-xl mb-2">我的订单</h2>
        <!-- 下方表格 -->
        <div class="items-center p-1 font-bold text-sm grid grid-cols-4 w-full border border-light-700">
            <div>编号</div>
            <div>菜品</div>
            <div>下单时间</div>
            <div>联系人</div>
        </div>
        <div class="table w-full">
            <div class="border border-light-700 text-sm grid items-center justify-center grid-cols-4 w-full" v-for="p in products" :key="p.oid">
                <div class="pl-1">{{ p.oid }}</div>
                <div class="p-2"><img class="w-full h-full" :src="getImageSrc(p.img_sm)" /></div>
                <div>{{ new Date(parseInt(p.order_time)).toLocaleString() }}</div>
                <div class="text-center">{{ p.user_name }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getOrderInfo } from '../api'

const products = ref([])

function getImageSrc(name) {
    return `/images/` + name;
}

onMounted(async () => {
    const data = await getOrderInfo(1, 10)
    products.value = data.subjects
})
</script>

<style scoped>
.table > div:nth-child(2n) {
    @apply bg-light-900/50
}
</style>