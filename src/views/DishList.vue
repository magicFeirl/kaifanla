<template>
    <div class="relative">
        <ImageViewer @closeViewer="showImageSrc = ''" :img="showImageSrc"></ImageViewer>

        <NavSearch :keyword="keyword" v-model="keyword" placeholder="搜索菜品名称或材料..."></NavSearch>

        <DishList v-if="!firstLoading">
            <DishListItem :keyword="keyword" @imageClicked="showImage($event)" v-for="product in products" :dish="product"
                :key="product.did">
            </DishListItem>
        </DishList>
        <div v-else class="h-full flex justify-center">
            <span class="text-light-900 text-lg mt-20">正在加载中~</span>
        </div>

        <div v-if="!firstLoading" class="mt-4">
            <div v-if="!hasMore" class="btn btn-danger disabled w-full">没有更多数据了~</div>
            <button @click="currPage += 1" v-else class="btn btn-success w-full">加载更多</button>
        </div>

        <ScrollTop :showScrollTopBtn="showScrollTopBtn"></ScrollTop>
    </div>
</template>

<script setup>
import NavSearch from '../components/NavSearch.vue';
import DishList from '../components/DishList.vue'
import DishListItem from '../components/DishListItem.vue'
import ImageViewer from '../components/ImageViewer.vue';
import ScrollTop from '../components/ScrollTop.vue'

import { ref, computed, watch } from 'vue';
import { getProducts } from '../api'
import useScrollTop from '../composable/useScrollTop'

const showScrollTopBtn = useScrollTop()

// 图片viewer显示
const showImageSrc = ref('')
function showImage(img_src) {
    showImageSrc.value = img_src
}

// 数据加载
const products = ref([])
const firstLoading = ref(true)
const total = ref(1)
const hasMore = computed(() => products.value.length < total.value)
const currPage = ref(0)
const keyword = ref('')

async function load_data() {
    const data = await getProducts(keyword.value, currPage.value * 10, 10)
    total.value = parseInt(data.total)
    if (data.subjects) {
        products.value.push(...data.subjects)
    }

    firstLoading.value = false
}

watch(keyword, async () => {
    currPage.value = 0;
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