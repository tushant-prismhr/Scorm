import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
 proxy: {
 '/dispatch': {
 target: 'https://scormdispatch.co.uk',
 changeOrigin: true,
 rewrite: path => path.replace(/^\/dispatch/, '/dispatch')
 }
 }
 }
})
