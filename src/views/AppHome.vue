<template>
    <div class="h-full">
        <NavHeader></NavHeader>
        <div class="mt-4 p-4 pb-14 min-h-full">
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