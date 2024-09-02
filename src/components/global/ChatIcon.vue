<!--
 * @Description: file content
 * @Author: cg
 * @Date: 2024-08-20 10:52:46
 * @LastEditors: cg
 * @LastEditTime: 2024-08-26 17:04:27
-->
<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${props.name}`" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
/**
 * 这里的size长度单位填写rem，如果使用px会丢失响应式
 */
const props = defineProps<{ name: string; color?: string; size?: string }>()
</script>

<style scoped>
.icon {
  width: v-bind("props.size || '20px'");
  height: v-bind("props.size || '20px'");
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  outline: none;
}
</style>
