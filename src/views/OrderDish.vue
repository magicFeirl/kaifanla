<template>
    <div class=" py-4 px-2 rounded flex flex-col w-full border border-light-700 justify-center">
        <h2 class="text-center text-light-900 mb-4">新建订单</h2>
        <label for="concacter">联系人:</label>
        <input v-model.trim="username" type="text" id="concacter">

        <div class="mb-4">
            <p class="font-bold text-sm">性别:</p>
            <div class="inline-flex items-center">
                <label class="!font-normal" for="female">先生</label>
                <input v-model.trim="sex" class="ml-1 !my-0" type="radio" id="female" name="gender" value="男">
            </div>
            <div class="ml-2 inline-flex items-center">
                <label class="!font-normal" for="male">女士</label>
                <input v-model.trim="sex" class="ml-1 !my-0" type="radio" id="male" name="gender" value="女">
            </div>
        </div>

        <label for="tel">联系电话:</label>
        <input v-model.trim="tel" type="text" id="tel">

        <label for="address">送餐地址:</label>
        <textarea v-model.trim="address" rows="6" type="text" id="address"></textarea>

        <button @click="newOrder" class="btn btn-success my-4 w-full">确定下单</button>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue'
import { addOrder } from '../api';
import message from '../components/MessageBox'

const route = useRoute()
const router = useRouter()

const did = route.params.did
const tel = ref('')
const username = ref('')
const sex = ref('')
const address = ref('')

function newOrder() {
    if (!sex.value || !tel.value || !username.value || !address.value) {
        message('请填入所需信息~', 'warn')
        return ;
    }

    console.log('sss')
    addOrder(did, tel.value, username.value, sex.value, address.value).then(({ code, insert_id }) => {
        if (code === 200) {
            message('创建订单成功，你的订单ID: ' + insert_id)

            setTimeout(() => {
                router.push({path: '/myorder'})
            }, 100)
        } else {
            message('创建订单失败', 'danger')
        }
    })
}
</script>

<style scoped>
label {
    @apply font-bold text-sm
}

textarea,
input {
    @apply mb-4 mt-1
}

input[type="text"],
textarea {
    @apply p-1 border-light-700 border text-sm
}
</style>