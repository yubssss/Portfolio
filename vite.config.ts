import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: process.env.VERCEL ? '/' : '/Portfolio/',
  // This ensures:
  // - On Vercel: base is '/' (root)
  // - On GitHub Pages: base is '/Portfolio/'
  // Using environment variable to detect the platform
})