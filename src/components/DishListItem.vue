<template>
    <div
        class="mt-2 cursor-pointer flex w-full items-center rounded border border-light-800 p-2 transition-shadow transition-transform hover:(shadow-light-500 shadow transform -translate-y-1)">
        <img class="w-24 h-18" :src="img_src" alt="">
        <div class="pl-2">
            <p class="text-lg font-bold">{{ name }}</p>
            <p>{{ material }} </p>
            <div class="h-1 m-2 ml-0 border-t border-t-light-600 w-full"></div>
            <span class="text-red-600">￥{{ price }}</span>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    dish: Object
})

// {
//     material: String,
//     id: String,
//     detail: String,
//     img_sm: String,
//     img_lg: String,
//     name: String,
//     price: String
// }

const { name, price, img_sm, material } = props.dish
const img_src = `/images/${img_sm}`
</script>