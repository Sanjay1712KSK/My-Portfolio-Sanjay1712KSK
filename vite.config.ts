import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/",   // Root domain deployment
  plugins: [react()],
})