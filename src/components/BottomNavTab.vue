<template>
    <div class="fixed bottom-0 items-center left-0 flex h-12 w-full border-t border-t-light-700 bg-light-600">
        <router-link to="/" class="flex-1 text-center">
            <i class="iconfont icon-home"></i>
        </router-link>
        <router-link to="/myorder" class="flex-1 text-center">
            <i class="iconfont icon-user"></i>
        </router-link>
        <router-link to="/" class="flex-1 text-center">
            <i class="iconfont icon-menu1"></i>
        </router-link>
    </div>
</template>

<script setup>

</script>

<style scoped>
.iconfont {
    @apply cursor-pointer !important
}
</style>