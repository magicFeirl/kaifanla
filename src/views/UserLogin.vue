<template>
    <div class="flex p-4 flex-col">
        <h2 class="text-center w-full text-lg text-gray-400 mb-4">用户登录</h2>
        <label for="username">用户名</label>
        <input v-model.trim="username" type="text" class="input !h-8 !p-2">
        <label for="password">密码</label>
        <input v-model.trim="password" type="password" class="input !h-8 !p-2">
        <div class="flex items-center mt-2">
            <label for="remember">记住我</label>
            <input v-model="remember" class="ml-2 !mb-0" type="checkbox" name="remember" id="remember">
        </div>
        <button @click="login" class="mt-4 btn btn-success text-sm">登录</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { setUser } from '../composable/useUser';

import { login as userLogin } from '../api'
import message from '../components/MessageBox'

const username = ref('')
const password = ref('')
const remember = ref(false)
const router = useRouter()

async function login() {
    if (!username.value || !password.value) {
        message('请输入用户名和密码~', 'danger')
        return;
    }

    const { code, subjects } = await userLogin(username.value, password.value)

    if (code !== '1000') {
        message('用户名或密码错误~', 'danger')
        return;
    }

    const { token } = subjects
    message('登录成功~请等待加载', 'success')

    setUser(token, remember.value)

    router.replace('/').then(() => {
        location.reload()
    })
}
</script>

<style scoped>
input {
    @apply mb-2
}
</style>