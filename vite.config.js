import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    emptyOutDir: true,
    sourcemap: false,        // ne pas publier le code source en clair
    assetsInlineLimit: 2048, // seules les toutes petites images sont inlinées
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React + routeur dans un chunk séparé : mis en cache longtemps par le navigateur
          if (id.includes("node_modules/react") || id.includes("node_modules/scheduler")) return "vendor";
        },
      },
    },
  },
  server: {
    port: 3000,
    // En dev, l'API Bun tourne sur :3001
    proxy: { "/api": "http://localhost:3001" },
  },
});
