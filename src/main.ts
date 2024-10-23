/*
 * @Description: file content
 * @Author: cg
 * @Date: 2024-08-16 11:35:37
 * @LastEditors: cg
 * @LastEditTime: 2024-09-19 15:17:44
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { get, post } from '@/ajax'

import { useLoginStore } from '@/stores/index'

import { getQueryParams } from '@/utils/index'

// iconfont
import '@/asset/icon-font'

// element-plus兼容黑夜模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'

// import 'element-plus/theme-chalk/src/message-box.scss'
// import 'element-plus/theme-chalk/src/message.scss'

import './normalize.css'
import './global.scss'

const app = createApp(App)

app.use(createPinia())

const store = useLoginStore()

store.checkLogin()

app.use(router)

app.mount('#app')
