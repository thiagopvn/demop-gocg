import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {},
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  },
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify", 
      zlib: "browserify-zlib",
      util: 'util'
    }
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        globals: {
          process: 'process'
        }
      }
    }
  },
  optimizeDeps: {
    include: ['process']
  }
})
