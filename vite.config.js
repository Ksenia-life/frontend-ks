import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/jp": {
                target: "https://jsonplaceholder.typicode.com",
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/jp/, ""),
            },
        },
    },
});