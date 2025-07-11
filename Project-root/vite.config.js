import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                cart: resolve(__dirname, "src/cart/index.html"),
                checkout: resolve(__dirname, "src/checkout/index.html"),
                product: resolve(__dirname, "src/product_pages/index.html"),
            },
        },
    },
});