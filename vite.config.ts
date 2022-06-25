import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


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
  server: {
    host: '0.0.0.0',
    port: 12400
  }
})
