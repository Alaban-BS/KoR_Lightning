import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Alleen deze host (en localhost) mag je dev-server aanspreken
    allowedHosts: ["nr4dyw-5173.csb.app"],
  },
  // optioneel – voor de `vite preview`-server (standaard erft hij van server.allowedHosts)
  preview: {
    allowedHosts: ["nr4dyw-5173.csb.app"],
  },
});
  