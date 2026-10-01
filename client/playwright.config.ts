import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  webServer: { command: "npm run build && npm run start -- --hostname 127.0.0.1 --port 3100", url: "http://127.0.0.1:3100", timeout: 120000, reuseExistingServer: false },
  use: {
    baseURL: process.env.UI_BASE_URL || "http://127.0.0.1:3100",
    launchOptions: process.env.UI_CHROMIUM_PATH ? {
      executablePath: process.env.UI_CHROMIUM_PATH,
      args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    } : {},
  },
});
