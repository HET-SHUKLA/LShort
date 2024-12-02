import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  //server is only for dev
  server: {
    proxy: {
      '/api': 'https://lshort.up.railway.app/',
    }
  },
  base: '/',
  plugins: [react()],
})
