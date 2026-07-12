import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { loadBrandbook, outDirFor, todayStamp } from "./config.js";
import { slideHtml, slideDimensions } from "./template.js";

async function launchBrowser() {
  // CHROMIUM_PATH lets environments with a pre-installed browser skip the
  // playwright-managed download (e.g. sandboxes exposing /opt/pw-browsers/chromium).
  const executablePath = process.env.CHROMIUM_PATH || undefined;
  return chromium.launch({ executablePath, args: ["--force-color-profile=srgb"] });
}

export async function renderCarousel({ date = todayStamp(), plan } = {}) {
  const brand = loadBrandbook();
  const dir = outDirFor(date);

  if (!plan) {
    const planPath = path.join(dir, "plan.json");
    if (!fs.existsSync(planPath)) {
      throw new Error(`No plan found at ${planPath}. Run "generate" first.`);
    }
    plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
  }

  const { width, height } = slideDimensions(brand);
  const browser = await launchBrowser();
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });

  const files = [];
  for (let i = 0; i < plan.slides.length; i++) {
    const html = slideHtml(brand, plan.slides[i], i, plan.slides.length);
    await page.setContent(html, { waitUntil: "networkidle" }).catch(async () => {
      // Network idle can fail if font hosts are unreachable; render anyway.
      await page.setContent(html, { waitUntil: "load" });
    });
    await page.evaluate(() => document.fonts?.ready);
    const file = path.join(dir, `slide-${String(i + 1).padStart(2, "0")}.png`);
    await page.screenshot({ path: file });
    files.push(file);
    console.log(`Rendered ${file}`);
  }
  await browser.close();

  const caption = [plan.caption, "", (plan.hashtags ?? []).join(" ")].join("\n").trim();
  fs.writeFileSync(path.join(dir, "caption.txt"), caption + "\n");
  console.log(`Wrote ${path.join(dir, "caption.txt")}`);
  return { files, caption, plan };
}
