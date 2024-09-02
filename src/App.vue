<!--
 * @Description: file content
 * @Author: cg
 * @Date: 2024-08-16 11:35:37
 * @LastEditors: cg
 * @LastEditTime: 2024-08-28 18:03:39
-->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView> </RouterView>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
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
