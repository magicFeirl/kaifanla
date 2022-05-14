<template>
    <transition @after-leave="onDestroy" name="fade">
        <div @click="!modal && (show = false)" v-if="show"
            class="flex items-center justify-center fixed top-0 left-0 w-full h-full z-50 bg-dark-50/70">
            <!-- dialog 主体 -->
            <div @click.stop class="-mt-6 rounded bg-white min-w-4/6 p-4">
                <p class="text-sm text-dark-100/80">{{ title }}</p>
                <p class="my-4">{{ message }}</p>
                <div class="w-full flex items-center justify-end">
                    <button @click="triggerOnCancel(cancel)" class="text-sm mr-2 btn btn-danger">
                        {{ cancel }}
                    </button>
                    <button @click="triggerOnOk(ok)" class="text-sm btn btn-info">
                        {{ ok }}
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const show = ref(false)

onMounted(() => {
    show.value = true
})

const { onOk, onCancel, onDestroy } = defineProps({
    modal: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '提示'
    },
    message: {
        type: String,
        required: true
    },
    ok: {
        type: String,
        default: '确定'
    },
    cancel: {
        type: String,
        default: '取消'
    },
    onOk: Function,
    onCancel: Function,
    onDestroy: Function
})

function triggerOnOk(ok) {
    onOk(ok)
    show.value = false
}

function triggerOnCancel(cancel) {
    onCancel(cancel)
    show.value = false
}
</script>