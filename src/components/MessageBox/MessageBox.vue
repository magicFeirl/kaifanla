<template>
    <transition @before-leave="onClose" @after-leave="onDestroy" name="fade">
        <div v-if="visiable" :style="`top: ${top}px`" :class="type"
            class="message fixed z-50 left-1/2 transform -translate-x-1/2">
            {{ message }}
        </div>
    </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    message: String,
    id: Number,
    duration: {
        type: Number,
        default: 3000
    },
    type: {
        type: String,
        default: 'success'
    },
    top: Number,
    onDestroy: Function,
    onClose: Function
})

const visiable = ref(false)
onMounted(() => {
    visiable.value = true;

    setTimeout(() => {
        visiable.value = false;
    }, props.duration);
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    @apply transition-opacity transition-transform !important
}

.fade-enter-from {
    @apply transform -translate-x-1/2 -translate-y-10 opacity-0
}

.fade-leave-to {
    @apply transform -translate-x-1/2 translate-y-0 !important
}

.message {
    @apply rounded px-6 py-2 text-white text-sm
}

.warn {
    @apply bg-yellow-400/50
}

.success {
    @apply bg-green-500/50
}

.danger {
    @apply bg-red-400/50
}
</style>