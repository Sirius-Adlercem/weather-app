import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar } from '@quasar/vite-plugin';

export default defineConfig({
  base: '/weather-app/', // Укажите базовый путь для локальной разработки
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vue(),
    quasar({
      sassVariables: 'F:/Практика-4-курс/weather-app/src/style.sass',
    }),
  ],
});