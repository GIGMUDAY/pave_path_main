import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Copy .htaccess to dist after build
    {
      name: "copy-htaccess",
      closeBundle() {
        try {
          copyFileSync(".htaccess", "dist/.htaccess");
          console.log("✓ .htaccess copied to dist/");
        } catch (err) {
          console.warn("⚠ .htaccess not found or could not be copied");
        }
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false, // Disable source maps to reduce file count
    minify: 'esbuild', // Enable minification (FTP bypasses antivirus, so we can use minified files)
    rollupOptions: {
      output: {
        // manualChunks removed to prevent split-brain React issues
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
