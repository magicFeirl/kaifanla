<template>
    <div @click="viewDishDetail"
        class="mt-2 cursor-pointer flex w-full items-center rounded border border-light-800 p-2 transition-shadow transition-transform hover:(shadow-light-500 shadow transform -translate-y-1)">
        <img v-lazy @click.stop="handleImageClick" class="rounded w-24 h-18" :data-src="img_src" alt="">
        <div class="flex flex-col w-full">
            <div class="pl-4">
                <p class="text-lg font-bold" v-html="name"></p>
                <p v-html="material"></p>
                <div class="h-1 m-2 ml-0 border-t border-t-light-600 w-full"></div>
            </div>
            <div class="justify-between flex items-center px-4">
                <span class="text-red-600">￥{{ price }}</span>
                <span v-if="itemCount" class="text-sm text-light-900">x{{ itemCount }}</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getItem } from '../composable/useCart'
import { computed } from 'vue'

const router = useRouter()

const props = defineProps({
    dish: Object,
    keyword: {
        type: String,
        defaut: ''
    }
})

const emit = defineEmits(['imageClicked'])
// {
//     material: String,
//     did: String,
//     detail: String,
//     img_sm: String,
//     img_lg: String,
//     name: String,
//     price: String
// }

const { price, img_sm, img_lg, did } = props.dish
let { name, material } = props.dish

if (props.keyword.trim()) {
    name = name.replaceAll(props.keyword, `<span class="bg-yellow-200 text-red-500">${props.keyword}</span>`)
    material = material.replaceAll(props.keyword, `<span class="bg-yellow-200 text-red-500">${props.keyword}</span>`)
}

const img_src = `/images/${img_sm}`
const origin_src = `/images/${img_lg}`

const item = getItem(did)

const itemCount = computed(() => item.count || 0)

function handleImageClick() {
    emit('imageClicked', origin_src)
}

function viewDishDetail() {
    router.push({ path: '/order/' + did })
}
</script>

<style scoped>
img {
    cursor: zoom-in;
}
</style>