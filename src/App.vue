<!--
 * @Description: file content
 * @Author: 朱晨光
 * @Date: 2024-08-16 11:35:37
 * @LastEditors: 朱晨光
 * @LastEditTime: 2024-08-19 17:11:48
-->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
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
