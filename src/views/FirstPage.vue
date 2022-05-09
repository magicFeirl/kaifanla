<template>
    <div class="w-full h-full flex flex-col items-center justify-center">
        <h2 class="text-blue-700 mb-2 text-6xl">开饭啦</h2>
        <img class="w-full" src="/images/kid-foods.jpg" alt="" />
        <div @click="jumpToHomePage" class="sec">
            {{ jumpTime }}
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';

const jumpTime = ref(5);
const canJump = computed(() => jumpTime.value <= 0 || jumpTime.value === '跳过')
const router = useRouter();

function jumpToHomePage() {
    if (canJump.value) {
        router.replace({ path: '/home' })
    }
}

const interval = setInterval(() => {
    jumpTime.value--;
    if (canJump.value) {
        clearInterval(interval);
        jumpTime.value = '跳过'
        setTimeout(() => {
            jumpToHomePage()
        }, 3000);
    }
}, 1000);

</script>

<style scoped>
.sec {
    @apply text-white cursor-pointer absolute top-3 right-3 w-12 h-12 bg-gray-500/30 flex items-center justify-center rounded-full;
}
</style>