/// <reference types="node" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    })
  ],
  server: {
    port: 8080,
    host: true,
    strictPort: true,
    open: true
  },
  preview: {
    port: 8080,
    host: true,
    strictPort: true,
    open: true
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
          i18n: ['i18next', 'react-i18next'],
          emotion: ['@emotion/react', '@emotion/styled']
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
      'prop-types',
      'hoist-non-react-statics',
      'react-is',
      '@emotion/react',
      '@emotion/styled'
    ],
    exclude: ['@mui/material/styles'],
    esbuildOptions: {
      target: 'es2020',
      jsx: 'automatic',
      jsxImportSource: 'react'
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'prop-types': resolve(__dirname, 'node_modules/prop-types/index.js'),
      'hoist-non-react-statics': resolve(__dirname, 'node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js'),
      'react-is': resolve(__dirname, 'node_modules/react-is/index.js'),
      '@emotion/react': resolve(__dirname, 'node_modules/@emotion/react/dist/emotion-react.browser.esm.js'),
      '@emotion/styled': resolve(__dirname, 'node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js')
    },
    dedupe: ['react', 'react-dom', 'react-is', '@emotion/react', '@emotion/styled']
  }
});
  