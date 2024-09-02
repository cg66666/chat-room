import ChatIcon from '@/components/global/ChatIcon.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ChatIcon: typeof ChatIcon
  }
}
