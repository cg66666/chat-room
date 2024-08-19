<!--
 * @Description: file content
 * @Author: 朱晨光
 * @Date: 2024-08-16 11:35:37
 * @LastEditors: 朱晨光
 * @LastEditTime: 2024-08-19 16:44:40
-->
<script setup lang="ts">
import { ref } from 'vue'
import { get, post } from '@/ajax'
import { useRouter } from 'vue-router'

const router = useRouter()

const mode = ref('白日模式')
const setMode = (e) => {
  get('/test')
  post('/test')

  if (document.startViewTransition) {
    const transition = document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark')
      if (mode.value === '黑夜模式') {
        mode.value = '白日模式'
      } else {
        mode.value = '黑夜模式'
      }
    })

    // 在 transition.ready 的 Promise 完成后，执行自定义动画
    transition.ready.then(() => {
      // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
      const { clientX, clientY } = e

      // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
      const radius = Math.hypot(
        Math.max(clientX, innerWidth - clientX),
        Math.max(clientY, innerHeight - clientY)
      )
      const clipPath = [
        `circle(0% at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`
      ]
      const isDark = document.documentElement.classList.contains('dark')
      // 自定义动画
      document.documentElement.animate(
        {
          // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
          clipPath: isDark ? clipPath.reverse() : clipPath
        },
        {
          duration: 500,
          // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
          pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
        }
      )
    })
  } else {
    document.documentElement.classList.toggle('dark')
    if (mode.value === '黑夜模式') {
      mode.value = '白日模式'
    } else {
      mode.value = '黑夜模式'
    }
  }
}
const enterRoom = () => {
  router.push({ name: 'room' })
}
</script>

<template>
  <div class="homeContainer">
    <!-- <el-button @click="setMode">切换模式</el-button> -->
    <el-button @click="enterRoom">路由跳转</el-button>
    <!-- <div class="text">{{ mode }}</div> -->
  </div>
</template>

<style lang="scss" scoped>
.homeContainer {
  height: 100%;
  margin: 0 auto;
  border: 1px solid var(--text-color);
  background: var(--background-color);
  max-width: 900px;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // .text {
  //   color: var(--text-color);
  //   margin-top: 300px;
  // }
}
</style>
