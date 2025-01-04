/*
 * @Description: 登录相关信息
 * @Author: cg
 * @Date: 2024-08-16 11:35:37
 * @LastEditors: cg
 * @LastEditTime: 2025-01-05 04:09:46
 */
import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { get, post } from '@/ajax'
import { getCookie, getQueryParams } from '@/utils'

// 当前用户状态
export enum ModeEnum {
  LOGGED = '1', // 已登录
  NOTLOGING = '2', // 未登录
  ANONYMITY = '3' // 匿名
}

export const useLoginStore = defineStore('useLogin', () => {
  // 当前页面的模式
  const mode = ref<ModeEnum>(ModeEnum.NOTLOGING)

  // 用户名称
  const userName = ref<string>('')

  // 当前房间信息
  const roomInfo = ref<{ room: string; password: string } | undefined>()

  // 用于首次打开项目查看登录状态
  const checkLogin = async () => {
    const query = getQueryParams()
    const XToken = getCookie('X-TOKEN')

    // 判断是否ticket第一次登录后进入页面
    if (query.ticket) {
      try {
        const res = await post('/chat_room/getToken', { ticket: query.ticket })
        if (res.successful) {
          // 获取当前 URL
          const currentUrl = new URL(window.location.href)

          // 删除查询参数
          currentUrl.search = ''

          // 替换当前 URL
          history.replaceState({}, document.title, currentUrl.href)

          // 刷新页面
          location.reload()

          mode.value = ModeEnum.LOGGED
        }
      } catch (err) {
        console.log('err', err)
      }
    } else if (XToken) {
      const res = await get<{ ok: boolean }>('/chat_room/checkToken')
      if (res.successful && res.data.ok) {
        mode.value = ModeEnum.LOGGED
      } else {
        toLogOut()
      }
    }
  }

  // 去登陆
  const toLogin = () => {
    const urlObj = new URL(window.location.href)
    const searchParams = new URLSearchParams(urlObj.search)
    // 防止特殊情况，查询字符串中的ticket参数不能保存
    searchParams.delete('ticket')
    urlObj.search = searchParams.toString()
    window.location.href = import.meta.env.VITE_LOGIN_URL + '?redirectUrl=' + urlObj.href
  }

  // 退出登录
  const toLogOut = async () => {
    const res = await get('/chat_room/logout')
    if (res.successful) {
      mode.value = ModeEnum.NOTLOGING
      userName.value = ''
      roomInfo.value = undefined
      ElMessage({
        message: '退出登录成功！',
        type: 'warning',
        plain: true
      })
    }
  }

  watch(mode, async (value) => {
    // 获取已登录的用户信息
    if (value === ModeEnum.LOGGED) {
      const res = await get<{ name: string }>('/chat_room/getUserInfo')
      if (res.successful) {
        userName.value = res.data.name
      }
    }
  })

  return { userName, toLogin, toLogOut, checkLogin, mode, roomInfo }
})
