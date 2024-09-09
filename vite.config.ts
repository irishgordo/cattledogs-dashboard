import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env': {}
  },
  server: {
    proxy: {
      '/apiCattleDogs': {
        target: 'https://rancher.192.168.104.141.sslip.io/k8s/clusters/c-m-qkhcrhkb/apis/cattledogs.cattledogs-backend.gordoughnet.com/v1/namespaces/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/apiCattleDogs/, ''),
      }
    }
  }
})

// https://rancher.192.168.104.141.sslip.io/k8s/clusters/c-m-qkhcrhkb/apis/cattledogs.cattledogs-backend.gordoughnet.com/v1/namespaces/default/cattlenetworkloadouts/homelab