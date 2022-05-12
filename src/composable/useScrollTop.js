import { useWindowScroll, useTimestamp, useThrottleFn } from '@vueuse/core'
import { unref, ref, watch } from 'vue'

const distance = 150

export default function () {
    const { y } = useWindowScroll()

    let prevY = y.value;
    let prevTime = unref(useTimestamp())
    const showScrollTopBtn = ref(false)
    
    watch(y, useThrottleFn(() => {
        if (prevY - y.value >= distance) {
            prevY = y.value
            showScrollTopBtn.value = true
        } else if (y.value - prevY >= distance) {
            showScrollTopBtn.value = false
        }

        const nowTime = unref(useTimestamp())

        if (nowTime - prevTime >= 500) {
            prevTime = nowTime
            prevY = y.value
        }
    }), 100)

    return showScrollTopBtn
}

