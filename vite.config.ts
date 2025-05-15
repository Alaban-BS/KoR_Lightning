import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true, // This allows connections from all hosts
    open: true,  // This opens the browser automatically
    cors: true,
    hmr: {
      overlay: true, // Show errors as overlay
      timeout: 5000, // Increase timeout for HMR
    },
    watch: {
      usePolling: true, // Use polling for better file watching
      interval: 1000, // Polling interval
    },
    strictPort: false, // Allow Vite to try other ports if 5174 is taken
  },
  // optioneel – voor de `vite preview`-server (standaard erft hij van server.allowedHosts)
  preview: {
    allowedHosts: ["nr4dyw-5173.csb.app"],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@mui/material', '@mui/icons-material'],
    exclude: ['@mui/material/styles']
  },
  resolve: {
    dedupe: ['react', 'react-dom']
  }
});
  