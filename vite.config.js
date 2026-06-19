import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                company_profile: resolve(__dirname, 'company-profile.html'),
                sugar_tax_blog: resolve(__dirname, 'blog/uae-sugar-tax-2026-turning-complexity-into-clarity.html'),
                focustime_blog: resolve(__dirname, 'blog/focustime-daily-our-first-ios-app-on-the-app-store.html'),
            },
        },
    },
});
