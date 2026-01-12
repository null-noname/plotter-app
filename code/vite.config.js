import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    base: './',
    build: {
        outDir: 'docs',
        emptyOutDir: true,
        chunkSizeWarningLimit: 2000,
    },
    server: {
        open: true
    }
});
