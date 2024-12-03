import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: './',  // Lägg till denna rad
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})