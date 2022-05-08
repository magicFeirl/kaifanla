<template>
    <div class="h-full">
        <NavHeader></NavHeader>
        <div class="mt-4 p-4 pb-14 min-h-full">
            <NavSearch :keyword="keyword" v-model="keyword" placeholder="搜索菜品名称或材料..."></NavSearch>

            <DishList v-if="!firstLoading">
                <DishListItem v-for="product in products" :dish="product" :key="product.did"></DishListItem>
            </DishList>
            <div v-else class="h-full flex justify-center">
                <span class="text-light-900 text-lg mt-20">正在加载中~</span>
            </div>

            <div v-if="!firstLoading" class="mt-4">
                <div v-if="!hasMore" class="p-2 text-center text-red-200 bg-red-600/50 rounded">没有更多数据了~</div>
                <button @click="currPage += 1" v-else class="bg-green-500 text-white p-2 w-full rounded">加载更多</button>
            </div>
        </div>

        <BottomNavTab></BottomNavTab>
    </div>
</template>

<script setup>
import NavHeader from '../components/NavHeader.vue';
import NavSearch from '../components/NavSearch.vue';
import DishList from '../components/DishList.vue'
import DishListItem from '../components/DishListItem.vue'
import BottomNavTab from '../components/BottomNavTab.vue'

import { ref, computed, watch } from 'vue';
import { getProducts } from '../api'

const products = ref([])
const firstLoading = ref(true)
const total = ref(1)
const hasMore = computed(() => products.value.length < total.value)
const currPage = ref(1)
const keyword = ref('')

async function load_data() {
    const data = await getProducts(keyword.value, currPage.value, 10)
    total.value = parseInt(data.total)
    if (data.subjects) {
        products.value.push(...data.subjects)
    }
}

watch(keyword, async () => {
    currPage.value = 1;
    products.value = []
    firstLoading.value = true
    await load_data()
    firstLoading.value = false
})

watch(currPage, async () => {
    await load_data()
    firstLoading.value = false
}, { immediate: true })
</script>

<style scoped>
</style>