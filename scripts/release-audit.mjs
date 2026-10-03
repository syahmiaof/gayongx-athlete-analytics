import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const page = await browser.newPage();
await mkdir("artifacts/release-audit", { recursive: true });
const data = [];
for (const [w, h, route] of [
  [1672, 941, "dashboard"],
  [1600, 900, "dashboard"],
  [390, 844, "dashboard"],
  [430, 932, "dashboard"],
  [390, 844, "latihan"],
]) {
  await page.setViewportSize({ width: w, height: h });
  await page.goto("http://127.0.0.1:4173/#/" + route);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `artifacts/release-audit/after-${route}-${w}.png`,
    fullPage: w < 900,
  });
  data.push(
    await page.evaluate(() => ({
      w: innerWidth,
      fonts: [...document.fonts].map((f) => ({
        family: f.family,
        status: f.status,
      })),
      rects: [
        ...document.querySelectorAll(
          ".athlete-hero,.hero-athlete,.metric-card,.analytics-grid,.lower-grid",
        ),
      ].map((e) => ({
        cls: e.className,
        x: e.getBoundingClientRect().x,
        y: e.getBoundingClientRect().y,
        w: e.getBoundingClientRect().width,
        h: e.getBoundingClientRect().height,
      })),
    })),
  );
}
const client = await page.context().newCDPSession(page);
await client.send("DOM.enable");
await client.send("CSS.enable");
const doc = await client.send("DOM.getDocument");
const node = await client.send("DOM.querySelector", {
  nodeId: doc.root.nodeId,
  selector: ".gx-training-heading h2",
});
console.log(
  await client.send("CSS.getPlatformFontsForNode", { nodeId: node.nodeId }),
);
await writeFile(
  "artifacts/release-audit/after-measurements.json",
  JSON.stringify(data, null, 2),
);
await browser.close();
