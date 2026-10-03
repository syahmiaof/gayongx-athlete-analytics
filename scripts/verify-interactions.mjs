import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const results = [];
const base = "http://127.0.0.1:4173/#/";
const go = async (r) => {
  await page.goto(base + r);
  await page.evaluate(() => document.fonts.ready);
};
const check = (name, pass) => results.push({ name, pass });
await go("latihan");
await page.getByRole("tab", { name: "AIR", exact: true }).click();
check(
  "mobile water tab",
  (await page.locator("#training-nutrition-content").textContent()).includes(
    "2.6",
  ),
);
await page.getByRole("tab", { name: "NUTRISI", exact: true }).click();
check(
  "mobile nutrition tab",
  (await page.locator("#training-nutrition-content").textContent()).includes(
    "87",
  ),
);
await page.getByRole("tab", { name: "KALORI", exact: true }).click();
check(
  "mobile calories tab",
  (await page.locator("#training-nutrition-content").textContent()).includes(
    "kcal",
  ),
);
await page.getByRole("tab", { name: "Perlawanan", exact: true }).click();
check(
  "mobile combat tab",
  (await page.locator(".gx-combat-metrics").textContent()).includes("74"),
);
await page
  .locator(".gx-training-days")
  .getByRole("button", { name: "Rab 5" })
  .click();
check(
  "mobile day selection",
  (await page.locator(".gx-training-session").count()) === 1,
);
await page.locator(".gx-training-heading").first().getByRole("button").click();
check(
  "mobile full week",
  (await page.locator(".gx-training-session").count()) === 7,
);
await go("nutrisi");
await page.getByRole("button", { name: "Log Timbang Berat" }).click();
await page.getByLabel("Berat demo (kg)").fill("64.1");
await page.getByRole("button", { name: "Simpan Log" }).click();
check("weight log", await page.getByText("Catatan 1: 64.1 kg").isVisible());
await page.getByRole("button", { name: "Tambah 250 ml" }).click();
check("water log", await page.getByText("2.85 / 3.5 L").isVisible());
await go("profil");
await page.getByRole("button", { name: "Kemaskini Motto" }).click();
await page.getByLabel("Motto atlet demo").fill("Latihan konsisten.");
await page.getByRole("button", { name: "Simpan Motto" }).click();
check(
  "profile edit",
  await page.getByText("Latihan konsisten.", { exact: true }).isVisible(),
);
await page.getByRole("button", { name: "Sejarah Kejohanan" }).click();
check(
  "profile tab",
  (await page.locator("main").textContent()).includes("Piala PSSGM"),
);
await go("video");
await page.getByRole("button", { name: /Sepakan Layang Kilas/ }).click();
await page.getByRole("button", { name: "Lihat pecahan teknik" }).click();
check(
  "video annotations",
  await page.getByText("01:15 · Gerakan sepakan").isVisible(),
);
await go("perlawanan");
await page.getByRole("button", { name: "jatuhan", exact: true }).click();
check(
  "match analysis tab",
  (await page.getByText("Jatuhan / Sapuan", { exact: true }).isVisible()) &&
    !(await page.getByText("Pukulan tangan", { exact: true }).isVisible()),
);
await go("tetapan");
await page.getByRole("combobox").selectOption("lbs");
await page.getByRole("button", { name: "Simpan Tetapan" }).click();
await page.reload();
check(
  "settings persistence",
  await page.getByText("139.8 lbs", { exact: true }).isVisible(),
);
await go("dashboard");
await page.getByRole("button", { name: "Notifikasi", exact: true }).click();
await page.keyboard.press("Escape");
check("dialog escape", (await page.getByRole("dialog").count()) === 0);
await writeFile(
  "artifacts/interaction-report.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
await browser.close();
if (results.some((r) => !r.pass)) process.exitCode = 1;

