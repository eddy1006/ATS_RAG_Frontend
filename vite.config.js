import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      // Mimics the Nginx location /api/ block
      '/api': {
        target: 'http://localhost:8080', // Local Spring Boot backend port
        changeOrigin: true,              // Mimics proxy_set_header Host $host
        secure: false,                   // Set to true only if backend uses HTTPS locally
      }
    }
  }
})