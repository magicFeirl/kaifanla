<template>
    <div class="flex flex-col items-center pb-10">
        <h2 class="text-xl mb-2">我的订单</h2>
        <!-- 下方表格 -->
        <template v-if="!firstLoading">
            <div class="items-center p-1 font-bold text-sm grid grid-cols-4 w-full border border-light-700 border-b-transparent">
                <div>编号</div>
                <div>菜品</div>
                <div>下单时间</div>
                <div>联系人</div>
            </div>
            <div class="table w-full">
                <div class="border border-light-700 text-sm grid items-center justify-center grid-cols-4 w-full"
                    v-for="p in products" :key="p.oid">
                    <div class="pl-1">{{ p.oid }}</div>
                    <div class="p-2"><img class="rounded w-full h-full" :src="getImageSrc(p.img_sm)" /></div>
                    <div>{{ new Date(parseInt(p.order_time)).toLocaleString() }}</div>
                    <div class="text-center">{{ p.user_name }}</div>
                </div>
            </div>
            <!-- 加载更多按钮 -->
            <div class="w-full">
                <button @click="currPage += 1" v-if="hasMore" class="load-btn btn btn-success">加载更多</button>
                <button v-else class="load-btn btn btn-danger">没有更多数据了~</button>
            </div>
        </template>
        <div class="text-center mt-20 text-light-900" v-else>正在加载中~</div>

        <ScrollTop :showScrollTopBtn="showScrollTopBtn"></ScrollTop>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getOrderInfo } from '../api'
import useScrollTop from '../composable/useScrollTop';
import ScrollTop from '../components/ScrollTop.vue';

const showScrollTopBtn = useScrollTop()

const products = ref([])
const currPage = ref(0)
const hasMore = ref(true)
const firstLoading = ref(true)

function getImageSrc(name) {
    return `/images/` + name;
}

watch(currPage, async () => {
    const data = await getOrderInfo(currPage.value * 10, 10)
    products.value.push(...data.subjects)
    firstLoading.value = false
}, { immediate: true })
</script>

<style scoped>
.table>div:nth-child(2n) {
    @apply bg-light-900/50
}

.load-btn {
    @apply text-sm mt-6 w-full
}
</style>