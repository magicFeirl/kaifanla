<template>
    <transition name="fade">
        <i v-if="showScrollTopBtn" @click="scrollTop"
            class="rounded px-1 bg-light-500/80 cursor-pointer text-dark-600/50 text-3xl iconfont icon-top fixed right-2 bottom-15 z-40"></i>
    </transition>
</template>

<script setup>
defineProps({
    showScrollTopBtn: Boolean
})

function scrollTop() {
    window.scrollTo(0, 0)
}
</script>

<style lang="scss" scoped>
</style>