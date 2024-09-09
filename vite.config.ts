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
      },
      '/apiTinkerbellBmc': {
        target: 'https://rancher.192.168.104.141.sslip.io/k8s/clusters/c-m-qkhcrhkb/apis/bmc.tinkerbell.org/v1alpha1/namespaces/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/apiTinkerbellBmc/, ''),
      },
      //https://rancher.192.168.104.141.sslip.io/k8s/clusters/c-m-qkhcrhkb/apis/bmc.tinkerbell.org/v1alpha1/namespaces/tink-system/machines?limit=500
      '/apiTinkerbell': {
        target: 'https://rancher.192.168.104.141.sslip.io/k8s/clusters/c-m-qkhcrhkb/apis/tinkerbell.org/v1alpha1/namespaces/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/apiTinkerbell/, ''),
      },
      '/apiTinkerbellSmeeLogs': {
        target: 'https://rancher.192.168.104.141.sslip.io/k8s/clusters/c-m-qkhcrhkb/api/v1/namespaces/tink-system/pods/smee-b57cf6587-78wpn/log',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/apiTinkerbellSmeeLogs/, ''),
      },
    }
  }
})

