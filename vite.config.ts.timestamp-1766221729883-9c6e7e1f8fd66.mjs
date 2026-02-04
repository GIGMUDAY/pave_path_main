// vite.config.ts
import { defineConfig } from "file:///C:/Users/Dar%20Computers/Desktop/GVG_blockchain/pave_path_main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Dar%20Computers/Desktop/GVG_blockchain/pave_path_main/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/Dar%20Computers/Desktop/GVG_blockchain/pave_path_main/node_modules/lovable-tagger/dist/index.js";
import { copyFileSync } from "fs";
var __vite_injected_original_dirname = "C:\\Users\\Dar Computers\\Desktop\\GVG_blockchain\\pave_path_main";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Copy .htaccess to .next after build
    {
      name: "copy-htaccess",
      closeBundle() {
        try {
          copyFileSync(".htaccess", ".next/.htaccess");
          console.log("\u2713 .htaccess copied to .next/");
        } catch (err) {
          console.warn("\u26A0 .htaccess not found or could not be copied");
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    outDir: ".next",
    assetsDir: "assets",
    sourcemap: false,
    // Disable source maps to reduce file count
    minify: "esbuild",
    // Enable minification (FTP bypasses antivirus, so we can use minified files)
    rollupOptions: {
      output: {
        // manualChunks removed to prevent split-brain React issues
      }
    },
    chunkSizeWarningLimit: 600
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxEYXIgQ29tcHV0ZXJzXFxcXERlc2t0b3BcXFxcR1ZHX2Jsb2NrY2hhaW5cXFxccGF2ZV9wYXRoX21haW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXERhciBDb21wdXRlcnNcXFxcRGVza3RvcFxcXFxHVkdfYmxvY2tjaGFpblxcXFxwYXZlX3BhdGhfbWFpblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvRGFyJTIwQ29tcHV0ZXJzL0Rlc2t0b3AvR1ZHX2Jsb2NrY2hhaW4vcGF2ZV9wYXRoX21haW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCB7IGNvcHlGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCI6OlwiLFxuICAgIHBvcnQ6IDgwODAsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKSxcbiAgICAvLyBDb3B5IC5odGFjY2VzcyB0byAubmV4dCBhZnRlciBidWlsZFxuICAgIHtcbiAgICAgIG5hbWU6IFwiY29weS1odGFjY2Vzc1wiLFxuICAgICAgY2xvc2VCdW5kbGUoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29weUZpbGVTeW5jKFwiLmh0YWNjZXNzXCIsIFwiLm5leHQvLmh0YWNjZXNzXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiXHUyNzEzIC5odGFjY2VzcyBjb3BpZWQgdG8gLm5leHQvXCIpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJcdTI2QTAgLmh0YWNjZXNzIG5vdCBmb3VuZCBvciBjb3VsZCBub3QgYmUgY29waWVkXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gIF0uZmlsdGVyKEJvb2xlYW4pLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcIi5uZXh0XCIsXG4gICAgYXNzZXRzRGlyOiBcImFzc2V0c1wiLFxuICAgIHNvdXJjZW1hcDogZmFsc2UsIC8vIERpc2FibGUgc291cmNlIG1hcHMgdG8gcmVkdWNlIGZpbGUgY291bnRcbiAgICBtaW5pZnk6ICdlc2J1aWxkJywgLy8gRW5hYmxlIG1pbmlmaWNhdGlvbiAoRlRQIGJ5cGFzc2VzIGFudGl2aXJ1cywgc28gd2UgY2FuIHVzZSBtaW5pZmllZCBmaWxlcylcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgLy8gbWFudWFsQ2h1bmtzIHJlbW92ZWQgdG8gcHJldmVudCBzcGxpdC1icmFpbiBSZWFjdCBpc3N1ZXNcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDYwMCxcbiAgfSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1gsU0FBUyxvQkFBb0I7QUFDalosT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUNoQyxTQUFTLG9CQUFvQjtBQUo3QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTLGlCQUFpQixnQkFBZ0I7QUFBQTtBQUFBLElBRTFDO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixjQUFjO0FBQ1osWUFBSTtBQUNGLHVCQUFhLGFBQWEsaUJBQWlCO0FBQzNDLGtCQUFRLElBQUksbUNBQThCO0FBQUEsUUFDNUMsU0FBUyxLQUFLO0FBQ1osa0JBQVEsS0FBSyxtREFBOEM7QUFBQSxRQUM3RDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFdBQVc7QUFBQTtBQUFBLElBQ1gsUUFBUTtBQUFBO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUE7QUFBQSxNQUVSO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsRUFDekI7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
