// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { componentTagger } from "lovable-tagger"; // <-- Ensure this line is commented out
import { VitePWA } from 'vite-plugin-pwa';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    https: {} // Or `true` if your local TypeScript allows it now
  },
  plugins: [
    react(),
    VitePWA({ /* ... */ }),
    basicSsl(),
    // mode === 'development' && componentTagger(), // <-- Ensure this line is commented out
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));