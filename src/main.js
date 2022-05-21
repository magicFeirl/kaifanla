import { createApp } from 'vue'
import App from './App.vue'

import 'virtual:windi.css'
import router from './router'

import vLazy from './directives/v-lazy'

import './assets/css/global.css'
import './assets/css/components.css'

const app = createApp(App)

app.directive('lazy', vLazy)

app.use(router).mount('#app')
