import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': 'https://localhost:4000',
            '/ws': {
                target: 'ws://localhost:4000',
                ws: true,
            },
        },
    },
});