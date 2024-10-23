<!--
 * @Description: iconfont组件
 * @Author: cg
 * @Date: 2024-08-20 10:52:46
 * @LastEditors: cg
 * @LastEditTime: 2024-09-20 09:59:29
-->
<template>
  <svg class="icon" aria-hidden="true">
    <!-- 组件 -->
    <use
      :xlink:href="`#${store.mode === ModeEnum.ANONYMITY ? props.name + '_white' : props.name}`"
      :fill="color"
    ></use>
  </svg>
</template>

<script setup lang="ts">
// 添加图片，需要增加枚举。iconfont图片添加需添加匿名模式图片，命名模式为后置 _white
type IconName =
  | 'icon-logout'
  | 'icon-emoji'
  | 'icon-anonymity'
  | 'icon-login'
  | 'icon-leave'
  | 'icon-join'
  | 'icon-create'
import { useLoginStore, ModeEnum } from '@/stores'
const store = useLoginStore()
/**
 * 这里的size长度单位填写rem，如果使用px会丢失响应式
 */
const props = defineProps<{ name: IconName; color?: string; size?: string }>()
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
