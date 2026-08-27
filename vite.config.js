import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_PORT = process.env.API_PORT || 3001;

export default defineConfig({
  plugins: [react()],
  server: {
    // Replit runs the dev server in a container behind its own proxy.
    host: "0.0.0.0",
    // Deliberately NOT process.env.PORT — Replit sets that for the deployed
    // Express process, and sharing it makes the two fight for one port.
    port: Number(process.env.VITE_PORT) || 5173,
    allowedHosts: true,
    proxy: {
      "/api": {
        target: `http://127.0.0.1:${API_PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: { outDir: "dist", emptyOutDir: true },
});
