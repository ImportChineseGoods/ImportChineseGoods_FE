import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // Alias cho thư mục `src`
      '@pages': resolve(__dirname, './src/pages'), // Alias cho thư mục `pages`
      '@api': resolve(__dirname, './src/api'), // Alias cho `api`
      '@assets': resolve(__dirname, './src/assets'), // Alias cho `assets`
      '@generals': resolve(__dirname, './src/generals'), // Alias cho `generals`
      '@components': resolve(__dirname, './src/generals/components'), // Alias cho `components`
    },
  },
})
