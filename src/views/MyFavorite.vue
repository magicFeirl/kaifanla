<template>
    <div>
        <h2 class="text-dark-500/50 text-lg mb-2 text-center">收藏</h2>
        <DishList v-if="products.length">
            <DishListItem v-for="product in products" :dish="product" :key="product.did">
            </DishListItem>
        </DishList>
        <div v-else class="text-center mt-40 text-light-900 text-lg">
        还没有任何收藏，去看看吧~
        </div>
    </div>
</template>

<script setup>
import DishList from '../components/DishList.vue'
import DishListItem from '../components/DishListItem.vue'

import { allFavoriteItems } from '../composable/useFavorite';
const products = allFavoriteItems()
</script>

<style scoped>
</style>