/*
 * @Description: file content
 * @Author: cg
 * @Date: 2024-08-16 11:35:37
 * @LastEditors: cg
 * @LastEditTime: 2024-08-27 10:37:46
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'

// 当前用户状态
export enum ModeEnum {
  LOGGED = '1', // 已登录
  NOTLOGING = '2', // 未登录
  ANONYMITY = '3' // 匿名
}

export const useModeStore = defineStore('userMode', () => {
  const mode = ref<ModeEnum>(ModeEnum.NOTLOGING)
  return { mode }
})
