import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Automated accessibility checks.
 *
 * Loads every public route and runs the axe-core engine against it, asserting
 * there are no WCAG 2.0/2.1 A or AA violations. This is the "axe pass" we can
 * point to as enforced — run with `npm run a11y`.
 */
const routes = [
  { path: "/", name: "Home" },
  { path: "/results", name: "Results" },
  { path: "/rescue", name: "Proactive Rescue" },
  { path: "/impact", name: "Impact" },
  { path: "/journey", name: "Customer Journey" },
  { path: "/future-vision", name: "Future Vision" },
];

for (const route of routes) {
  test(`${route.name} (${route.path}) has no detectable a11y violations`, async ({
    page,
  }) => {
    await page.goto(route.path);
    // Wait for the page's main landmark + heading rather than network idle:
    // Next.js dev keeps an HMR websocket open, so "networkidle" never fires.
    await page.locator("main").waitFor({ state: "visible" });
    await page.locator("h1").first().waitFor({ state: "visible" });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
