import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: "src/worker.ts",
      formats: ["es"],
      fileName: () => "index.js",
    },
    outDir: "dist/server",
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
