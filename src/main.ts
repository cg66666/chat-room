/*
 * @Description: file content
 * @Author: 朱晨光
 * @Date: 2024-08-16 11:35:37
 * @LastEditors: 朱晨光
 * @LastEditTime: 2024-08-19 16:23:08
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// element-plus兼容黑夜模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'

import './normalize.css'
import './global.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
