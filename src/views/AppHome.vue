<template>
    <div class="h-full">
        <NavHeader></NavHeader>
        <div class="py-16 px-4 min-h-full">
            <router-view></router-view>
        </div>
        <BottomNavTab></BottomNavTab>
    </div>
</template>

<script setup>
import NavHeader from '../components/NavHeader.vue';
import BottomNavTab from '../components/BottomNavTab.vue'
</script>

<style scoped>
</style>