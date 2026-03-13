import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/",   // ⭐ VERY IMPORTANT FOR VERCEL SPA

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
    outDir: "dist",   // explicit for clarity
    minify: "terser",

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/framer-motion/')
          ) {
            return 'vendor'
          }
        },
      },
    },
  },
})