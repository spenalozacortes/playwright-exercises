// @ts-check
import { defineConfig } from '@playwright/test';

const config = defineConfig({
  testDir: './tests',
  reporter: 'html',
  use: {
    browserName: 'chromium',
    trace: 'on-first-retry',
    baseURL: 'https://candymapper.com/',
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
