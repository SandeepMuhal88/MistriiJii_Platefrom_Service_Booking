import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // Removes all console.log statements
        drop_console: true,
        // Optional: Keep console.info or console.error if needed
        drop_debugger: true,
      },
    },
    // Optional: Splitting vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/framer-motion/')
          ) {
            return 'vendor';
          }
        },
      },
    },
  },
})