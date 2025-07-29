// @ts-check
import { defineConfig } from '@playwright/test';

const config = defineConfig({
  testDir: './tests',
  reporter: 'html',
  retries: 2,
  use: {
    browserName: 'chromium',
    trace: 'on-first-retry',
    baseURL: 'https://candymapper.com/',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'admin',
      use: { userRole: 'admin' } as any,
    },
    {
      name: 'user1',
      use: { userRole: 'user1' } as any,
    },
  ],
});

export default config;
