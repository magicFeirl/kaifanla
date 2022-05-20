import { useStorage } from '@vueuse/core'

const session = useStorage('user', null, sessionStorage)
const local = useStorage('user', null, localStorage)

export function useUser() {
    if (local.value) {
        return local
    }

    return session
}

export function setUser(token, remember) {
    const v = JSON.stringify({
        token,
        remember
    })

    if (remember) {
        local.value = v
    } else {
        session.value = v
    }
}