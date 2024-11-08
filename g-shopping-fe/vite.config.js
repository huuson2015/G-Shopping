/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api/": "https://g-shopping-be.onrender.com",
			"/uploads/": "https://g-shopping-be.onrender.com",
		},
	},
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@redux": path.resolve(__dirname, "src/redux"),
		},
	},
});
