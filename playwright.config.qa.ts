import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './e2e',
  /* Maximum time one test can run for. */
  timeout: 30 * 10000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 4 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 10 : undefined,
  // workers: 6,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['json', { outputFile: `report.json`}],
    ['html']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  reportSlowTests: { max: 0, threshold: 60001 },
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    baseURL: 'https://qa-app.dns.com/',
    // baseURL: 'https://draft-app.getmeez.com/login',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 1000,
    },
  },
  

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true, 
        video: 'on-first-retry',
        launchOptions: {
          slowMo: 1500,
          args: [
              "--disable-web-security",
              "--allow-insecure-localhost",
              "--ignore-certificate-errors",
              "--allow-cross-origin-auth-prompt",
              "--allow-external-pages",
              "--disable-oor-cors",
              "--enable-defer-all-script-without-optimization-hints"
            ]
        },
      },
    }

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     headless: true,
    //     viewport: { width: 1280, height: 720 },
    //     ignoreHTTPSErrors: true,
    //     video: 'on-first-retry',
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     headless: true,
    //     viewport: { width: 1280, height: 720 },
    //     ignoreHTTPSErrors: true,
    //     video: 'on-first-retry',
    //     launchOptions: {
    //       slowMo: 100,
    //       args: [
    //         "--disable-web-security",
    //         "--allow-insecure-localhost",
    //         "--ignore-certificate-errors",
    //         "--no-sandbox",
    //         "--allow-cross-origin-auth-prompt",
    //         "--allow-external-pages",
    //         "--disable-oor-cors",
    //         "--enable-defer-all-script-without-optimization-hints"
    //       ]
    //     },
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
