import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config — used to run automated accessibility (axe-core) checks.
 * Starts the dev server automatically (or reuses one already running on :3000).
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: "list",
  // Generous per-test timeout: the Next dev server compiles routes on first
  // request, which can be slow when several run at once.
  timeout: 60_000,
  workers: 3,
  use: {
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
