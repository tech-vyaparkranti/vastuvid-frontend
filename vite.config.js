import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,
    cors: true,
  },
  build: {
    outDir: 'build', // ✅ Output folder (default was 'dist')
    assetsDir: 'assets', // optional: keeps assets inside /build/assets
    sourcemap: false, // optional: disable source maps for smaller build
    emptyOutDir: true, // clear old build before new one
  },
})
