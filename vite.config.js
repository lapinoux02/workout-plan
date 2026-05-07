import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/workout-plan/',
  plugins: [mkcert(), vue(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    manifest: {
      name: 'workout-plan',
      short_name: 'workout-plan',
      description: 'workout-plan',
      theme_color: '#121212',
      icons: [
        {
          src: 'icons/icon_64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'icons/icon_192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/icon_512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'icons/icon_512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    }
  })],
  server: {
    port: 5174
  }
})