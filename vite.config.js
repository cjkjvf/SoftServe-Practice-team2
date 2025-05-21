import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr({ exportAsDefault: true })
  ],
  server: {
    allowedHosts: ['3b6c5293e46239b984abb176297b5aa2.serveo.net'],
  },
})
