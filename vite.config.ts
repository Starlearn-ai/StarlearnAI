// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from 'vite-plugin-pwa';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    https: {}
  },
  plugins: [
    react(),
    VitePWA({
      // Configure workbox to increase the file size limit for precaching
      workbox: {
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024 // Set to 3 MB (3,145,728 bytes) or more
      }
    }),
    basicSsl(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));