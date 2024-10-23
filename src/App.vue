<!--
 * @Description: file content
 * @Author: cg
 * @Date: 2024-08-16 11:35:37
 * @LastEditors: cg
 * @LastEditTime: 2024-10-21 17:09:58
-->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

// !(function (n, e) {
//   function setViewHeight() {
//     var windowVH = e.innerHeight / 100
//     n.documentElement.style.setProperty('--vh', windowVH + 'px')
//   }
//   var i = 'orientationchange' in window ? 'orientationchange' : 'resize'
//   n.addEventListener('DOMContentLoaded', setViewHeight)
//   e.addEventListener(i, setViewHeight)
// })(document, window)
</script>

<template>
  <div class="app">
    <RouterView> </RouterView>
  </div>
</template>

<style lang="scss" scoped>
// :root {
//   --vh: 1vh;
// }

.app {
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
  background: var(--background-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s;
  transform: translateY(0%);
}
.fade-enter-from {
  transition: all 0.25s;
  opacity: 0;
  transform: translateY(250px);
}

.fade-leave-to {
  transition: all 0.25s;
  opacity: 0;
  transform: translateY(-250px);
}
</style>
