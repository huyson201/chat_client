import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    alias: [
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@sass', replacement: path.resolve(__dirname, 'src/sass') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@redux', replacement: path.resolve(__dirname, 'src/redux') }
    ],
  }
})
