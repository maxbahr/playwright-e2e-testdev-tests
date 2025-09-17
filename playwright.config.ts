import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  projects: [
    {
      name: "API Tests",
      use: {
        baseURL: "https://testdev.pl/",
        extraHTTPHeaders: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
      testMatch: /.*\.api\.spec\.ts/,
    },
    {
      name: "UI Tests",
      testMatch: /.*\.ui\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://testdev.pl/",
        trace: "on-first-retry",
        screenshot: "on",
        video: "on",
      },
      timeout: 20 * 1000 /* 20 seconds max for each test */,
    },
  ],
});
