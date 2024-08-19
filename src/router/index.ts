/*
 * @Description: file content
 * @Author: 朱晨光
 * @Date: 2024-08-16 11:35:37
 * @LastEditors: 朱晨光
 * @LastEditTime: 2024-08-19 16:51:28
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/room',
      name: 'room',
      component: () => import('../views/ChatRoom.vue')
    }
  ]
})

export default router
