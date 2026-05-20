import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscator from 'vite-plugin-javascript-obfuscator'

export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      // These options pass cleanly into the obfuscator engine
      options: {
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        debugProtection: true,
        disableConsoleLog: true,
        selfDefending: true,
        stringArray: true,
        stringArrayThreshold: 0.75
      }
    })
  ],
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false
  }
})