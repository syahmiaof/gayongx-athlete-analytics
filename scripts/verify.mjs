import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.QA_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const report = { viewports: [], routes: [], interactions: [], errors: [] };
page.on("pageerror", (e) => report.errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") report.errors.push(m.text());
});
await mkdir("artifacts", { recursive: true });
async function load(route = "dashboard") {
  await page.goto(`${base}/#/${route}`);
  await page.evaluate(() => document.fonts.ready);
}
for (const [width, height] of [
  [1920, 1080],
  [1600, 900],
  [1440, 900],
  [1280, 800],
  [1024, 768],
  [768, 1024],
  [430, 932],
  [390, 844],
]) {
  await page.setViewportSize({ width, height });
  await load();
  const metrics = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    metrics: document.querySelectorAll(".metric-card").length,
    brokenImages: [...document.images]
      .filter((i) => !i.complete || !i.naturalWidth)
      .map((i) => i.src),
    clippedMetrics: [
      ...document.querySelectorAll(".metric-foot,.metric-detail"),
    ]
      .filter((e) => {
        const c = e.closest(".metric-card");
        return (
          c &&
          e.getBoundingClientRect().bottom >
            c.getBoundingClientRect().bottom - 2
        );
      })
      .map((e) => e.textContent),
  }));
  report.viewports.push({ width, height, ...metrics });
  await page.screenshot({
    path: `artifacts/dashboard-${width}.png`,
    fullPage: width <= 900,
  });
}
const routes = [
  "dashboard",
  "profil",
  "prestasi",
  "latihan",
  "nutrisi",
  "recovery",
  "perlawanan",
  "video",
  "benchmark",
  "pasukan",
  "laporan",
  "tetapan",
];
for (const width of [1600, 390]) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of routes) {
    await load(route);
    await page.reload();
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      content: document.querySelector("main")?.innerText.length,
      heading: document.querySelector("main h1, main h2")?.textContent,
    }));
    report.routes.push({ width, route, ...state });
  }
}
await page.setViewportSize({ width: 1600, height: 900 });
await load();
await page.getByRole("button", { name: "KEKUATAN", exact: true }).click();
report.interactions.push({
  name: "performance tab",
  pass: (
    await page.locator(".performance-chart svg").getAttribute("aria-label")
  ).includes("78"),
});
await page.getByLabel("Tempoh prestasi").selectOption("1");
report.interactions.push({
  name: "performance period",
  pass: !(await page.locator(".performance-chart svg").textContent()).includes(
    "Jan",
  ),
});
await page.getByLabel("Kelas berat benchmark").selectOption("55");
report.interactions.push({
  name: "benchmark empty state",
  pass: await page
    .getByText("Tiada sampel demo untuk kelas ini. Pilih 60–65 kg.")
    .isVisible(),
});
await page.getByLabel("Kelas berat benchmark").selectOption("60");
await page.getByLabel("Kumpulan benchmark").selectOption("Negeri");
report.interactions.push({
  name: "benchmark group",
  pass: (await page.locator(".benchmark-row").count()) === 2,
});
await page.getByLabel("Tempoh jenis latihan").selectOption("week");
report.interactions.push({
  name: "distribution period",
  pass: (await page.locator(".donut").textContent()).includes("7"),
});
await page
  .getByRole("button", { name: "Minggu seterusnya", exact: true })
  .click();
report.interactions.push({
  name: "schedule week",
  pass: (await page.locator(".weekly-schedule .today").count()) === 0,
});
await page.getByRole("button", { name: "Notifikasi", exact: true }).click();
await page.getByRole("button", { name: "Tanda Semua Dibaca" }).click();
report.interactions.push({
  name: "read notifications",
  pass: (await page.locator(".notification-count").count()) === 0,
});
await page.getByRole("button", { name: "Cari", exact: true }).click();
await page.getByLabel("Cari modul").fill("video");
await page
  .locator(".search-panel")
  .getByRole("button", { name: "Video & Teknik" })
  .click();
report.interactions.push({
  name: "search routing",
  pass: page.url().endsWith("/video"),
});
await load("latihan");
await page.getByLabel("Jenis latihan").selectOption("tempur");
await page
  .getByRole("button", { name: "Tandakan Selesai", exact: true })
  .click();
report.interactions.push({
  name: "training completion",
  pass: await page
    .getByRole("button", { name: "Selesai · Batalkan tanda" })
    .isVisible(),
});
await load("laporan");
const downloadPromise = page.waitForEvent("download");
await page.getByRole("button", { name: "Eksport Ringkasan CSV" }).click();
const download = await downloadPromise;
await download.saveAs(`artifacts/${download.suggestedFilename()}`);
report.interactions.push({
  name: "CSV export",
  pass: download.suggestedFilename().endsWith(".csv"),
});
await load("tetapan");
await page.getByRole("button", { name: "Simpan Tetapan" }).click();
report.interactions.push({
  name: "settings save",
  pass: await page.evaluate(() =>
    Object.keys(localStorage).some((k) => k.includes("gayong")),
  ),
});
await page.setViewportSize({ width: 390, height: 844 });
await load();
await page.getByRole("button", { name: "Latihan", exact: true }).click();
await page.screenshot({
  path: "artifacts/mobile-training-390.png",
  fullPage: true,
});
report.interactions.push({
  name: "mobile training navigation",
  pass: page.url().endsWith("/latihan"),
});
await page.getByRole("button", { name: "Lagi", exact: true }).click();
report.interactions.push({
  name: "mobile more routes",
  pass: (await page.locator(".more-menu button").count()) === 11,
});
await page.getByRole("button", { name: "Video & Teknik", exact: true }).click();
report.interactions.push({
  name: "mobile secondary navigation",
  pass: page.url().endsWith("/video"),
});
await page.getByRole("button", { name: "Dashboard", exact: true }).click();
await page.getByRole("button", { name: "Profil pengguna" }).click();
await page.getByRole("button", { name: "Buka Profil Lengkap Atlet" }).click();
report.interactions.push({
  name: "mobile profile routing",
  pass: page.url().endsWith("/profil"),
});
await writeFile("artifacts/qa-report.json", JSON.stringify(report, null, 2));
await browser.close();
console.log(JSON.stringify(report, null, 2));
if (
  report.errors.length ||
  report.viewports.some(
    (v) =>
      v.scrollWidth > v.width ||
      v.brokenImages.length ||
      v.clippedMetrics.length,
  ) ||
  report.routes.some((r) => r.overflow || !r.content) ||
  report.interactions.some((i) => !i.pass)
)
  process.exitCode = 1;
