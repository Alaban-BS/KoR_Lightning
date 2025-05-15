/// <reference types="node" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 443
    }
  },
  // optioneel – voor de `vite preview`-server (standaard erft hij van server.allowedHosts)
  preview: {
    port: 5174,
    host: true,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          i18n: ['i18next', 'react-i18next']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      '@mui/icons-material',
      'prop-types'
    ],
    exclude: ['@mui/material/styles']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'prop-types': resolve(__dirname, 'node_modules/prop-types/index.js'),
    },
    dedupe: ['react', 'react-dom']
  }
});
  