import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteAdapter } from '@blazyts/browser-to-node-bridge'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:  viteAdapter()
  }
})
