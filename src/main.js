import { createApp } from 'vue'
import App from './App.vue'

import 'virtual:windi.css'
import router from './router'


import './assets/css/global.css'
import './assets/css/components.css'

createApp(App).use(router).mount('#app')
