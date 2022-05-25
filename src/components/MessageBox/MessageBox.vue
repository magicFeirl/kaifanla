<template>
    <transition @before-leave="onClose" @after-leave="onDestroy" name="message-fade">
        <div v-if="visiable" :style="`top: ${top}px`" :class="type"
            class="message">
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

.message {
    @apply fixed z-50 left-1/2 transform -translate-x-1/2 rounded px-6 py-2 text-white text-sm transition-all
}

.message-fade-enter-from,
.message-fade-leave-to {
    @apply opacity-0 -translate-x-1/2 -translate-y-20px
}

.message.warn {
    @apply bg-yellow-400/50
}

.message.success {
    @apply bg-green-500/50
}

.message.danger {
    @apply bg-red-400/50
}
</style>