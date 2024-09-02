/*
 * @Description: 统一暴露，降低代码耦合性
 * @Author: cg
 * @Date: 2024-08-20 10:52:46
 * @LastEditors: cg
 * @LastEditTime: 2024-08-30 15:12:32
 */
import type { Component } from 'vue'
import ChatIcon from './ChatIcon.vue'

// ✨如果使用的是 JS 可以删除类型校验
const components: {
  [propName: string]: Component
} = {
  ChatIcon
}
export default components
