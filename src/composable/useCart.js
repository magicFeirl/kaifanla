import { computed, reactive } from 'vue'
import { useLocalStorage } from '@vueuse/core'

import { useUser } from './useUser'

const user = useUser()

export const cartItems = useLocalStorage('cartItems', [])
export const cartItemsCount = computed(() => cartItems.value.map((item) => item.count).reduce((p, c) => p + c, 0))

if (!user.value) {
    clearCart()
}

export function addToCart(did, name, price, img, favorited = false, selected = true) {
    const index = cartItems.value.findIndex(item => item.did === did)

    if (index !== -1) {
        cartItems.value[index].count++
    } else {
        const item = reactive({
            did,
            name,
            price,
            img,
            count: 1,
            favorited,
            selected
        })

        cartItems.value.push(item)
    }

    return cartItemsCount.value
}

export function getItem(did) {
    const rst = cartItems.value.filter((item) => item.did === did)

    if (rst.length) {
        return rst[0]
    } else {
        return reactive({})
    }
}

export function removeItem(did) {
    const idx = cartItems.value.findIndex((item) => item.did === did)
    if (idx !== -1) {
        cartItems.value.splice(idx, 1)
    }

    return idx === -1
}

export function clearCart() {
    cartItems.value.splice(0, cartItems.value.length)
}

/**
 * 清空选中商品
 * 
 * @returns 清空的选中的商品的数量
*/
export function clearSelectedCartItem() {
    const preCount = cartItems.value.length
    cartItems.value = cartItems.value.filter(item => !item.selected)
    return preCount - cartItems.value.length
}