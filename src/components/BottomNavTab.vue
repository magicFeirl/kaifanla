<template>
    <div class="fixed bottom-0 items-center left-0 flex h-12 w-full border-t border-t-light-700 bg-light-600">
        <router-link :class="{active: activeIndex === 0}" @click="setActiveIndex(0)" to="/home" class="flex-1 text-center">
            <i class="iconfont icon-home"></i>
        </router-link>
        <router-link :class="{active: activeIndex === 1}" @click="setActiveIndex(1)" to="/myorder" class="flex-1 text-center">
            <i class="iconfont icon-user"></i>
        </router-link>
        <router-link :class="{active: activeIndex === 2}" @click="setActiveIndex(2)" to="/favorite" class="flex-1 text-center">
            <i class="iconfont icon-star"></i>
        </router-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const activeIndex = ref(0)

function setActiveIndex(idx) {
    activeIndex.value = idx;
}
</script>

<style scoped>
.iconfont {
    @apply cursor-pointer !important
}

.active {
    @apply text-blue-600/90 transition-colors font-bold
}
</style>