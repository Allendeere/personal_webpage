import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests', fullyParallel: true, workers: 2, timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:4173/Personal_webpage/',
    launchOptions: process.platform === 'win32' ? { channel: 'msedge' } : {},
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: { command: 'node scripts/serve-preview.mjs', url: 'http://127.0.0.1:4173/Personal_webpage/', reuseExistingServer: true },
})
