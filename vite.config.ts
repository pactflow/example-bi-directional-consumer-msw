import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Server configuration for dev
  server: {
    port: 3000,
    open: true,
  },

  // Build configuration
  build: {
    outDir: 'build',
    sourcemap: true,
    // Ensure compatibility with older browsers if needed
    target: 'es2015',
  },

  // Resolve configuration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Environment variable prefix (Vite uses VITE_ by default)
  // Support PACT_ and PROVIDER_ for Pact ecosystem tooling
  envPrefix: ['VITE_', 'PACT_', 'PROVIDER_'],
})
