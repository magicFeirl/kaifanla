<template>
    <div>
        <NavSearch :keyword="keyword" v-model="keyword" placeholder="搜索菜品名称或材料..."></NavSearch>

        <DishList v-if="!firstLoading">
            <DishListItem @click="viewDishDetail(product.did)" v-for="product in products" :dish="product"
                :key="product.did"></DishListItem>
        </DishList>
        <div v-else class="h-full flex justify-center">
            <span class="text-light-900 text-lg mt-20">正在加载中~</span>
        </div>

        <div v-if="!firstLoading" class="mt-4">
            <div v-if="!hasMore" class="btn btn-danger w-full">没有更多数据了~</div>
            <button @click="currPage += 1" v-else class="btn btn-success w-full">加载更多</button>
        </div>
    </div>
</template>

<script setup>
import NavSearch from '../components/NavSearch.vue';
import DishList from '../components/DishList.vue'
import DishListItem from '../components/DishListItem.vue'

import { useRouter } from 'vue-router';
import { ref, computed, watch } from 'vue';
import { getProducts } from '../api'

const router = useRouter()

const products = ref([])
const firstLoading = ref(true)
const total = ref(1)
const hasMore = computed(() => products.value.length < total.value)
const currPage = ref(1)
const keyword = ref('')

function viewDishDetail(did) {
    router.push({ path: '/order/' + did })
}

async function load_data() {
    const data = await getProducts(keyword.value, currPage.value, 10)
    total.value = parseInt(data.total)
    if (data.subjects) {
        products.value.push(...data.subjects)
    }

    firstLoading.value = false
}

watch(keyword, async () => {
    currPage.value = 1;
    products.value = []
    firstLoading.value = true
    await load_data()
})

watch(currPage, async () => {
    await load_data()
}, { immediate: true })
</script>

<style scoped>
</style>