/*
 * @Description: file content
 * @Author: 朱晨光
 * @Date: 2024-08-16 11:35:37
 * @LastEditors: 朱晨光
 * @LastEditTime: 2024-08-19 10:23:07
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    server: {
      port: 3000,
      proxy: {
        '/room': {
          target: env.VITE_BASE_URL, // 真实接口地址, 后端给的基地址
          changeOrigin: true // 允许跨域
          // rewrite: (path) => path.replace(/^\/room/, '') // 将ccc替换为空
        }
      }
    }
  }
})
