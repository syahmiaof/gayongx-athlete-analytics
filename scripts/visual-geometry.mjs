import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const page = await browser.newPage();
const checks = [];
for (const [width, height] of [
  [1920, 1080],
  [1672, 941],
  [1600, 900],
  [1440, 900],
  [1280, 800],
  [1024, 768],
  [768, 1024],
  [430, 932],
  [390, 844],
]) {
  await page.setViewportSize({ width, height });
  await page.goto("http://127.0.0.1:4173/#/dashboard");
  await page.evaluate(() => document.fonts.ready);
  checks.push(
    await page.evaluate(() => {
      const issues = [];
      for (const e of document.querySelectorAll(
        ".metric-content,.athlete-info blockquote,.donut-legend button",
      )) {
        const box = e.closest(".metric-card,.athlete-hero,.gx-panel");
        const er = e.getBoundingClientRect();
        const br = box.getBoundingClientRect();
        if (
          er.right > br.right + 1 ||
          er.bottom > br.bottom + 1 ||
          e.scrollWidth > e.clientWidth + 2
        )
          issues.push({
            selector: e.className,
            text: e.textContent,
            scroll: e.scrollWidth,
            width: e.clientWidth,
            right: er.right - br.right,
            bottom: er.bottom - br.bottom,
          });
      }
      return {
        w: innerWidth,
        h: innerHeight,
        issues,
        sidebarSettingsY: document
          .querySelector(".desktop-sidebar nav a:last-child")
          ?.getBoundingClientRect().bottom,
      };
    }),
  );
}
await writeFile(
  "artifacts/release-audit/geometry-checks.json",
  JSON.stringify(checks, null, 2),
);
console.log(JSON.stringify(checks, null, 2));
await browser.close();
