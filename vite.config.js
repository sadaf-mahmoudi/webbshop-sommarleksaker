import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/webbshop-sommarleksaker/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})