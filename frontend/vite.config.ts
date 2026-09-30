import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Portfolio (React + Vite) — static SPA served from the repo root.
// Dev: `npm run dev` (port 5173). Build: `npm run build` → dist/.
// NOTE: /api (console AI chat, ./api/*.ts) expects a backend at
// VITE_NUXT_ORIGIN (default localhost:3000 — e.g. `vercel dev`).
// Without one, the terminal degrades gracefully — all board commands
// keep working, only `ask` errors.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_NUXT_ORIGIN || 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
