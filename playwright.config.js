// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  use: {
    browserName: 'chromium',
    trace: 'on-first-retry',
    baseURL: 'https://jsonplaceholder.typicode.com',
  },
});

