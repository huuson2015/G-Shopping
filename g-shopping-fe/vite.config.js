import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@features": path.resolve(__dirname, "src/features"),
			"@components": path.resolve(__dirname, "src/cores/components"),
			"@services": path.resolve(__dirname, "src/services"),
			"@helper": path.resolve(__dirname, "src/helper"),
			"@constant": path.resolve(__dirname, "src/constant"),
			"@context": path.resolve(__dirname, "src/cores/context"),
		},
	},
});
