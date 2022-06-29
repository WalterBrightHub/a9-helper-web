import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path=require('path')


import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    Components({
      resolvers: [NaiveUiResolver()]
    }),

    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-import.d.ts'
    })

  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 12490,
    proxy:{
      '/api':'https://387dda42-7df7-43c7-ab80-535cd9986d16.bspapp.com'
    }
  }
})
