import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'logo.jpg', 'hero.png'],
      manifest: {
        name: 'Cake Snow Bakery & Coffee Shop',
        short_name: 'Cake Snow',
        description: 'Premium Artisan Cakes, Pastries, and Coffee in Lalitpur',
        theme_color: '#5d4037',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'logo.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
            purpose: 'any maskable'
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
