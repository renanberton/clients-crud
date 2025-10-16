import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ← ADICIONE ESTA LINHA
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  server: {
    port: 5173,
    host: true
  }
})