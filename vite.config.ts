/// <reference types="node" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    host: true
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
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'i18n-vendor': ['i18next', 'react-i18next']
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
      '@emotion/react',
      '@emotion/styled',
      'react-is'
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
      '@': path.resolve(__dirname, './src'),
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@mui/material': path.resolve(__dirname, 'node_modules/@mui/material'),
      '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, 'node_modules/@emotion/styled')
    },
    dedupe: ['react', 'react-dom', 'react-is', '@emotion/react', '@emotion/styled']
  }
});
  