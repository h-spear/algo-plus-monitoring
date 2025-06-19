import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: [
            {
                find: '@components',
                replacement: path.resolve(__dirname, 'src/components'),
            },
            {
                find: '@icons',
                replacement: path.resolve(__dirname, 'src/icons'),
            },
        ],
    },
});
