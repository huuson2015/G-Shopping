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
			"/uploads/": {
				target: "https://g-shopping-be.onrender.com/uploads/",
				changeOrigin: true,
				logLevel: "debug",
				onProxyReq: (proxyReq) => {
					console.log("Proxy request:", proxyReq.url);
				},
			},
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
