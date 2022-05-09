import { computed, reactive } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const cartItems = useLocalStorage('cartItems', [])
export const cartItemsCount = computed(() => cartItems.value.map((item) => item.count).reduce((p, c) => p + c, 0))

export function addToCart(did, name, price, img) {
    const index = cartItems.value.findIndex(item => item.did === did)

    if (index !== -1) {
        cartItems.value[index].count++
    } else {
        cartItems.value.push(reactive({
            did,
            name,
            price,
            img,
            count: 1
        }))
    }

    return cartItemsCount.value
}

export function getItem(did) {
    const rst = cartItems.value.filter((item) => item.did === did)

    if (rst.length) {
        return rst[0]
    } else {
        return {}
    }
}

export function clearCart() {
    cartItems.value.splice(0, cartItems.value.length)
}
