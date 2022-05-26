<template>
    <div class="flex flex-col items-center pb-10">
        <h2 class="text-xl mb-4 text-dark-200/50">我的订单</h2>
        <!-- 下方表格 -->
        <template v-if="!firstLoading">
            <div
                class="items-center p-1 font-bold text-sm grid grid-cols-4 w-full border border-light-700 border-b-transparent">
                <div>编号</div>
                <div>菜品</div>
                <div>下单时间</div>
                <div>联系人</div>
            </div>
            <div class="table w-full">
                <div class="border border-light-700 text-sm grid items-center justify-center grid-cols-4 w-full"
                    v-for="p in products" :key="p.oid">
                    <div class="pl-1">{{ p.oid }}</div>
                    <div class="p-2">
                        <img class="rounded w-full h-full" v-lazy :data-src="getImageSrc(p.img_sm)" />
                    </div>
                    <div>{{ new Date(parseInt(p.order_time)).toLocaleString() }}</div>
                    <div class="text-center">{{ p.user_name }}</div>
                </div>
            </div>
            <!-- 加载更多按钮 -->
            <div class="w-full pt-8 flex justify-center">
                <div class="flex w-full gap-1 pagination">
                    <!-- <input class="flex-1" type="number"/> -->
                    <button v-if="!isFirstPage" @click="currPage = 0" class="btn btn-success">&lt;&lt;</button>
                    <button :disabled="isFirstPage" @click="prev" class="btn btn-success">&lt;</button>
                    <button @click="currPage = page" :class="{ active: currPage === page }" class="btn btn-success"
                        v-for="page in pages">{{ page }}</button>
                    <button :disabled="isLastPage" @click="next" class="btn btn-success">&gt;</button>
                    <button v-if="!isLastPage" @click="currPage = pageCount - 1"
                        class="btn btn-success">&gt;&gt;</button>
                </div>
                <!-- <button @click="currPage += 1" v-if="hasMore" class="load-btn btn btn-success">加载更多</button> -->
                <!-- <button v-else class="load-btn btn btn-danger">没有更多数据了~</button> -->
            </div>
        </template>
        <div class="text-center mt-20 text-light-900" v-else>正在加载中~</div>

        <ScrollTop :showScrollTopBtn="showScrollTopBtn"></ScrollTop>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { getOrderInfo } from '../api'
import { useOffsetPagination } from '@vueuse/core'

import useScrollTop from '../composable/useScrollTop';
import ScrollTop from '../components/ScrollTop.vue';

const showScrollTopBtn = useScrollTop()

const products = ref([])
const currPage = ref(1)
const firstLoading = ref(true)
const total = ref(0)

// const totalPage = computed(() => Math.ceil(total.value - pageSize. / pageSize.value))
function getImageSrc(name) {
    return `/images/` + name;
}

const pageSize = ref(6)
const pages = computed(() => Array.from({ length: pageSize.value }).map((v, idx) => {
    const pageIdx = currPage.value + idx
    if (pageIdx < pageCount.value) {
        return pageIdx
    }
}).filter((number) => number !== undefined))

const {
    isFirstPage,
    isLastPage,
    prev,
    next,
    pageCount
} = useOffsetPagination({
    total: total,
    page: currPage,
    pageSize
})


watch(currPage, async () => {
    const data = await getOrderInfo((currPage.value - 1) * pageSize.value, pageSize.value)
    total.value = parseInt(data.total)
    products.value = data.subjects
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

.active {
    @apply font-bold text-black/40 !important
}

.pagination>button {
    flex: 1
}
</style>