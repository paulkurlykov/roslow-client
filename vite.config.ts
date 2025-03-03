import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({

    base: './',

    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://backend:3001',
    //       changeOrigin: true,
    //       secure: false,
    //     },
    //     '/uploads': {
    //       target: 'http://backend:3001',
    //       changeOrigin: true,
    //       secure: false,
    //     },
    //   },
    // },

    // server: {
    //     proxy: {
    //         "/api": {
    //             target: "http://localhost:3001",
    //             changeOrigin: true,
    //             secure: false,
    //         },
    //         "/uploads": {
    //             target: "http://localhost:3001",
    //             changeOrigin: true,
    //             secure: false,
    //         },
    //     },
    // },

    plugins: [react()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
