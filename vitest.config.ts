import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';

dotenv.config({ path: './keys.env' });

export default defineConfig({
    plugins: [vue()],
    define: {
        'process.env': process.env,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
    },
});