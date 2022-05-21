import { useIntersectionObserver } from "@vueuse/core"

export default {
    mounted(el) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
            if (isIntersecting) {
                stop()
                el.src = el.getAttribute('data-src')
            }
        })
    },
}