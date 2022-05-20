<template>
    <div class="relative" v-bind="$attrs">
        <input v-model.lazy="search_keyword" :placeholder="placeholder" type="text" class="input pr-8">
        <i class="iconfont icon-search search-btn"></i>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';

export default {
    inheritAttrs: false
}
</script>

<script setup>
const props = defineProps({
    placeholder: String,
    keyword: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue'])

const search_keyword = computed({
    get() {
        return props.keyword
    },
    set(val) {
        emit('update:modelValue', val)
    }
})

</script>

<style scoped>
.search-btn {
    @apply absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-xl
}
</style>