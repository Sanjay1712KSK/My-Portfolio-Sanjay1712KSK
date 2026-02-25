import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "Sanjay1712KSK.github.io",   // Root domain deployment
  plugins: [react()],
})