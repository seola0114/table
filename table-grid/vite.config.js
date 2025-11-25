import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 경로: https://seola0114.github.io/table/
  // gh-pages 브랜치 루트에 배포될 것이므로 base는 '/table/' 로 설정
  base: '/table/',
  plugins: [react()],
})
