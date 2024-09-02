/*
 * @Description: file content
 * @Author: cg
 * @Date: 2024-08-16 11:35:37
 * @LastEditors: cg
 * @LastEditTime: 2024-08-26 14:00:52
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入全局组件
import globalComponent from '@/components/global/index'

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
app.use(router)

app.mount('#app')

// 自动注册全局的组件
for (const componentItme in globalComponent) {
  app.component(componentItme, globalComponent[componentItme])
}
