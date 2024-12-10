import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import path from "node:path";

// This setup uses Vite to build the popup.
// In dev mode, run `npm run dev` and manually refresh the popup page from chrome://extensions.

export default defineConfig({
	base: "",
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				popup: resolve(__dirname, "index.html"),
			},
			output: {
				entryFileNames: "assets/[name].js",
				chunkFileNames: "assets/chunk-[name].js",
				assetFileNames: "assets/[name].[ext]",
			},
		},
		outDir: "dist",
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 5173,
		strictPort: true,
		hmr: true,
	},
});
