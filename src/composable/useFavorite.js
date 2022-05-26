import { useLocalStorage } from "@vueuse/core"

const favorited_dishes = useLocalStorage('favorited_dishes', [])

function getItem(dish) {
    return favorited_dishes.value.find((item) => item.did === dish.did)
}

export function allFavoriteItems() {
    return favorited_dishes
}

export function favorite(dish) {
    const item = getItem(dish)

    if (!!item) {
        item.favorite = !item.favorite
        return item.favorite
    } else {
        dish.favorite = true
        favorited_dishes.value.push(dish)
        return true
    }
}

export function isFavorited(did) {
    const item = getItem({did})
    return !!item && item.favorite
}