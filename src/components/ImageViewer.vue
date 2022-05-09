<template>
    <transition name="fade">
        <div @click="closeViewer" v-if="img"
            class="cursor-pointer z-50 flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black/50">
            <img class="max-w-full max-h-full" :src="img" alt="">
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    img: String
})

const emit = defineEmits(['closeViewer'])

function closeViewer() {
    emit('closeViewer')
}
</script>